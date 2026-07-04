import { Letter, Letterhead } from "./types";

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request gagal (${res.status})`);
  }
  return res.json();
}

export const api = {
  listLetters: () => fetch("/api/letters").then((r) => json<Letter[]>(r)),
  getLetter: (id: number) =>
    fetch(`/api/letters/${id}`).then((r) => json<Letter>(r)),
  createLetter: (data: Partial<Letter>) =>
    fetch("/api/letters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => json<Letter>(r)),
  updateLetter: (id: number, data: Partial<Letter>) =>
    fetch(`/api/letters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => json<Letter>(r)),
  deleteLetter: (id: number) =>
    fetch(`/api/letters/${id}`, { method: "DELETE" }).then((r) =>
      json<{ ok: boolean }>(r)
    ),

  listLetterheads: () =>
    fetch("/api/letterheads").then((r) => json<Letterhead[]>(r)),
  createLetterhead: (data: Partial<Letterhead>) =>
    fetch("/api/letterheads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => json<Letterhead>(r)),
  updateLetterhead: (id: number, data: Partial<Letterhead>) =>
    fetch(`/api/letterheads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => json<Letterhead>(r)),
  deleteLetterhead: (id: number) =>
    fetch(`/api/letterheads/${id}`, { method: "DELETE" }).then((r) =>
      json<{ ok: boolean }>(r)
    ),
};
