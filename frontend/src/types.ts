
import React from 'react'

// type untuk component Alerts
export type AlertsProps = {
    children: React.ReactNode, 
    className?: string
}

// type untuk component BuildingList
type Fakultas = {
  id_fakultas: number;
  nama_fakultas: string;
}

export type BuildingListProps = {
  building: Fakultas[];
}

// type untuk component Button
export type ButtonProps = { 
    title: string, 
    classname?: string 
}

// type untuk component Container
export type containerProps = {
  children?: React.ReactNode;
  className?: string;
}

// type untuk component DatePicker
export type DatePickerProps = { 
    title: string, 
    classname?: string 
}

// type untuk component Dropdown
export type DropdownProps = {
    children : React.ReactNode,
    trigger: React.ReactNode
}

// type untuk component DropdownItem
export type DropdownItemProps = {
    children: React.ReactNode, 
    callbackFn?: React.MouseEventHandler<HTMLElement> 
}

// type untuk component FasilitasCard
export type fasilitasProps = {
    className?: string;
    nama_fasilitas: string;
}

// type untuk component RoomCardAdmin 
export type RuanganProps = {
  className?: string;
  nama_ruangan: string;
  kapasitas: number;
  gedung: string;
  id_ruangan: number;
}

// type untuk component Modal
export type ModalProps = {
  isOpen: boolean;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

// type untuk component Navbar
export type NavbarProps = {
  className?: string
}

// type untuk component RoomCard
export type RoomCardProps = {
  img: string,
  tag: string,
  lokasi: string,
  lantai: number,
  antrianPinjaman: number
}

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