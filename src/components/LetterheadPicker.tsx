"use client";

import { useEffect, useState } from "react";
import { Letterhead } from "@/lib/types";
import { api } from "@/lib/api";
import { fileToResizedDataUri } from "@/lib/image";
import { Field, Input, Button } from "./ui";

// Dropdown pilih kop + modal kelola kop (tambah/edit/hapus, upload logo).
export default function LetterheadPicker({
  value,
  onChange,
}: {
  value: Letterhead | null;
  onChange: (lh: Letterhead | null) => void;
}) {
  const [list, setList] = useState<Letterhead[]>([]);
  const [dbError, setDbError] = useState(false);
  const [editing, setEditing] = useState<Letterhead | null>(null);
  const [open, setOpen] = useState(false);

  async function reload() {
    try {
      const rows = await api.listLetterheads();
      setList(rows);
      setDbError(false);
    } catch {
      setDbError(true);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  function blankLetterhead(): Letterhead {
    return { id: 0, name: "", logo: null, line1: "", line2: "", line3: "" };
  }

  async function save() {
    if (!editing) return;
    try {
      let saved: Letterhead;
      if (editing.id && editing.id > 0) {
        saved = await api.updateLetterhead(editing.id, editing);
      } else {
        saved = await api.createLetterhead(editing);
      }
      await reload();
      onChange(saved);
      setEditing(null);
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function remove(lh: Letterhead) {
    if (!confirm(`Hapus kop "${lh.name}"?`)) return;
    try {
      await api.deleteLetterhead(lh.id);
      if (value?.id === lh.id) onChange(null);
      await reload();
    } catch (e: any) {
      alert(e.message);
    }
  }

  return (
    <div>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Field label="Kop Surat">
            <select
              className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
              value={value?.id ?? ""}
              onChange={(e) => {
                const id = Number(e.target.value);
                onChange(list.find((l) => l.id === id) ?? null);
              }}
            >
              <option value="">— Tanpa kop —</option>
              {list.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Button
          variant="secondary"
          type="button"
          onClick={() => setOpen(!open)}
          className="mb-3"
        >
          Kelola
        </Button>
      </div>

      {dbError && (
        <p className="text-xs text-amber-600 -mt-1 mb-2">
          Database belum dikonfigurasi — kop tidak bisa disimpan. Isi
          DATABASE_URL di .env.
        </p>
      )}

      {open && (
        <div className="rounded border border-slate-200 p-3 mb-3 bg-slate-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-600">
              Daftar Kop
            </span>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setEditing(blankLetterhead())}
            >
              + Kop baru
            </Button>
          </div>

          {list.length === 0 && !editing && (
            <p className="text-xs text-slate-500">Belum ada kop tersimpan.</p>
          )}

          <ul className="space-y-1">
            {list.map((l) => (
              <li
                key={l.id}
                className="flex items-center justify-between text-sm bg-white rounded px-2 py-1 border border-slate-200"
              >
                <span className="flex items-center gap-2">
                  {l.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.logo} alt="" className="h-6 w-6 object-contain" />
                  )}
                  {l.name}
                </span>
                <span className="flex gap-1">
                  <Button variant="ghost" type="button" onClick={() => setEditing(l)}>
                    Edit
                  </Button>
                  <Button variant="ghost" type="button" onClick={() => remove(l)}>
                    Hapus
                  </Button>
                </span>
              </li>
            ))}
          </ul>

          {editing && (
            <div className="mt-3 border-t border-slate-200 pt-3">
              <Field label="Nama kop (untuk daftar)">
                <Input
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />
              </Field>
              <Field label="Logo">
                <div className="flex items-center gap-3">
                  {editing.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={editing.logo}
                      alt="logo"
                      className="h-12 w-12 object-contain border border-slate-200 rounded"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const uri = await fileToResizedDataUri(f);
                      setEditing({ ...editing, logo: uri });
                    }}
                    className="text-xs"
                  />
                  {editing.logo && (
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => setEditing({ ...editing, logo: null })}
                    >
                      Hapus logo
                    </Button>
                  )}
                </div>
              </Field>
              <Field label="Baris 1 (Nama Organisasi)">
                <Input
                  value={editing.line1}
                  onChange={(e) =>
                    setEditing({ ...editing, line1: e.target.value })
                  }
                />
              </Field>
              <Field label="Baris 2 (Sub-judul)">
                <Input
                  value={editing.line2}
                  onChange={(e) =>
                    setEditing({ ...editing, line2: e.target.value })
                  }
                />
              </Field>
              <Field label="Baris 3 (Alamat)">
                <Input
                  value={editing.line3}
                  onChange={(e) =>
                    setEditing({ ...editing, line3: e.target.value })
                  }
                />
              </Field>
              <div className="flex gap-2">
                <Button type="button" onClick={save}>
                  Simpan kop
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setEditing(null)}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
