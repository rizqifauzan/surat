"use client";

import { useState } from "react";
import Link from "next/link";
import LetterheadPicker from "@/components/LetterheadPicker";
import { Letterhead } from "@/lib/types";

export default function LetterheadsPage() {
  const [selected, setSelected] = useState<Letterhead | null>(null);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-slate-500 hover:text-slate-800 text-sm">
        ← Daftar surat
      </Link>
      <h1 className="text-2xl font-bold text-slate-800 mt-2">Kelola Kop Surat</h1>
      <p className="text-slate-500 mt-1 mb-6">
        Buat dan simpan kop surat (logo + teks) untuk dipakai ulang di berbagai
        surat. Klik <strong>Kelola</strong> untuk menamb/mengedit.
      </p>
      <LetterheadPicker value={selected} onChange={setSelected} />
    </main>
  );
}
