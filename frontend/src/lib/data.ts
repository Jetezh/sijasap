import { IoTvSharp } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";
import { MdOutlineChair, MdTableRestaurant } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { BsProjector } from "react-icons/bs";
import { PiChalkboardSimple } from "react-icons/pi";
import {
  faHouse,
  faUser,
  faCalendarDays,
  faFile,
  faPersonShelter,
} from "@fortawesome/free-solid-svg-icons";

// Data component FasilitasCard
export const icons = [
  { id: "tv led android", icon: IoTvSharp },
  { id: "wifi", icon: FaWifi },
  { id: "Kursi", icon: MdOutlineChair },
  { id: "meja", icon: MdTableRestaurant },
  { id: "komputer", icon: FaComputer },
  { id: "proyektor", icon: BsProjector },
  { id: "papan tulis", icon: PiChalkboardSimple },
];

// Data component Footer
export const sosmed = [
  {
    id: "facebook",
    url: "https://facebook.com/infoupnjakarta",
    color: "text-blue-400",
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fupnveteranjakarta%2F&is_from_rle",
    color: "text-fuchsia-500",
  },
  { id: "x", url: "https://twitter.com/upnjakarta", color: "text-indigo-400" },
  {
    id: "email",
    url: "https://plus.google.com/113815727990773900734",
    color: "text-gray-400",
  },
  {
    id: "youtube",
    url: "https://www.youtube.com/channel/UCMw_GH6YVHMSHKcSA2WJjhw/videos",
    color: "text-red-400",
  },
  {
    id: "tiktok",
    url: "https://www.tiktok.com/@upnveteranjakarta",
    color: "text-amber-200",
  },
];

// Data component sideBarItems
export const sidebarItems = [
  { name: "Home", icon: faHouse, path: "home" },
  { name: "Profile", icon: faUser, path: "profile" },
  {
    name: "Kalender Akademik",
    icon: faCalendarDays,
    path: "kalender-akademik",
  },
  { name: "Laporan", icon: faFile, path: "laporan" },
  { name: "Ruang & Fasilitas", icon: faPersonShelter, path: "ruang-fasilitas" },
];

// Data fakultas Accent color
export const fakultasAccentColor = {
  hukum: "#C62828", // Merah
  kedokteran: "#2E7D32", // Hijau Tua
  teknik: "#154360", // Biru Dongker
  "ekonomi dan bisnis": "#616161", // Abu-abu
  "ilmu sosial dan ilmu politik": "#039BE5", // Biru Digital
  "ilmu komputer": "#EF6C00", // Oranye
  kesehatan: "#009688", // Teal
};

// Data Status Peminjaman Accent Color
export const statusPeminjamanAccentColor = {
  diterima: "#2E7D32",
  diproses: "#F9A825",
  ditolak: "#C62828",
  selesai: "#1565C0",
  dibatalkan: "#616161",
};
