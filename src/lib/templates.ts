import {
  LetterType,
  UndanganContent,
  LelayuContent,
  CustomContent,
  LetterContent,
  Letterhead,
} from "./types";

export const SALAM_ARAB_PEMBUKA = "السلام عليكم ورحمة الله وبركاته";
export const SALAM_ARAB_PENUTUP = "والسلام عليكم ورحمة الله وبركاته";

export function defaultUndangan(): UndanganContent {
  return {
    nomor: "003/RAGIL/VII/2026",
    lampiran: "-",
    perihal: "Undangan Musyawarah",
    kota: "Genito",
    tanggal: "4 Juli 2026",
    tujuan: "Kepada Yth. Bp/Sdr…………………",
    ditempat: "Di Tempat",
    salamPembuka: "Assalamu'alaikum warahmatullahi wabarakatuh,",
    paragrafPembuka:
      "Dalam rangka persiapan kegiatan lomba memperingati HUT Kemerdekaan RI ke-81, kami mengundang Bapak/Ibu/Saudara untuk hadir dalam musyawarah yang akan dilaksanakan pada:",
    acara: {
      hariTanggal: "Sabtu malam, 4 Juli 2026",
      waktu: "19.30 WIB – selesai",
      tempat: "Rumah Bapak Much Syaro",
    },
    agenda: [
      "Persiapan Lomba-lomba 17 Agustus",
      "Pembentukan Panitia",
      "Penentuan Anggaran dan Jadwal Kegiatan",
      "Lain-lain yang dianggap perlu",
    ],
    paragrafPenutup:
      "Demikian undangan ini kami sampaikan. Besar harapan kami Bapak/Ibu/Saudara berkenan hadir dan berpartisipasi demi kelancaran dan kesuksesan acara tersebut.",
    salamPenutup: "Wassalamu'alaikum warahmatullahi wabarakatuh.",
    labelOrganisasi: "Karang Taruna Remaja Genito Lor (RAGIL)",
    penandatangan: [
      { jabatan: "Ketua Karang Taruna", nama: "Muh Syaro" },
      { jabatan: "Sekretaris", nama: "Rizqi Ahmad Fauzan" },
    ],
  };
}

export function defaultLelayu(): LelayuContent {
  return {
    judul: "PAWARTOS LELAYU",
    alamat: "Genito Lor, Genito, Windusari, Magaleng",
    salamArab: SALAM_ARAB_PEMBUKA,
    innaLillahi: "INNA LILLAHI WAINNA ILAIHI ROJI'UN",
    kalimatSampun: "Sampun katimbalan wonten ngarso dalem Alloh SWT",
    nama: "Bapak Gandung Subarkah",
    yuswo: "68 Tahun",
    pidalemIng: "Genito Lor",
    dintenSuryo: "Jum'at legi, 29 Mei 2026",
    tabuh: "23:00 WIB",
    paragrafPermohonan:
      "Mbok bilih sugengipun Almarhum Hanggadahi kalepetan dumateng panjenengan sami, kula minangkani kaluargo nyuwunaken pangapunten ingkang agung. Ugi nyuwun do'a pamuji pinaringan pangapunten soho papan ingkang sahe.",
    paragrafPenutup:
      "Salajengipun borongwaladinipun pawartos puniko dhumateng sanak sederek.",
    salamPenutupArab: SALAM_ARAB_PENUTUP,
    labelKeluarga: "Ingkang nandang dhukito :",
    keluarga: [
      { nama: "Ibu Muslikah", hubungan: "Istri" },
      { nama: "Fajar Suharto", hubungan: "Anak" },
      { nama: "Damar Samiaji", hubungan: "Anak" },
      { nama: "Nadia Salsabila", hubungan: "Anak" },
      { nama: "Gatino", hubungan: "Adik" },
      { nama: "Sri Zuriah", hubungan: "Adik" },
    ],
  };
}

export function defaultCustom(): CustomContent {
  return {
    judul: "Judul Surat",
    body: "Tulis isi surat di sini.\n\nBaris baru akan dipertahankan pada hasil cetak.",
    labelOrganisasi: "",
    penandatangan: [
      { jabatan: "Ketua", nama: "" },
      { jabatan: "Sekretaris", nama: "" },
    ],
  };
}

export function defaultContent(type: LetterType): LetterContent {
  switch (type) {
    case "undangan":
      return defaultUndangan();
    case "lelayu":
      return defaultLelayu();
    case "custom":
      return defaultCustom();
  }
}

export function defaultTitle(type: LetterType): string {
  switch (type) {
    case "undangan":
      return "Surat Undangan Baru";
    case "lelayu":
      return "Pawartos Lelayu Baru";
    case "custom":
      return "Surat Baru";
  }
}

// Kop bawaan (contoh Karang Taruna RAGIL) untuk demo saat belum ada kop di DB.
export function defaultLetterhead(): Letterhead {
  return {
    id: 0,
    name: "Karang Taruna RAGIL",
    logo: null,
    line1: 'KARANG TARUNA "RAGIL"',
    line2: "REMAJA GENITO LOR",
    line3:
      "Jl. Lettu Soebandi, Dsn. Genito Lor, Ds. Genito, Kec. Windusari, Kab. Magelang, 56152",
  };
}

export const LETTER_TYPE_LABEL: Record<LetterType, string> = {
  undangan: "Surat Undangan",
  lelayu: "Pawartos Lelayu",
  custom: "Surat Bebas",
};
