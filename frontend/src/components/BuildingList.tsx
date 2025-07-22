import type React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type BuildingListProps = {
  building: string[];
}

const BuildingList: React.FC<BuildingListProps> = ({ building }) => {
  return (
    <div className="pt-5">
        <select className="px-10 py-5 text-2xl bg-white border-none shadow-md">
          <button>
            <selectedcontent></selectedcontent>
            <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span>
          </button>
          <option>Pilih Gedung</option>
          <hr />
          {
            building.map((b) => {
              return <option value={b}><span>{b}</span></option>
            })
          }
        </select>
    </div>
  )
}

export default BuildingList