import { Link } from "react-router"
import Button from "./Button"
import Tag from "./Tag"

type RoomCardProps = {
  img: string,
  tag: string,
  lokasi: string,
  lantai: number,
  antrianPinjaman: number
}

function RoomCard(props: RoomCardProps) {
  return (
    <div className="px-2 py-2 lg:basis-1/4 md:basis-1/2 basis-full">
        <div className="flex flex-col text-left lg:gap-5 md:gap-3 gap-2 bg-white p-4 rounded-lg shadow-md">
            <img src={props.img} className="object-cover rounded-sm" />
            <Tag title={props.tag} classname="text-center lg:text-2xl md:text-xl text-sm" />
            <div className="flex flex-col lg:gap-3 md:gap-2 gap-1 lg:text-2xl md:text-xl text-sm">
              <p><span className="font-medium">Lokasi: </span>{props.lokasi}</p>
              <p><span className="font-medium">Lantai: </span>{props.lantai}</p>
              <p><span className="font-medium">Antrian Pinjaman: </span>{props.antrianPinjaman}</p>
            </div>
            <Link to={"/detail-ruangan"}>
              <Button title="View Details" classname="w-full lg:text-xl md:text-lg text-sm lg:py-5 md:py-3 py-2" />
            </Link>
        </div>
    </div>
  )
}

export default RoomCard