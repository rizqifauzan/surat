"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Editor from "@/components/Editor";
import { Letter, LetterType } from "@/lib/types";
import { defaultContent, defaultTitle, defaultLetterhead } from "@/lib/templates";

function NewEditor() {
  const params = useSearchParams();
  const type = (params.get("type") as LetterType) || "undangan";

  const letter: Letter = {
    id: 0,
    title: defaultTitle(type),
    type,
    letterheadId: null,
    content: defaultContent(type),
    copiesPerPage: type === "lelayu" ? 3 : 1,
    paper: "A4",
  };

  // Untuk undangan/custom sediakan kop contoh sebagai titik awal.
  const lh = type === "lelayu" ? null : defaultLetterhead();

  return <Editor initialLetter={letter} initialLetterhead={lh} />;
}

export default function NewLetterPage() {
  return (
    <Suspense fallback={<div className="p-8">Memuat…</div>}>
      <NewEditor />
    </Suspense>
  );
}
