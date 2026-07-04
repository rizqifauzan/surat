import { Letterhead } from "@/lib/types";

export default function LetterheadHeader({
  letterhead,
}: {
  letterhead: Letterhead;
}) {
  return (
    <div className="border-b-4 border-double border-black pb-1">
      <div className="flex items-center gap-3">
        {letterhead.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={letterhead.logo}
            alt="logo"
            className="h-16 w-16 object-contain shrink-0"
          />
        ) : (
          <div className="h-16 w-16 shrink-0" />
        )}
        <div className="flex-1 text-center">
          <div className="font-bold text-[15pt] leading-tight">
            {letterhead.line1}
          </div>
          {letterhead.line2 && (
            <div className="font-bold text-[11pt] leading-tight">
              {letterhead.line2}
            </div>
          )}
        </div>
        <div className="h-16 w-16 shrink-0" />
      </div>
      {letterhead.line3 && (
        <div className="text-center text-[7.5pt] italic mt-1 border-t border-black pt-0.5">
          {letterhead.line3}
        </div>
      )}
    </div>
  );
}
