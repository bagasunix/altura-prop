from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Altura Property API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str
    city: str = Field(min_length=2, max_length=80)
    property_type: str  # beli | sewa | investasi
    budget: str
    source: str  # Instagram | Google | Referral | Lainnya
    plan: Optional[str] = None
    utm_source: Optional[str] = None
    utm_campaign: Optional[str] = None
    page_url: Optional[str] = None

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = v.replace(" ", "").replace("-", "")
        if not re.match(r"^(\+62|62|0)8[1-9][0-9]{7,11}$", cleaned):
            raise ValueError("Nomor HP tidak valid")
        return cleaned


class LeadOut(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    status: str
    forwarded: bool
    timestamp: str


def normalize_phone(phone: str) -> str:
    p = phone.replace(" ", "").replace("-", "")
    if p.startswith("+62"):
        return p
    if p.startswith("62"):
        return "+" + p
    if p.startswith("0"):
        return "+62" + p[1:]
    return p


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Altura Property API online"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    obj = StatusCheck(**input.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/leads", response_model=LeadOut)
async def create_lead(lead: LeadIn):
    lead_id = str(uuid.uuid4())
    now_iso = datetime.now(timezone.utc).isoformat()

    payload = lead.model_dump()
    payload["phone"] = normalize_phone(lead.phone)

    doc = {
        "id": lead_id,
        **payload,
        "timestamp": now_iso,
        "forwarded": False,
        "forward_status": None,
    }

    webhook = os.environ.get("N8N_WEBHOOK_URL", "").strip()
    secret = os.environ.get("N8N_SECRET", "").strip()
    forwarded = False

    if webhook:
        try:
            async with httpx.AsyncClient(timeout=10.0) as hc:
                headers = {"Content-Type": "application/json"}
                if secret:
                    headers["K@mbing04"] = secret
                res = await hc.post(webhook, headers=headers, json={
                    **payload,
                    "id": lead_id,
                    "timestamp": now_iso,
                })
                doc["forward_status"] = res.status_code
                forwarded = res.is_success
                doc["forwarded"] = forwarded
        except Exception as e:
            logger.error(f"N8N forward failed: {e}")
            doc["forward_status"] = "error"
            doc["forward_error"] = str(e)[:300]
    else:
        doc["forward_status"] = "no_webhook_configured"

    try:
        await db.leads.insert_one(doc)
    except Exception as e:
        logger.error(f"Mongo insert failed: {e}")
        raise HTTPException(status_code=500, detail="Gagal menyimpan lead")

    return LeadOut(id=lead_id, status="ok", forwarded=forwarded, timestamp=now_iso)


@api_router.get("/leads/count")
async def leads_count():
    total = await db.leads.count_documents({})
    return {"total": total}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
