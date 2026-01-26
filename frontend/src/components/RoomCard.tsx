import { Link } from "react-router-dom";
import Button from "./Button";
import Tag from "./Tag";
import { fakultasAccentColor } from "../lib/data";
import type { RoomCardProps } from "../types";

function RoomCard(props: RoomCardProps) {
  const { id, img, tag, title, lokasi, lantai, antrianPinjaman } = props;
  const tagKey = tag.toLowerCase() as keyof typeof fakultasAccentColor;
  const colorhex = Object.prototype.hasOwnProperty.call(
    fakultasAccentColor,
    tagKey,
  )
    ? fakultasAccentColor[tagKey]
    : "#FEB21A";

  return (
    <div className="lg:basis-1/4 md:basis-1/2 basis-full">
      <div className="flex flex-col text-left lg:gap-5 md:gap-3 gap-2 bg-white p-4 rounded-lg shadow-md">
        <div className="relative">
          <img src={img} className="object-cover rounded-sm" />
          <Tag
            title={tag}
            classname={`absolute bottom-5 left-5 text-center lg:text-2xl md:text-xl text-sm`}
            style={{ backgroundColor: colorhex }}
          />
        </div>
        <div className="flex flex-col lg:text-2xl md:text-xl text-sm">
          <div className="font-bold text-xl md:text-2xl lg:text-4xl">
            {title}
          </div>
          <div className="border-b-3 border-gray-300 py-3 flex flex-row justify-between font-semibold">
            <span className="font-medium">Lokasi : </span>
            {lokasi}
          </div>
          <div className="border-b-3 border-gray-300 py-3 flex flex-row justify-between">
            <span className="font-medium">Lantai: </span>
            {lantai}
          </div>
          <div className="border-b-3 border-gray-300 py-3 flex flex-row justify-between">
            <span className="font-medium">Antrian Pinjaman: </span>
            {antrianPinjaman}
          </div>
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
