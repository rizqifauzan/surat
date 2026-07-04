export type LetterType = "undangan" | "lelayu" | "custom";
export type Paper = "A4" | "F4";
export type CopiesPerPage = 1 | 2 | 3;

export interface Signer {
  jabatan: string;
  nama: string;
}

export interface AcaraDetail {
  hariTanggal: string;
  waktu: string;
  tempat: string;
}

export interface UndanganContent {
  nomor: string;
  lampiran: string;
  perihal: string;
  kota: string;
  tanggal: string;
  tujuan: string; // "Kepada Yth. Bp/Sdr..."
  ditempat: string;
  salamPembuka: string;
  paragrafPembuka: string;
  acara: AcaraDetail;
  agenda: string[];
  paragrafPenutup: string;
  salamPenutup: string;
  labelOrganisasi: string;
  penandatangan: [Signer, Signer];
}

export interface KeluargaRow {
  nama: string;
  hubungan: string;
}

export interface LelayuContent {
  judul: string;
  alamat: string;
  salamArab: string;
  innaLillahi: string;
  kalimatSampun: string;
  nama: string;
  yuswo: string;
  pidalemIng: string;
  dintenSuryo: string;
  tabuh: string;
  paragrafPermohonan: string;
  paragrafPenutup: string;
  salamPenutupArab: string;
  labelKeluarga: string;
  keluarga: KeluargaRow[];
}

export interface CustomContent {
  judul: string;
  body: string; // teks, baris baru dipertahankan
  labelOrganisasi: string;
  penandatangan: [Signer, Signer];
}

export type LetterContent = UndanganContent | LelayuContent | CustomContent;

export interface Letterhead {
  id: number;
  name: string;
  logo: string | null;
  line1: string;
  line2: string;
  line3: string;
  createdAt?: string;
}

export interface Letter {
  id: number;
  title: string;
  type: LetterType;
  letterheadId: number | null;
  content: LetterContent;
  copiesPerPage: CopiesPerPage;
  paper: Paper;
  createdAt?: string;
  updatedAt?: string;
}
