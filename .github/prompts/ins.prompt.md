---
mode: agent
---

# Prompt AI: Audit & Task Advisory untuk Project Web Apps

🧾 Prompt ID: KJB-AUDIT-V1  
📅 Revisi: 2025-06-17

## 🏢 Brand: KJB

## Company: PT Aura Teknologi Indonesia

## 📧 Email: info@kjbonline.net

## 🌐 Website: [kjbonline.net](https://kjbonline.net)

### Bidang Bisnis:

- ISP (Internet Service Provider)
- Smart Home
- IoT & CCTV
- Instalasi Jaringan Fiber & Wireless
- Instalasi Listrik

---

## 🎯 TUJUAN

Lakukan audit dan analisis menyeluruh terhadap project Web Apps milik KJB. Tujuan akhir adalah menghasilkan 10 rekomendasi tugas yang jujur, actionable, dan relevan dengan kondisi proyek saat ini.

---

## 👥 TARGET PENGGUNA & PLATFORM

### Target User:

- Pelanggan internet (rumah & kantor)
- Teknisi lapangan
- Admin pusat monitoring (NOC)

### Target Platform:

- Web Admin Panel (desktop)
- Portal Pelanggan (mobile & desktop)

---

=======================
✅ INSTRUKSI UTAMA
=======================

1. Baca dan analisa seluruh struktur folder & file (_.js, _.ts, _.jsx, _.tsx, _.vue, _.html, _.css, _.scss, _.json, _.env)
2. Identifikasi fitur utama
3. Pahami tampilan & antarmuka pengguna
   - Gunakan tools seperti Chrome DevTools untuk inspeksi elemen
   - Periksa konsol untuk error atau warning
4. Catat dependencies & framework yang digunakan
5. Temukan error, bug, atau kekurangan pada UI/API
6. Pelajari proses login, routing, dan komunikasi backend
7. Simak semua integrasi pihak ketiga (API eksternal, auth, dsb)
8. **📡 Kunjungi dan telusuri tampilan situs live:** https://kjbonline.net  
   → Gunakan ini untuk memahami visualisasi UI/UX, halaman penting, dan alur pelanggan.

---

## 📁 PRIORITAS FILE (Jika Tersedia)

- /pages/dashboard.js
- /pages/login.js
- /api/customer.js
- /components/UsageGraph.jsx

---

## 📁 OUTPUT LANGKAH 1: STRUKTUR PROYEK

- Sebutkan 5–10 folder/file utama yang paling relevan.
- Contoh: /pages, /components, /api, next.config.js, dll.

---

===============================
💡 CODING RULES & KONVENSI DEV
===============================
📦 Struktur Folder:

- Modular (pages, components, api, lib, utils)

📌 Penamaan:

- camelCase: variabel & fungsi (getUserData)
- PascalCase: React/Vue Component (UserCard)
- kebab-case: file frontend (user-profile.jsx)
- snake_case: endpoint API (get_user_data)

🧼 Format:

- Indent 2 spasi
- Gunakan semicolon
- Sertakan JSDoc di public functions

📏 Batasan Jumlah Baris:

- Maksimal 80 baris per fungsi
- Maksimal 500 baris per file/module
- Pecah fungsi atau pindahkan ke utils/types jika melebihi batas

🧹 Linting & Prettier Rules:

- Gunakan ESLint (airbnb-base atau next/recommended)
- Gunakan Prettier untuk auto-formatting

  📂 Type Definition Rules:

- Semua custom type/interface disimpan di `/types`
- Hindari mendefinisikan ulang tipe di banyak file
- Gunakan `export type` atau `export interface` per modul

  🛡️ Best Practice:

- Validasi input API (Yup/Zod)
- Gunakan try-catch untuk async
- Hindari `any` (TS), hardcoded API key
- Gunakan JWT/token expiry

🔐 Keamanan:

- Jangan expose credentials
- Validasi semua input frontend di backend
- Tangani error API dengan jelas
- Antisipasi XSS/SQL Injection

🛠️ Git Rules:

- Branch: feature/, bugfix/, hotfix/
- Commit: feat:, fix:, refactor:
