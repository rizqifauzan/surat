"use client";

import { LelayuContent } from "@/lib/types";
import { Field, Input, Textarea, Button } from "../ui";

export default function LelayuForm({
  content,
  onChange,
}: {
  content: LelayuContent;
  onChange: (c: LelayuContent) => void;
}) {
  const set = (patch: Partial<LelayuContent>) =>
    onChange({ ...content, ...patch });

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Judul">
          <Input
            value={content.judul}
            onChange={(e) => set({ judul: e.target.value })}
          />
        </Field>
        <Field label="Alamat">
          <Input
            value={content.alamat}
            onChange={(e) => set({ alamat: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Nama Almarhum/Almarhumah">
        <Input
          value={content.nama}
          onChange={(e) => set({ nama: e.target.value })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Yuswo (Usia)">
          <Input
            value={content.yuswo}
            onChange={(e) => set({ yuswo: e.target.value })}
          />
        </Field>
        <Field label="Pidalem ing">
          <Input
            value={content.pidalemIng}
            onChange={(e) => set({ pidalemIng: e.target.value })}
          />
        </Field>
        <Field label="Dinten, Suryo">
          <Input
            value={content.dintenSuryo}
            onChange={(e) => set({ dintenSuryo: e.target.value })}
          />
        </Field>
        <Field label="Tabuh (Waktu)">
          <Input
            value={content.tabuh}
            onChange={(e) => set({ tabuh: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Kalimat Sampun">
        <Input
          value={content.kalimatSampun}
          onChange={(e) => set({ kalimatSampun: e.target.value })}
        />
      </Field>
      <Field label="Paragraf Permohonan Maaf">
        <Textarea
          rows={4}
          value={content.paragrafPermohonan}
          onChange={(e) => set({ paragrafPermohonan: e.target.value })}
        />
      </Field>
      <Field label="Paragraf Penutup">
        <Textarea
          rows={2}
          value={content.paragrafPenutup}
          onChange={(e) => set({ paragrafPenutup: e.target.value })}
        />
      </Field>

      <div className="rounded border border-slate-200 p-3">
        <div className="text-sm font-semibold text-slate-600 mb-2">
          Keluarga yang Berduka
        </div>
        <div className="space-y-2">
          {content.keluarga.map((row, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="flex-1">
                <Input
                  placeholder="Nama"
                  value={row.nama}
                  onChange={(e) => {
                    const k = [...content.keluarga];
                    k[i] = { ...k[i], nama: e.target.value };
                    set({ keluarga: k });
                  }}
                />
              </div>
              <div className="w-28 shrink-0">
                <Input
                  placeholder="Hubungan"
                  value={row.hubungan}
                  onChange={(e) => {
                    const k = [...content.keluarga];
                    k[i] = { ...k[i], hubungan: e.target.value };
                    set({ keluarga: k });
                  }}
                />
              </div>
              <Button
                variant="ghost"
                type="button"
                onClick={() =>
                  set({ keluarga: content.keluarga.filter((_, j) => j !== i) })
                }
              >
                ✕
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              set({
                keluarga: [...content.keluarga, { nama: "", hubungan: "" }],
              })
            }
          >
            + Tambah anggota
          </Button>
        </div>
      </div>
    </div>
  );
}
