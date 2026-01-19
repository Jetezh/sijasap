import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import type { BuildingListProps } from "../types";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItems";

const BuildingList: React.FC<BuildingListProps> = ({
  building,
  onFakultasChange,
}) => {
  const [selectedFakultas, setSelectedFakultas] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const handleSelectFakultas = (fakultasName: string | null) => {
    setSelectedFakultas(fakultasName);
    onFakultasChange(fakultasName);
    setShow(false);
  };

  const trigger = (
    <button className="lg:px-10 lg:py-5 md:px-7 md:py-4 px-5 py-2 lg:text-2xl md:text-xl text-sm bg-white border-none shadow-md flex items-center justify-between w-full">
      <span>{selectedFakultas || "Pilih Fakultas"}</span>
      <span className="arrow">
        <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
      </span>
    </button>
  );

  return (
    <div className="w-full flex justify-center">
      <Dropdown trigger={trigger} show={show} setShow={setShow}>
        <DropdownItem callbackFn={() => handleSelectFakultas(null)}>
          Semua Fakultas
        </DropdownItem>
        {building.map((fakultas) => (
          <DropdownItem
            key={fakultas.id_fakultas}
            callbackFn={() => handleSelectFakultas(fakultas.nama_fakultas)}
          >
            {fakultas.nama_fakultas}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};

export default BuildingList;
