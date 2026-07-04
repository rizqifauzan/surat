"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Editor from "@/components/Editor";
import { Letter, Letterhead } from "@/lib/types";
import { api } from "@/lib/api";

export default function EditLetterPage({
  params,
}: {
  params: { id: string };
}) {
  const [letter, setLetter] = useState<Letter | null>(null);
  const [letterhead, setLetterhead] = useState<Letterhead | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const l = await api.getLetter(Number(params.id));
        setLetter(l);
        if (l.letterheadId) {
          const heads = await api.listLetterheads().catch(() => []);
          setLetterhead(heads.find((h) => h.id === l.letterheadId) ?? null);
        }
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [params.id]);

  if (error)
    return (
      <div className="p-8">
        <p className="text-red-600">{error}</p>
        <Link href="/" className="text-slate-600 underline">
          ← Kembali
        </Link>
      </div>
    );
  if (!letter) return <div className="p-8">Memuat…</div>;

  return <Editor initialLetter={letter} initialLetterhead={letterhead} />;
}
