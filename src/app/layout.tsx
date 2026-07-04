import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generator Surat",
  description: "Buat surat undangan & pawartos lelayu, simpan, dan cetak PDF.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
