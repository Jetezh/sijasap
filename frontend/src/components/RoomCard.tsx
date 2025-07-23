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
    <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col text-left gap-5">
            <img src={props.img} className="w-80 h-50 object-cover" />
            <Tag title={props.tag} classname="text-center" />
            <div className="flex flex-col gap-3 text-2xl">
              <p><span className="font-medium">Lokasi: </span>{props.lokasi}</p>
              <p><span className="font-medium">Lantai: </span>{props.lantai}</p>
              <p><span className="font-medium">Antrian Pinjaman: </span>{props.antrianPinjaman}</p>
            </div>
            <Button title="View Details" classname="w-full" />
        </div>
    </div>
  )
}

export default RoomCard