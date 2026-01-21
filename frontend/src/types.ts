import React from "react";

// type untuk component Alerts
export type AlertsProps = {
  children: React.ReactNode;
  className?: string;
};

// type untuk component BuildingList
export type Fakultas = {
  id_fakultas: number;
  nama_fakultas: string;
};

// type untuk component BuildingList
export type Ruangan = {
  id_ruangan: number;
  nama_ruangan: string;
  kapasitas: number;
  gedung: string;
  lantai: number;
};

// type untuk component BuildingList
export type BuildingListProps = {
  building: Fakultas[];
  onFakultasChange: (fakultasName: string | null) => void;
};

// type untuk component Button
export type ButtonProps = {
  title: string;
  classname?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
};

// type untuk component Container
export type containerProps = {
  children?: React.ReactNode;
  className?: string;
};

// type untuk component DatePicker
export type DatePickerProps = {
  title: string;
  classname?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
};

// type untuk component Dropdown
export type DropdownProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

// type untuk component DropdownItem
export type DropdownItemProps = {
  children: React.ReactNode;
  callbackFn?: React.MouseEventHandler<HTMLElement>;
};

// type untuk component FasilitasCard
export type fasilitasProps = {
  className?: string;
  nama_fasilitas: string;
};

// type untuk component RoomCardAdmin
export type RuanganProps = {
  className?: string;
  nama_ruangan: string;
  kapasitas: number;
  gedung: string;
  id_ruangan: number;
};

// type untuk component Modal
export type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
};

// type untuk component Dialog
export type DialogProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  variant?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

// type untuk component Navbar
export type NavbarProps = {
  className?: string;
};

// type untuk component RoomCard
export type RoomCardProps = {
  id: number;
  img: string;
  tag: string;
  lokasi: string;
  lantai: number;
  antrianPinjaman: number;
};

export type RoomCardAdminProps = RuanganProps & {
  fasilitasList?: RuanganFasilitasType[];
  fasilitasLoading?: boolean;
};

// type untuk Data entitas RuanganFasilitas
export interface RuanganFasilitasType {
  id_ruangan: number;
  id_fasilitas: number;
  ruangan: {
    id_ruangan: number;
    nama_ruangan: string;
  };
  fasilitas: {
    id_fasilitas: number;
    nama_fasilitas: string;
  };
}

// type untuk component LeftSidebar
export type LeftSidebarProps = {
  children?: React.ReactNode;
  className?: string;
};

// type untuk component SidebarItem
export type SidebarItemProps = {
  children?: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
};

// type untuk fasilitasItem di RuangDanFasilitas
export type FasilitasItem = {
  id_fasilitas?: number;
  nama_fasilitas: string;
  [key: string]: unknown;
};

// type untuk component Notification
export type NotificationProps = {
  id: string;
  room: string;
  status: string;
  time: string;
  date: string;
  location: string;
  message?: string;
};

export type PeminjamanByRuanganProps = {
  id_ruangan: number;
  waktu_mulai: string;
  waktu_selesai: string;
  status_peminjaman: string;
  nama_peminjam: string;
};
