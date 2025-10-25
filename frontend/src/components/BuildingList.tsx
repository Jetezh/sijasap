import type React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


type Fakultas = {
  id_fakultas: number;
  nama_fakultas: string;
}

type BuildingListProps = {
  building: Fakultas[];
}

const BuildingList: React.FC<BuildingListProps> = ({ building }) => {
  return (
    <div className="pt-5">
        <select className="lg:px-10 lg:py-5 md:px-7 md:py-4 px-5 py-2 lg:text-2xl md:text-xl text-sm bg-white border-none shadow-md">
          <button>
            <selectedcontent></selectedcontent>
            <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span>
          </button>
          <option>Pilih Gedung</option>
          <hr />
          {
            building.map((fakultas) => {
              return <option key={fakultas.id_fakultas} value={fakultas.id_fakultas}><span>{fakultas.nama_fakultas}</span></option>
            })
          }
        </select>
    </div>
  )
}

export default BuildingList