import { Paper, CopiesPerPage } from "./types";

// Ukuran kertas dalam milimeter.
export const PAPER_SIZE_MM: Record<Paper, { w: number; h: number }> = {
  A4: { w: 210, h: 297 },
  F4: { w: 210, h: 330 }, // Folio / F4
};

// 1 salinan = portrait; 2-3 salinan = landscape dibagi kolom.
export function isLandscape(copies: CopiesPerPage): boolean {
  return copies >= 2;
}

// Dimensi halaman (mm) setelah orientasi diterapkan.
export function pageDimsMm(paper: Paper, copies: CopiesPerPage) {
  const { w, h } = PAPER_SIZE_MM[paper];
  return isLandscape(copies) ? { w: h, h: w } : { w, h };
}

// Lebar satu kolom surat (mm), memperhitungkan jumlah kolom.
export function columnWidthMm(paper: Paper, copies: CopiesPerPage): number {
  const { w } = pageDimsMm(paper, copies);
  return w / copies;
}

export const MM_TO_PX = 96 / 25.4; // 1mm pada 96dpi

export function cssPageSize(paper: Paper, copies: CopiesPerPage): string {
  const mm = paper === "A4" ? "A4" : "210mm 330mm";
  const orientation = isLandscape(copies) ? "landscape" : "portrait";
  // F4 tidak punya keyword @page, gunakan ukuran eksplisit.
  if (paper === "F4") {
    return isLandscape(copies) ? "330mm 210mm" : "210mm 330mm";
  }
  return `${mm} ${orientation}`;
}
