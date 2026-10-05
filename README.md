# Generator Surat

Aplikasi web untuk membuat berbagai jenis surat (Undangan, Pawartos Lelayu, dan Surat Bebas) tanpa perlu membuka Microsoft Office. Anda dapat mengedit kop surat, isi, dan tanda tangan melalui formulir, melihat pratinjau secara langsung, menyimpan ke database, serta mencetak atau mengunduh PDF langsung dari browser.

## Fitur

- **Template siap pakai** – Tersedia template Surat Undangan (kop, nomor surat, agenda, dan tanda tangan), Pawartos Lelayu (tabel keluarga dan teks Arab), serta Surat Bebas.
- **Kop surat yang fleksibel** – Dapat mengunggah logo dan menyesuaikan teks kop surat. Kop yang sudah disimpan bisa digunakan kembali untuk berbagai surat.
- **Tampilan multi-surat per halaman** – 1 surat per halaman (mode potret), atau 2–3 surat per halaman (mode lanskap) yang dibagi otomatis ke dalam kolom dengan garis pemisah.
- **Pilihan ukuran kertas** – Mendukung ukuran kertas A4 dan F4 (Folio).
- **Penyimpanan surat** – Surat bisa disimpan ke NeonDB (Postgres), lalu dibuka, diedit, digandakan, atau dihapus kapan saja.
- **Cetak dan unduh PDF** – Surat bisa dicetak atau diunduh langsung sebagai PDF melalui dialog cetak browser ("Simpan sebagai PDF"). Hasilnya akan sesuai dengan pratinjau yang ditampilkan.

## Menjalankan Aplikasi

```bash
npm install
cp .env.example .env      # lalu isi DATABASE_URL
npm run db:push           # membuat tabel di database
npm run dev               # buka http://localhost:3000
```

## Pengaturan NeonDB

1. Buat akun dan proyek di [neon.tech](https://neon.tech).
2. Salin _connection string_ dari dashboard Neon.
3. Tempel nilai tersebut ke variabel `DATABASE_URL` pada file `.env`.
4. Jalankan `npm run db:push` untuk membuat tabel `letters` dan `letterheads`.

> Catatan: Tanpa `DATABASE_URL`, aplikasi tetap bisa digunakan untuk membuat dan mencetak surat, namun fitur **simpan** tidak akan aktif.

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Drizzle ORM · @neondatabase/serverless

## Deployment

Aplikasi ini cocok di-deploy ke [Vercel](https://vercel.com). Cukup tambahkan variabel lingkungan `DATABASE_URL` di pengaturan proyek Vercel, lalu lakukan _deploy_.