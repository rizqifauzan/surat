"use client";

import { useEffect } from "react";
import { Letter, Letterhead } from "@/lib/types";
import { cssPageSize } from "@/lib/paper";
import LetterPage from "./LetterPage";

// Halaman cetak bersih: hanya kertas, memicu dialog print (Save as PDF).
export default function PrintView({
  letter,
  letterhead,
}: {
  letter: Letter;
  letterhead: Letterhead | null;
}) {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`@page { size: ${cssPageSize(
        letter.paper,
        letter.copiesPerPage
      )}; margin: 0; }`}</style>
      <div className="flex justify-center p-6 bg-slate-200 min-h-screen print:p-0 print:bg-white">
        <div className="print-area">
          <LetterPage letter={letter} letterhead={letterhead} scale={1} />
        </div>
      </div>
    </>
  );
}
