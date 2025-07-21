import type React from "react";

type BuildingListProps = {
  building: string[];
}

const BuildingList: React.FC<BuildingListProps> = ({ building }) => {
  return (
    <div className="">
        <select>
          {
            building.map((b) => {
              return <option>{b}</option>
            })
          }
        </select>
    </div>
  )
}

export default BuildingList