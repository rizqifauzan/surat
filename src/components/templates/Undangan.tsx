import { UndanganContent, Letterhead } from "@/lib/types";
import LetterheadHeader from "./LetterheadHeader";

export default function Undangan({
  content,
  letterhead,
}: {
  content: UndanganContent;
  letterhead: Letterhead | null;
}) {
  return (
    <div className="font-serif text-black leading-snug">
      {letterhead && <LetterheadHeader letterhead={letterhead} />}

      {/* Nomor / Lampiran / Perihal + tanggal */}
      <div className="mt-4 flex justify-between text-[11pt]">
        <table>
          <tbody>
            <tr>
              <td className="pr-2 align-top underline">Nomor</td>
              <td className="pr-2 align-top">:</td>
              <td className="align-top">{content.nomor}</td>
            </tr>
            <tr>
              <td className="pr-2 align-top underline">Lamp.</td>
              <td className="pr-2 align-top">:</td>
              <td className="align-top">{content.lampiran}</td>
            </tr>
            <tr>
              <td className="pr-2 align-top underline">Perihal</td>
              <td className="pr-2 align-top">:</td>
              <td className="align-top underline">{content.perihal}</td>
            </tr>
          </tbody>
        </table>
        <div className="align-top">
          {content.kota}, {content.tanggal}
        </div>
      </div>

      {/* Tujuan */}
      <div className="mt-4 text-[11pt]">
        <div>{content.tujuan}</div>
        <div>{content.ditempat}</div>
      </div>

      <div className="mt-3 font-bold text-[11pt] underline">
        {content.salamPembuka}
      </div>

      <p className="mt-2 text-[11pt] text-justify indent-8">
        {content.paragrafPembuka}
      </p>

      {/* Detail acara */}
      <div className="mt-3 ml-8 text-[11pt] space-y-1">
        <div>
          🗓️ <span className="font-bold">Hari/Tanggal</span>:{" "}
          {content.acara.hariTanggal}
        </div>
        <div>
          🕐 <span className="font-bold">Waktu</span>: {content.acara.waktu}
        </div>
        <div>
          📍 <span className="font-bold">Tempat</span>: {content.acara.tempat}
        </div>
      </div>

      {/* Agenda */}
      {content.agenda.length > 0 && (
        <div className="mt-3 text-[11pt]">
          <div className="font-bold">Agenda:</div>
          <ol className="list-decimal ml-10">
            {content.agenda.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ol>
        </div>
      )}

      <p className="mt-3 text-[11pt] text-justify indent-8">
        {content.paragrafPenutup}
      </p>

      <div className="mt-3 font-bold text-[11pt] underline">
        {content.salamPenutup}
      </div>

      {/* Tanda tangan */}
      <div className="mt-4 text-[11pt]">
        <div>Hormat kami,</div>
        <div className="font-bold">{content.labelOrganisasi}</div>
        <div className="mt-2 flex justify-between px-4">
          {content.penandatangan.map((s, i) => (
            <div key={i} className="text-center">
              <div className="underline">{s.jabatan}</div>
              <div className="h-16" />
              <div className="font-bold underline">{s.nama}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
