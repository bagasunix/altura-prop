import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, ShieldCheck, ChevronLeft } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;

const schema = z.object({
  name: z.string().trim().min(2, "Minimal 2 karakter"),
  phone: z
    .string()
    .trim()
    .refine((v) => phoneRegex.test(v.replace(/\s|-/g, "")), "Contoh: 08123456789"),
  city: z.string().trim().min(2, "Kota wajib diisi"),
  property_type: z.enum(["beli", "sewa", "investasi"], {
    errorMap: () => ({ message: "Pilih tipe properti" }),
  }),
  budget: z.string().min(1, "Pilih kisaran budget"),
  source: z.enum(["Instagram", "Google", "Referral", "Lainnya"], {
    errorMap: () => ({ message: "Pilih sumber" }),
  }),
});

const STEPS = [
  { id: 0, title: "Siapa Anda", fields: ["name", "phone", "city"] },
  { id: 1, title: "Kebutuhan", fields: ["property_type", "budget"] },
  { id: 2, title: "Bagaimana tahu kami", fields: ["source"] },
];

const BUDGETS = [
  "< 500 juta",
  "500 juta – 1 Miliar",
  "1 – 3 Miliar",
  "3 – 10 Miliar",
  "> 10 Miliar",
];

const PROPERTY_TYPES = [
  { v: "beli", label: "Beli" },
  { v: "sewa", label: "Sewa" },
  { v: "investasi", label: "Investasi" },
];

const SOURCES = ["Instagram", "Google", "Referral", "Lainnya"];

