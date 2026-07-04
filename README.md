# Generator Surat

Web app untuk membuat surat (Undangan, Pawartos Lelayu, dan surat bebas) tanpa
perlu membuka Office. Edit kop, isi, dan tanda tangan lewat form; lihat preview
langsung; simpan ke database; dan cetak/unduh PDF langsung dari browser.

## Fitur

- **Template siap pakai**: Surat Undangan (kop, nomor, agenda, tanda tangan),
  Pawartos Lelayu (tabel keluarga, teks Arab), dan surat bebas.
- **Kop mudah diganti**: upload logo + edit teks, kop tersimpan dan bisa dipakai
  ulang di banyak surat.
- **1 / 2 / 3 surat per halaman**: 1 = portrait, 2–3 = landscape dibagi kolom
  dengan garis pemisah (otomatis).
- **Ukuran kertas** A4 atau F4 (Folio).
- **Simpan** ke NeonDB (Postgres) — buka, edit, duplikat, atau hapus kapan saja.
- **Download PDF** lewat dialog cetak browser (Save as PDF), hasil sesuai
  preview.

## Menjalankan

```bash
npm install
cp .env.example .env      # lalu isi DATABASE_URL
npm run db:push           # buat tabel di NeonDB
npm run dev               # http://localhost:3000
```

### Setup NeonDB

1. Buat akun & project di [neon.tech](https://neon.tech).
2. Salin **connection string** dari dashboard.
3. Tempel ke `DATABASE_URL` di `.env`.
4. Jalankan `npm run db:push` untuk membuat tabel `letters` dan `letterheads`.

> Tanpa `DATABASE_URL`, app tetap bisa dipakai untuk membuat & mencetak surat —
> hanya fitur **simpan** yang nonaktif.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Drizzle ORM ·
@neondatabase/serverless.

## Deploy

Cocok untuk Vercel: set env `DATABASE_URL` di project settings, lalu deploy.
