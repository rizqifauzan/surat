"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Letter,
  Letterhead,
  CopiesPerPage,
  Paper,
  UndanganContent,
  LelayuContent,
  CustomContent,
} from "@/lib/types";
import { api } from "@/lib/api";
import { pageDimsMm, MM_TO_PX } from "@/lib/paper";
import { Button, Input } from "./ui";
import LetterPage from "./LetterPage";
import LetterheadPicker from "./LetterheadPicker";
import UndanganForm from "./forms/UndanganForm";
import LelayuForm from "./forms/LelayuForm";
import CustomForm from "./forms/CustomForm";

export default function Editor({
  initialLetter,
  initialLetterhead,
}: {
  initialLetter: Letter;
  initialLetterhead: Letterhead | null;
}) {
  const router = useRouter();
  const [letter, setLetter] = useState<Letter>(initialLetter);
  const [letterhead, setLetterhead] = useState<Letterhead | null>(
    initialLetterhead
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [scale, setScale] = useState(0.6);
  const previewWrap = useRef<HTMLDivElement>(null);

  // Auto-fit skala preview terhadap lebar container.
  useEffect(() => {
    function fit() {
      const el = previewWrap.current;
      if (!el) return;
      const dims = pageDimsMm(letter.paper, letter.copiesPerPage);
      const wPx = dims.w * MM_TO_PX;
      const avail = el.clientWidth - 32;
      setScale(Math.min(1, avail / wPx));
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [letter.paper, letter.copiesPerPage]);

  function update(patch: Partial<Letter>) {
    setLetter((l) => ({ ...l, ...patch }));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const payload: Partial<Letter> = {
        ...letter,
        letterheadId: letterhead?.id && letterhead.id > 0 ? letterhead.id : null,
      };
      let saved: Letter;
      if (letter.id && letter.id > 0) {
        saved = await api.updateLetter(letter.id, payload);
      } else {
        saved = await api.createLetter(payload);
        router.replace(`/editor/${saved.id}`);
      }
      setLetter((l) => ({ ...l, id: saved.id }));
      setMessage("Tersimpan ✓");
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setSaving(false);
    }
  }

  function print() {
    if (letter.id && letter.id > 0) {
      window.open(`/print/${letter.id}`, "_blank");
    } else {
      // Belum tersimpan: simpan dulu payload ke sessionStorage untuk print.
      sessionStorage.setItem(
        "surat-print-draft",
        JSON.stringify({ letter, letterhead })
      );
      window.open(`/print/draft`, "_blank");
    }
  }

  const dims = pageDimsMm(letter.paper, letter.copiesPerPage);

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <header className="no-print border-b border-slate-200 bg-white px-4 py-2 flex items-center gap-3">
        <Link href="/" className="text-slate-500 hover:text-slate-800 text-sm">
          ← Daftar
        </Link>
        <Input
          className="max-w-xs"
          value={letter.title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="Judul surat"
        />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Salinan/halaman:</span>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => update({ copiesPerPage: n as CopiesPerPage })}
              className={`w-8 h-8 rounded border text-sm ${
                letter.copiesPerPage === n
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white border-slate-300"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <select
          className="rounded border border-slate-300 px-2 py-1.5 text-sm"
          value={letter.paper}
          onChange={(e) => update({ paper: e.target.value as Paper })}
        >
          <option value="A4">A4</option>
          <option value="F4">F4 (Folio)</option>
        </select>
        <div className="flex-1" />
        {message && (
          <span className="text-sm text-slate-500">{message}</span>
        )}
        <Button variant="secondary" onClick={print}>
          Download PDF
        </Button>
        <Button onClick={save} disabled={saving}>
          {saving ? "Menyimpan…" : "Simpan"}
        </Button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Form panel */}
        <div className="w-[440px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 no-print">
          {(letter.type === "undangan" || letter.type === "custom") && (
            <LetterheadPicker value={letterhead} onChange={setLetterhead} />
          )}
          {letter.type === "undangan" && (
            <UndanganForm
              content={letter.content as UndanganContent}
              onChange={(c) => update({ content: c })}
            />
          )}
          {letter.type === "lelayu" && (
            <LelayuForm
              content={letter.content as LelayuContent}
              onChange={(c) => update({ content: c })}
            />
          )}
          {letter.type === "custom" && (
            <CustomForm
              content={letter.content as CustomContent}
              onChange={(c) => update({ content: c })}
            />
          )}
        </div>

        {/* Preview panel */}
        <div
          ref={previewWrap}
          className="flex-1 overflow-auto bg-slate-100 p-4 flex justify-center"
        >
          <div
            style={{
              width: dims.w * MM_TO_PX * scale,
              height: dims.h * MM_TO_PX * scale,
            }}
          >
            <LetterPage
              letter={letter}
              letterhead={letterhead}
              scale={scale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