function Field({ label, error, children, testId }) {
  return (
    <div data-testid={testId}>
      <label className="block text-xs uppercase tracking-[0.18em] text-brand-mute mb-2">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      property_type: undefined,
      budget: "",
      source: undefined,
    },
  });

  useEffect(() => {
    const onPlan = (e) => setSelectedPlan(e.detail);
    window.addEventListener("altura:select-plan", onPlan);
    return () => window.removeEventListener("altura:select-plan", onPlan);
  }, []);

  const propertyType = watch("property_type");
  const source = watch("source");
  const budget = watch("budget");

  const goNext = async () => {
    const ok = await trigger(STEPS[step].fields);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await axios.post(`${API}/leads`, {
        ...data,
        plan: selectedPlan,
        utm_source: params.get("utm_source") || null,
        utm_campaign: params.get("utm_campaign") || null,
        page_url: window.location.href,
      });
      if (res.status >= 200 && res.status < 300) {
        setSuccess(true);
        toast.success("Pendaftaran diterima. Tim kami akan hubungi Anda.");
        setTimeout(() => {
          window.open("https://wa.me/6281234567890?text=Halo%20Altura%2C%20saya%20baru%20mendaftar%20trial", "_blank");
        }, 1800);
      } else {
        throw new Error("Bad status");
      }
    } catch (err) {
      const fallback = "https://wa.me/6281234567890?text=Halo%20Altura%2C%20saya%20ingin%20trial";
      toast.error(
        (t) => (
          <div className="flex flex-col gap-2">
            <span>Gagal mengirim. Hubungi kami via WhatsApp.</span>
            <a href={fallback} target="_blank" rel="noreferrer" className="text-brand-emerald underline">
              Buka WhatsApp →
            </a>
          </div>
        ),
        { duration: 6000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <section id="daftar" className="relative section-pad" data-testid="lead-form-section">
      <div className="mx-auto max-w-6xl px-5 md:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
        {/* Left pitch */}
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-4">Mulai Sekarang</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
            Mulai dalam <span className="italic text-brand-emerald">5 menit</span> — gratis 14 hari.
          </h2>
          <p className="mt-5 text-brand-mute leading-relaxed">
            Tidak perlu kartu kredit. Tim kami memandu setup, impor kontak, dan menghubungkan WhatsApp Business
            Anda. Setelah itu, AI bekerja otomatis.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-brand-text/90">
            {[
              "Onboarding personal dari tim Altura",
              "Jaminan uang kembali 30 hari",
              "Data Anda tetap milik Anda, enkripsi end-to-end",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-brand-emerald mt-0.5 shrink-0" />
                {x}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 text-xs text-brand-mute">
            <ShieldCheck size={14} className="text-brand-gold" />
            Data aman · Server Indonesia · Enkripsi end-to-end
          </div>
        </div>

        {/* Right form */}
        <div className="relative">
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-gold/30 via-transparent to-brand-emerald/30 opacity-60 blur-[1px]" aria-hidden />
          <div className="relative rounded-3xl border border-brand-line bg-brand-panel p-6 md:p-8">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-6 text-center"
                  data-testid="form-success"
                >
                  <div className="mx-auto w-14 h-14 rounded-full bg-brand-emerald/15 border border-brand-emerald/40 flex items-center justify-center">
                    <CheckCircle2 size={26} className="text-brand-emerald" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-brand-text">Pendaftaran diterima.</h3>
                  <p className="mt-3 text-brand-mute">
                    Kami akan membuka WhatsApp Anda dalam sesaat. Tim onboarding akan menghubungi dalam 15 menit.
                  </p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-brand-emerald text-brand-ink font-semibold"
                  >
                    Buka WhatsApp manual <ArrowRight size={16} />
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  data-testid="lead-form"
                  noValidate
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-brand-mute">
                        Langkah {step + 1} / {STEPS.length}
                      </div>
                      <div className="font-display text-xl text-brand-text mt-1">{STEPS[step].title}</div>
                    </div>
                    {selectedPlan && (
                      <div className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold">
                        {selectedPlan}
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="h-[4px] w-full rounded-full bg-white/5 overflow-hidden" data-testid="form-progress">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-emerald via-brand-teal to-brand-gold"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  {/* Step content */}
                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div
                        key="s0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <Field label="Nama Lengkap" error={errors.name?.message} testId="field-name">
                          <input
                            {...register("name")}
                            placeholder="Mis. Budi Santoso"
                            className="altura-input w-full h-[48px] rounded-xl px-4"
                            data-testid="input-name"
                          />
                        </Field>
                        <Field label="Nomor WhatsApp" error={errors.phone?.message} testId="field-phone">
                          <input
                            {...register("phone")}
                            inputMode="tel"
                            placeholder="08123456789"
                            className="altura-input w-full h-[48px] rounded-xl px-4"
                            data-testid="input-phone"
                          />
                        </Field>
                        <Field label="Kota" error={errors.city?.message} testId="field-city">
                          <input
                            {...register("city")}
                            placeholder="Mis. Jakarta"
                            className="altura-input w-full h-[48px] rounded-xl px-4"
                            data-testid="input-city"
                          />
                        </Field>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <Field label="Tipe Kebutuhan" error={errors.property_type?.message} testId="field-property-type">
                          <div className="grid grid-cols-3 gap-2" role="radiogroup">
                            {PROPERTY_TYPES.map((t) => {
                              const active = propertyType === t.v;
                              return (
                                <button
                                  type="button"
                                  key={t.v}
                                  onClick={() => setValue("property_type", t.v, { shouldValidate: true })}
                                  data-testid={`option-type-${t.v}`}
                                  className={`h-[48px] rounded-xl border text-sm transition min-h-[44px] ${
                                    active
                                      ? "border-brand-emerald bg-brand-emerald/10 text-brand-emerald"
                                      : "border-brand-line bg-brand-panel2 text-brand-text hover:border-white/20"
                                  }`}
                                >
                                  {t.label}
                                </button>
                              );
                            })}
                          </div>
                        </Field>
                        <Field label="Kisaran Budget" error={errors.budget?.message} testId="field-budget">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {BUDGETS.map((b) => {
                              const active = budget === b;
                              return (
                                <button
                                  type="button"
                                  key={b}
                                  onClick={() => setValue("budget", b, { shouldValidate: true })}
                                  data-testid={`option-budget-${b}`}
                                  className={`h-[48px] rounded-xl border text-sm transition px-3 ${
                                    active
                                      ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                                      : "border-brand-line bg-brand-panel2 text-brand-text hover:border-white/20"
                                  }`}
                                >
                                  {b}
                                </button>
                              );
                            })}
                          </div>
                        </Field>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <Field label="Bagaimana Anda tahu tentang Altura?" error={errors.source?.message} testId="field-source">
                          <div className="grid grid-cols-2 gap-2">
                            {SOURCES.map((s) => {
                              const active = source === s;
                              return (
                                <button
                                  type="button"
                                  key={s}
                                  onClick={() => setValue("source", s, { shouldValidate: true })}
                                  data-testid={`option-source-${s}`}
                                  className={`h-[48px] rounded-xl border text-sm transition min-h-[44px] ${
                                    active
                                      ? "border-brand-emerald bg-brand-emerald/10 text-brand-emerald"
                                      : "border-brand-line bg-brand-panel2 text-brand-text hover:border-white/20"
                                  }`}
                                >
                                  {s}
                                </button>
                              );
                            })}
                          </div>
                        </Field>
                        <div className="p-4 rounded-xl border border-brand-line bg-white/[0.02] text-xs text-brand-mute">
                          Dengan mendaftar, Anda menyetujui syarat layanan & kebijakan privasi Altura.
                          Kami tidak pernah membagikan data Anda ke pihak ketiga.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Nav buttons */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={goBack}
                        data-testid="form-back"
                        className="inline-flex items-center gap-1 text-sm text-brand-mute hover:text-brand-text min-h-[44px] px-3"
                      >
                        <ChevronLeft size={16} /> Kembali
                      </button>
                    ) : <span />}

                    {step < STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        data-testid="form-next"
                        className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-brand-emerald text-brand-ink font-semibold"
                      >
                        Lanjut <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        data-testid="form-submit"
                        className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-brand-gold text-brand-ink font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <span className="spinner" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            Kirim & Mulai Trial <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
