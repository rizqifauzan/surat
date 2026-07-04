# Plan: Web App Generator Surat (Undangan & Lelayu)

## 1. Tujuan

Web app full-stack untuk membuat surat tanpa buka Office:

- Dua template awal: **Surat Undangan** (contoh: Karang Taruna RAGIL) dan **Pawartos Lelayu**, plus surat custom
- **Kop, body, dan tanda tangan mudah diganti** lewat form
- Layout **1 / 2 / 3 surat per halaman** (otomatis: 1 = portrait, 2–3 = landscape dibagi kolom dengan garis pemisah)
- **Simpan** surat & kop ke database (NeonDB), bisa dibuka/edit/duplikat lagi
- **Download PDF** langsung dari browser
- Tanpa login

## 2. Stack Teknologi

| Bagian | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) | Frontend + API dalam satu codebase, deploy mudah ke Vercel |
| Styling | Tailwind CSS | Cepat, cocok untuk layout kertas presisi |
| Database | NeonDB (Postgres serverless) | Koneksi via `@neondatabase/serverless`, `DATABASE_URL` di `.env` |
| ORM | Drizzle ORM + drizzle-kit | Ringan, schema TypeScript, `drizzle-kit push` untuk migrasi |
| PDF | `window.print()` + CSS `@page` | Hasil paling akurat terhadap preview, tanpa library berat; tombol "Download PDF" membuka dialog print → Save as PDF |
| Logo | Data-URI (base64) di DB | Logo kecil, tidak perlu object storage terpisah |

## 3. Struktur Project

```
src/
  app/
    page.tsx                    # Daftar surat tersimpan (buka, hapus, duplikat)
    editor/new/page.tsx         # Pilih template: Undangan / Lelayu / Kosong
    editor/[id]/page.tsx        # Editor + live preview
    print/[id]/page.tsx         # Print view bersih (tanpa UI) untuk PDF
    letterheads/page.tsx        # Kelola kop surat (CRUD + upload logo)
    api/
      letters/route.ts          # GET list, POST create
      letters/[id]/route.ts     # GET, PUT, DELETE
      letterheads/route.ts      # GET list, POST create
      letterheads/[id]/route.ts # PUT, DELETE
  db/
    schema.ts                   # Skema Drizzle
    index.ts                    # Koneksi Neon (baca DATABASE_URL)
  components/
    LetterEditor.tsx            # Panel form kiri (field dinamis per tipe surat)
    LetterPreview.tsx           # Render halaman sesuai kertas & jumlah salinan
    LetterheadPicker.tsx        # Dropdown kop + upload logo
    templates/
      Undangan.tsx              # Render surat undangan
      Lelayu.tsx                # Render pawartos lelayu
      Custom.tsx                # Surat bebas (teks sederhana)
  lib/
    templates.ts                # Data default tiap jenis surat
    paper.ts                    # Ukuran A4/F4, orientasi, pembagian kolom
drizzle.config.ts
.env.example                    # DATABASE_URL=postgres://...
README.md                       # Cara setup Neon + deploy Vercel
```

## 4. Skema Database

**`letterheads`** (kop surat, dipakai ulang antar surat)

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | serial PK | |
| name | text | Nama kop, mis. "Karang Taruna RAGIL" |
| logo | text nullable | Gambar logo sebagai data-URI |
| line1 / line2 / line3 | text | Nama organisasi, sub-judul, alamat |
| created_at | timestamp | |

**`letters`**

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | serial PK | |
| title | text | Judul untuk daftar, mis. "Undangan Musyawarah 17-an" |
| type | text | `undangan` \| `lelayu` \| `custom` |
| letterhead_id | FK nullable | Kop yang dipakai (lelayu tanpa kop logo → nullable) |
| content | jsonb | Semua field isi surat (lihat bawah) |
| copies_per_page | int | 1, 2, atau 3 |
| paper | text | `A4` \| `F4` |
| created_at, updated_at | timestamp | |

**Isi `content` per tipe:**

- **undangan**: nomor, lampiran, perihal, kota & tanggal surat, tujuan ("Kepada Yth…"), salam pembuka, paragraf pembuka, detail acara (hari/tanggal, waktu, tempat), agenda[] (list), paragraf penutup, salam penutup, blok ttd: label organisasi + dua penandatangan (jabatan + nama), masing-masing bisa diedit
- **lelayu**: judul, baris alamat, teks salam Arab (default السلام عليكم…), kalimat inna lillahi, nama almarhum/almarhumah, yuswo, pidalem ing, dinten/suryo, tabuh, paragraf permohonan maaf, paragraf penutup, salam penutup Arab, tabel keluarga[] (nama + hubungan), kolom "Katur Dumateng / Ing" (kotak kosong untuk diisi tangan)
- **custom**: judul + body teks bebas + blok ttd

## 5. Fitur Editor

- **Split view**: form di kiri, live preview di kanan (di-scale agar muat layar, proporsional dengan kertas asli)
- Field form menyesuaikan tipe surat; agenda & daftar keluarga bisa tambah/hapus/urut baris
- **Pilih kop** dari dropdown kop tersimpan; tombol kelola kop → upload logo (di-resize di browser sebelum jadi data-URI), edit teks kop
- **Pilih salinan per halaman**: 1 (portrait), 2 (landscape, 2 kolom + garis tengah), 3 (landscape, 3 kolom + garis) — konten surat otomatis diduplikasi ke tiap kolom
- **Pilih kertas**: A4 / F4
- **Simpan** → POST/PUT API; indikator tersimpan/belum
- **Download PDF** → buka `/print/[id]`, CSS `@page { size: A4 landscape }` dst., `window.print()` otomatis; user pilih "Save as PDF"

## 6. Ketahanan tanpa DB

Kalau `DATABASE_URL` belum diisi, API mengembalikan error yang jelas ("Database belum dikonfigurasi, isi DATABASE_URL di .env") — editor, preview, dan print tetap berfungsi (data di state browser); hanya fitur simpan yang nonaktif dengan pesan tersebut.

## 7. Urutan Implementasi

1. Scaffold Next.js + Tailwind + Drizzle; `.env.example`; README setup (buat project Neon → salin connection string → `npm run db:push`)
2. Skema DB + API routes CRUD (letters, letterheads)
3. Komponen template `Undangan` & `Lelayu` meniru contoh (kop bergaris ganda, format nomor/lampiran/perihal, tabel keluarga, teks Arab, blok ttd dua kolom)
4. `LetterPreview` + logika kertas/orientasi/kolom 1-2-3
5. Editor split-view + kelola kop + upload logo
6. Halaman daftar surat + duplikat + hapus
7. Print view + CSS `@page` untuk PDF
8. Verifikasi: `npm run build`, uji end-to-end dengan Playwright (buat undangan, buat lelayu, screenshot preview 1/2/3 kolom, cek print view)

## 8. Cara Verifikasi

- Build lulus tanpa error
- Screenshot preview dibandingkan dengan contoh surat asli (undangan 2-per-halaman, lelayu 3-per-halaman)
- CRUD diuji terhadap Neon kalau connection string tersedia; kalau belum, diuji jalur error-nya
