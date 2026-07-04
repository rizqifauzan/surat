"use client";

import { UndanganContent } from "@/lib/types";
import { Field, Input, Textarea, StringList } from "../ui";

export default function UndanganForm({
  content,
  onChange,
}: {
  content: UndanganContent;
  onChange: (c: UndanganContent) => void;
}) {
  const set = (patch: Partial<UndanganContent>) =>
    onChange({ ...content, ...patch });

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nomor Surat">
          <Input
            value={content.nomor}
            onChange={(e) => set({ nomor: e.target.value })}
          />
        </Field>
        <Field label="Lampiran">
          <Input
            value={content.lampiran}
            onChange={(e) => set({ lampiran: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Perihal">
        <Input
          value={content.perihal}
          onChange={(e) => set({ perihal: e.target.value })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Kota">
          <Input
            value={content.kota}
            onChange={(e) => set({ kota: e.target.value })}
          />
        </Field>
        <Field label="Tanggal Surat">
          <Input
            value={content.tanggal}
            onChange={(e) => set({ tanggal: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Tujuan (Kepada Yth.)">
        <Input
          value={content.tujuan}
          onChange={(e) => set({ tujuan: e.target.value })}
        />
      </Field>
      <Field label="Baris kedua tujuan">
        <Input
          value={content.ditempat}
          onChange={(e) => set({ ditempat: e.target.value })}
        />
      </Field>
      <Field label="Salam Pembuka">
        <Input
          value={content.salamPembuka}
          onChange={(e) => set({ salamPembuka: e.target.value })}
        />
      </Field>
      <Field label="Paragraf Pembuka">
        <Textarea
          rows={3}
          value={content.paragrafPembuka}
          onChange={(e) => set({ paragrafPembuka: e.target.value })}
        />
      </Field>

      <div className="rounded border border-slate-200 p-3 mb-3">
        <div className="text-sm font-semibold text-slate-600 mb-2">
          Detail Acara
        </div>
        <Field label="Hari/Tanggal">
          <Input
            value={content.acara.hariTanggal}
            onChange={(e) =>
              set({ acara: { ...content.acara, hariTanggal: e.target.value } })
            }
          />
        </Field>
        <Field label="Waktu">
          <Input
            value={content.acara.waktu}
            onChange={(e) =>
              set({ acara: { ...content.acara, waktu: e.target.value } })
            }
          />
        </Field>
        <Field label="Tempat">
          <Input
            value={content.acara.tempat}
            onChange={(e) =>
              set({ acara: { ...content.acara, tempat: e.target.value } })
            }
          />
        </Field>
      </div>

      <Field label="Agenda">
        <StringList
          items={content.agenda}
          onChange={(agenda) => set({ agenda })}
          placeholder="Poin agenda"
        />
      </Field>

      <Field label="Paragraf Penutup">
        <Textarea
          rows={3}
          value={content.paragrafPenutup}
          onChange={(e) => set({ paragrafPenutup: e.target.value })}
        />
      </Field>
      <Field label="Salam Penutup">
        <Input
          value={content.salamPenutup}
          onChange={(e) => set({ salamPenutup: e.target.value })}
        />
      </Field>

      <div className="rounded border border-slate-200 p-3">
        <div className="text-sm font-semibold text-slate-600 mb-2">
          Tanda Tangan
        </div>
        <Field label="Label Organisasi">
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
