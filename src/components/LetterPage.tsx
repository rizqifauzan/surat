"use client";

import { Letter, Letterhead } from "@/lib/types";
import { pageDimsMm, MM_TO_PX } from "@/lib/paper";
import LetterRender from "./LetterRender";

// Merender satu halaman kertas berisi 1/2/3 salinan surat yang sama,
// pada ukuran fisik sebenarnya (mm -> px @96dpi). Skala diatur oleh pemanggil.
export default function LetterPage({
  letter,
  letterhead,
  scale = 1,
}: {
  letter: Letter;
  letterhead: Letterhead | null;
  scale?: number;
}) {
  const dims = pageDimsMm(letter.paper, letter.copiesPerPage);
  const wPx = dims.w * MM_TO_PX;
  const hPx = dims.h * MM_TO_PX;
  const copies = Array.from({ length: letter.copiesPerPage });

  return (
    <div
      className="bg-white shadow-lg mx-auto origin-top"
      style={{
        width: wPx,
        height: hPx,
        transform: `scale(${scale})`,
      }}
    >
      <div className="flex h-full w-full">
        {copies.map((_, i) => (
          <div
            key={i}
            className="h-full overflow-hidden"
            style={{
              width: wPx / letter.copiesPerPage,
              padding: "10mm 8mm",
              borderRight:
                letter.copiesPerPage > 1 && i < letter.copiesPerPage - 1
                  ? "1px solid #000"
                  : undefined,
            }}
          >
            <LetterRender letter={letter} letterhead={letterhead} />
          </div>
        ))}
      </div>
    </div>
  );
}
