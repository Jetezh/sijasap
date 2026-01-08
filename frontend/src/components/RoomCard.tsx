import { Link } from "react-router-dom";
import Button from "./Button";
import Tag from "./Tag";
import type { RoomCardProps } from "../types";

function RoomCard(props: RoomCardProps) {
  const { id, img, tag, lokasi, lantai, antrianPinjaman } = props;

  return (
    <div className="px-2 py-2 lg:basis-1/4 md:basis-1/2 basis-full">
      <div className="flex flex-col text-left lg:gap-5 md:gap-3 gap-2 bg-white p-4 rounded-lg shadow-md">
        <img src={img} className="object-cover rounded-sm" />
        <Tag
          title={tag}
          classname="text-center lg:text-2xl md:text-xl text-sm"
        />
        <div className="flex flex-col lg:gap-3 md:gap-2 gap-1 lg:text-2xl md:text-xl text-sm">
          <p>
            <span className="font-medium">Lokasi: </span>
            {lokasi}
          </p>
          <p>
            <span className="font-medium">Lantai: </span>
            {lantai}
          </p>
          <p>
            <span className="font-medium">Antrian Pinjaman: </span>
            {antrianPinjaman}
          </p>
        </div>
        <Link to={`/detail-ruangan/${id}`}>
          <Button
            title="View Details"
            classname="w-full lg:text-2xl md:text-xl text-sm lg:py-5 md:py-3 py-2"
          />
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;
