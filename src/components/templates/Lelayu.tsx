import { LelayuContent } from "@/lib/types";

export default function Lelayu({ content }: { content: LelayuContent }) {
  return (
    <div className="font-serif text-black leading-snug text-[10.5pt]">
      {/* Judul */}
      <div className="text-center">
        <div className="font-bold text-[16pt]">{content.judul}</div>
        <div className="text-[11pt]">{content.alamat}</div>
        <div className="border-b border-black mt-1" />
      </div>

      {/* Katur Dumateng / Ing */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-28 shrink-0">Katur Dumateng :</span>
          <span className="flex-1 border border-black rounded h-7" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-28 shrink-0 text-right pr-1">Ing :</span>
          <span className="flex-1 border border-black rounded h-7" />
        </div>
      </div>

      {/* Salam arab */}
      <div className="text-center mt-3 font-bold text-[12pt]" dir="rtl">
        {content.salamArab}
      </div>

      <div className="text-center font-bold mt-2">{content.innaLillahi}</div>
      <div className="text-center">{content.kalimatSampun}</div>
      <div className="text-center font-bold text-[14pt] mt-1">
        {content.nama}
      </div>

      {/* Detail */}
      <table className="mt-1">
        <tbody>
          <tr>
            <td className="pr-2 align-top w-24">Yuswo</td>
            <td className="pr-2 align-top">:</td>
            <td>{content.yuswo}</td>
          </tr>
          <tr>
            <td className="pr-2 align-top">Pidalem ing</td>
            <td className="pr-2 align-top">:</td>
            <td>{content.pidalemIng}</td>
          </tr>
          <tr>
            <td className="pr-2 align-top">Dinten, Suryo</td>
            <td className="pr-2 align-top">:</td>
            <td>{content.dintenSuryo}</td>
          </tr>
          <tr>
            <td className="pr-2 align-top">Tabuh</td>
            <td className="pr-2 align-top">:</td>
            <td>{content.tabuh}</td>
          </tr>
        </tbody>
      </table>

      <p className="mt-2 text-center indent-6 text-justify">
        {content.paragrafPermohonan}
      </p>
      <p className="mt-1 indent-6 text-justify">{content.paragrafPenutup}</p>

      <div className="text-center mt-2 font-bold text-[11pt]" dir="rtl">
        {content.salamPenutupArab}
      </div>

      <div className="font-bold mt-2">{content.labelKeluarga}</div>

      {/* Tabel keluarga */}
      <table className="mt-2 w-full border-collapse">
        <tbody>
          {content.keluarga.map((row, i) => (
            <tr key={i}>
              <td className="border border-black text-center font-bold py-0.5 px-2">
                {row.nama}
              </td>
              <td className="border border-black text-center font-bold py-0.5 px-2 w-24">
                {row.hubungan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
