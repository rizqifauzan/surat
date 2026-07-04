import { CustomContent, Letterhead } from "@/lib/types";
import LetterheadHeader from "./LetterheadHeader";

export default function Custom({
  content,
  letterhead,
}: {
  content: CustomContent;
  letterhead: Letterhead | null;
}) {
  return (
    <div className="font-serif text-black leading-snug text-[11pt]">
      {letterhead && <LetterheadHeader letterhead={letterhead} />}

      <div className="text-center font-bold text-[13pt] mt-4 underline">
        {content.judul}
      </div>

      <p className="mt-3 whitespace-pre-wrap text-justify">{content.body}</p>

      {(content.penandatangan[0].nama || content.penandatangan[1].nama) && (
        <div className="mt-6">
          {content.labelOrganisasi && (
            <div className="font-bold">{content.labelOrganisasi}</div>
          )}
          <div className="mt-2 flex justify-between px-4">
            {content.penandatangan.map((s, i) => (
              <div key={i} className="text-center">
                <div>{s.jabatan}</div>
                <div className="h-16" />
                <div className="font-bold underline">{s.nama}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
