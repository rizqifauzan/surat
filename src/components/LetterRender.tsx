import { Letter, Letterhead } from "@/lib/types";
import Undangan from "./templates/Undangan";
import Lelayu from "./templates/Lelayu";
import Custom from "./templates/Custom";

// Merender satu surat (satu kolom) sesuai tipenya.
export default function LetterRender({
  letter,
  letterhead,
}: {
  letter: Letter;
  letterhead: Letterhead | null;
}) {
  switch (letter.type) {
    case "undangan":
      return (
        <Undangan
          content={letter.content as any}
          letterhead={letterhead}
        />
      );
    case "lelayu":
      return <Lelayu content={letter.content as any} />;
    case "custom":
      return (
        <Custom content={letter.content as any} letterhead={letterhead} />
      );
    default:
      return null;
  }
}
