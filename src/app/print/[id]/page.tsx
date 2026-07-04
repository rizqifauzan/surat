"use client";

import { useEffect, useState } from "react";
import PrintView from "@/components/PrintView";
import { Letter, Letterhead } from "@/lib/types";
import { api } from "@/lib/api";

export default function PrintPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<{
    letter: Letter;
    letterhead: Letterhead | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (params.id === "draft") {
        const raw = sessionStorage.getItem("surat-print-draft");
        if (!raw) {
          setError("Draft tidak ditemukan.");
          return;
        }
        setData(JSON.parse(raw));
        return;
      }
      try {
        const letter = await api.getLetter(Number(params.id));
        let letterhead: Letterhead | null = null;
        if (letter.letterheadId) {
          const heads = await api.listLetterheads().catch(() => []);
          letterhead = heads.find((h) => h.id === letter.letterheadId) ?? null;
        }
        setData({ letter, letterhead });
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [params.id]);

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!data) return <div className="p-8">Menyiapkan cetak…</div>;

  return <PrintView letter={data.letter} letterhead={data.letterhead} />;
}
