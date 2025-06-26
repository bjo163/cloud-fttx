---
applyTo: '**'
---

# INSTRUKSI TASK & AUDIT – PROJECT KJB

============================
🧠 FORMAT OUTPUT TASK ADVICE
============================

Tulis 10 saran tugas dalam format berikut:

1. Judul Tugas: [Singkat & Jelas]  
   Tipe: [New Feature / Bug Fix / Improvement / Enchancement UI-UX / Refactor / Security / Performance / structure / Content Rewriting]  
   Tingkat Kesulitan: [1–30]  
   Instruksi Teknis: [Langkah spesifik atau perintah langsung]  
   File/Folder Terkait: [path file/folder]  
   Rencana & Tujuan: [Output/fungsi yang ingin dicapai]

================
📌 CONTOH OUTPUT
================

1. Judul Tugas: Tambah Validasi Input Login  
   Tipe: Improvement  
   Tingkat Kesulitan: 4  
   Instruksi Teknis: Tambahkan validasi email kosong dan password minimum 6 karakter  
   File/Folder Terkait: /pages/login.js  
   Rencana & Tujuan: Hindari error login karena input kosong atau invalid

2. Judul Tugas: Integrasi Modul Pembayaran  
   Tipe: New Feature  
   Tingkat Kesulitan: 21  
   Instruksi Teknis: Integrasi dengan Midtrans via REST API dan webhook  
   File/Folder Terkait: /pages/payment.js, /api/payment.js  
   Rencana & Tujuan: Menyediakan fitur pembayaran online untuk pelanggan

===========================
📊 SKALA TINGKAT KESULITAN
===========================

01–05 = Tugas ringan: UI minor, teks, validasi sederhana  
06–10 = Fungsi tunggal, refactor komponen kecil  
11–15 = Perubahan fungsional menengah, integrasi API dasar  
16–20 = Fitur kompleks, refactor besar, error handling dalam flow penting  
21–25 = Multi modul integrasi, third-party, autentikasi kompleks  
26–30 = Arsitektur ulang, redesign sistem, perubahan besar skalabel

=====================
⚠️ RULES EKSEKUSI
=====================

❌ Jangan:

- Mengasumsikan fitur yang tidak ditemukan
- Menyarankan framework baru tanpa alasan kuat
- Menyusun ulang seluruh struktur tanpa bukti kebutuhan

✅ Wajib:

- Sebelum Memberikan Task Wajib Deep Dive dan membaca ke kode file dan struktur proyek
- Berdasarkan isi file & struktur nyata
- Langsung actionable
- Mengikuti konvensi & rule dari prompt
- **Cocokkan juga dengan UI/UX yang terlihat di:** https://kjbonline.net
- ✅ Periksa juga apakah struktur kode mengikuti linting dan auto-formatting menggunakan ESLint & Prettier

  📏 Perhatikan juga batasan jumlah baris kode:

- Maksimal 80 baris per fungsi
- Maksimal 500 baris per file/module
- Semua custom type/interface disimpan di `/types`
- Hindari mendefinisikan ulang tipe di banyak file
- Gunakan `export type` atau `export interface` per modul

============================
📤 FORMAT JSON (OPSIONAL)
============================

{
"task_id": 4,
"title": "Optimalkan Caching Data Pelanggan",
"type": "Improvement",
"difficulty": 14,
"file": "/lib/cache.js",
"instruction": "Tambahkan Redis caching untuk data pelanggan yang sering diakses",
"goal": "Kurangi waktu respon API dan beban DB"
}
