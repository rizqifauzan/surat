"use client";

import { CustomContent } from "@/lib/types";
import { Field, Input, Textarea } from "../ui";

export default function CustomForm({
  content,
  onChange,
}: {
  content: CustomContent;
  onChange: (c: CustomContent) => void;
}) {
  const set = (patch: Partial<CustomContent>) =>
    onChange({ ...content, ...patch });

  return (
    <div>
      <Field label="Judul">
        <Input
          value={content.judul}
          onChange={(e) => set({ judul: e.target.value })}
        />
      </Field>
      <Field label="Isi Surat">
        <Textarea
          rows={10}
          value={content.body}
          onChange={(e) => set({ body: e.target.value })}
        />
      </Field>
      <div className="rounded border border-slate-200 p-3">
        <div className="text-sm font-semibold text-slate-600 mb-2">
          Tanda Tangan
        </div>
        <Field label="Label Organisasi (opsional)">
          <Input
            value={content.labelOrganisasi}
            onChange={(e) => set({ labelOrganisasi: e.target.value })}
          />
        </Field>
        {[0, 1].map((i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field label={`Jabatan ${i === 0 ? "kiri" : "kanan"}`}>
              <Input
                value={content.penandatangan[i].jabatan}
                onChange={(e) => {
                  const p = [...content.penandatangan] as typeof content.penandatangan;
                  p[i] = { ...p[i], jabatan: e.target.value };
                  set({ penandatangan: p });
                }}
              />
            </Field>
            <Field label={`Nama ${i === 0 ? "kiri" : "kanan"}`}>
              <Input
                value={content.penandatangan[i].nama}
                onChange={(e) => {
                  const p = [...content.penandatangan] as typeof content.penandatangan;
                  p[i] = { ...p[i], nama: e.target.value };
                  set({ penandatangan: p });
                }}
              />
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
}
