"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Letter, LetterType } from "@/lib/types";
import { api } from "@/lib/api";
import { LETTER_TYPE_LABEL } from "@/lib/templates";
import { Button } from "@/components/ui";

export default function HomePage() {
  const router = useRouter();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [dbError, setDbError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function reload() {
    try {
      const rows = await api.listLetters();
      setLetters(rows);
      setDbError(null);
    } catch (e: any) {
      setDbError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function duplicate(l: Letter) {
    try {
      const copy = await api.createLetter({
        title: l.title + " (salinan)",
        type: l.type,
        letterheadId: l.letterheadId,
        content: l.content,
        copiesPerPage: l.copiesPerPage,
        paper: l.paper,
      });
      router.push(`/editor/${copy.id}`);
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function remove(l: Letter) {
    if (!confirm(`Hapus surat "${l.title}"?`)) return;
    try {
      await api.deleteLetter(l.id);
      reload();
    } catch (e: any) {
      alert(e.message);
    }
  }

  const types: LetterType[] = ["undangan", "lelayu", "custom"];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-slate-800">Generator Surat</h1>
      <p className="text-slate-500 mt-1">
        Buat surat undangan & pawartos lelayu, simpan, dan cetak PDF.
      </p>

      {/* Buat baru */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-slate-600 mb-2">
          Buat surat baru
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {types.map((t) => (
            <Link
              key={t}
              href={`/editor/new?type=${t}`}
              className="rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-400 hover:shadow-sm transition"
            >
              <div className="font-semibold text-slate-800">
                {LETTER_TYPE_LABEL[t]}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {t === "undangan" && "Surat resmi dengan kop, agenda, tanda tangan"}
                {t === "lelayu" && "Pawartos lelayu dengan tabel keluarga"}
                {t === "custom" && "Surat bebas isi sendiri"}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Daftar tersimpan */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-slate-600">
            Surat tersimpan
          </h2>
          <Link
            href="/letterheads"
            className="text-sm text-slate-500 hover:text-slate-800 underline"
          >
            Kelola kop surat
          </Link>
        </div>

        {loading && <p className="text-slate-500">Memuat…</p>}

        {dbError && (
          <div className="rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            <p className="font-medium">Database belum dikonfigurasi.</p>
            <p className="mt-1">
              Kamu tetap bisa membuat & mencetak surat, tapi untuk menyimpan
              isilah <code className="bg-amber-100 px-1">DATABASE_URL</code> di
              file <code className="bg-amber-100 px-1">.env</code> (lihat{" "}
              <code className="bg-amber-100 px-1">.env.example</code>) lalu jalankan{" "}
              <code className="bg-amber-100 px-1">npm run db:push</code>.
            </p>
          </div>
        )}

        {!loading && !dbError && letters.length === 0 && (
          <p className="text-slate-500">Belum ada surat tersimpan.</p>
        )}

        <ul className="space-y-2 mt-2">
          {letters.map((l) => (
            <li
              key={l.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
            >
              <div>
                <Link
                  href={`/editor/${l.id}`}
                  className="font-medium text-slate-800 hover:underline"
                >
                  {l.title}
                </Link>
                <div className="text-xs text-slate-500">
                  {LETTER_TYPE_LABEL[l.type]} · {l.copiesPerPage}/halaman ·{" "}
                  {l.paper}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  onClick={() => window.open(`/print/${l.id}`, "_blank")}
                >
                  PDF
                </Button>
                <Button variant="ghost" onClick={() => duplicate(l)}>
                  Duplikat
                </Button>
                <Button variant="ghost" onClick={() => remove(l)}>
                  Hapus
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
