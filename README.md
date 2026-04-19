# Altura Prop

Monorepo dengan dua bagian:

- `frontend/` — React 19 + CRA 5 + craco + Tailwind + shadcn/ui
- `backend/` — (Python)

## Frontend (npm)

Project ini sudah dipindah dari yarn ke **npm**. File `frontend/.npmrc` sudah
mengaktifkan `legacy-peer-deps=true` supaya peer dep React 19 vs paket lama
(seperti `cmdk`, `vaul`) tidak menggagalkan install.

```bash
cd frontend
npm install
npm start         # dev server di http://localhost:3000
npm run build     # output ke frontend/build
npm test
```

## Deploy ke Vercel

Sudah disiapkan `vercel.json` di root yang mengarahkan Vercel ke folder
`frontend/` dan otomatis menjalankan `npm install --legacy-peer-deps` lalu
`npm run build`. Jadi cukup:

1. Import repo ini di [vercel.com/new](https://vercel.com/new).
2. Biarkan **Root Directory** = `./` (root). `vercel.json` akan menangani sisanya.
3. Pastikan **Node.js Version** di Project Settings diset ke **20.x**
   (sudah dipin di `frontend/package.json` field `engines`).
4. Tambahkan environment variables yang dibutuhkan (lihat
   `frontend/.env.example`) di Project Settings → Environment Variables.
5. Klik Deploy.

### Alternatif: set Root Directory ke `frontend`

Jika lebih suka cara klasik, hapus `vercel.json` di root, lalu di Vercel Project
Settings → General → Root Directory, set ke `frontend`. Vercel akan auto-detect
Create React App dan menggunakan `frontend/.npmrc` (yang sudah ada
`legacy-peer-deps=true`).

### Troubleshooting deploy

- **`npm install exited with 1`** → Pastikan `frontend/.npmrc` ter-commit (file
  ini yang menambahkan flag `legacy-peer-deps`).
- **`Cannot find module 'ajv/dist/compile/codegen'`** → Pastikan `ajv@^8.17.1`
  ada di `dependencies` `frontend/package.json` (sudah ditambahkan).
- **Build berhasil tapi 404 saat refresh route** → SPA rewrite sudah ditangani
  `vercel.json`, tapi pastikan tidak ada konfigurasi lain yang menimpanya.
