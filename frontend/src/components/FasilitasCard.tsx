import cn from 'clsx';
import { IoTvSharp } from "react-icons/io5";
import { FaWifi, FaTools } from "react-icons/fa";
import { MdOutlineChair, MdTableRestaurant } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { BsProjector } from "react-icons/bs";
import { PiChalkboardSimple } from "react-icons/pi";

const icons = [
  {id: "tv led android", icon: IoTvSharp},
  {id: "wifi", icon: FaWifi},
  {id: "Kursi", icon: MdOutlineChair},
  {id: "meja", icon: MdTableRestaurant},
  {id: "komputer", icon: FaComputer},
  {id: "proyektor", icon: BsProjector},
  {id: "papan tulis", icon: PiChalkboardSimple},
]

type fasilitasProps = {
    className?: string;
    nama_fasilitas: string;
}

function FasilitasCard(props: fasilitasProps) {

  const MatchedIcon = icons.find(item => {
    return props.nama_fasilitas.toLowerCase() === item.id.toLowerCase()
  })
  
  return (
    <div className={cn("flex flex-row items-center gap-5 bg-white p-6 rounded-md shadow-(--card-shadow)", props.className)}>
        { MatchedIcon ? <MatchedIcon.icon className='w-10 h-10' /> : <FaTools className='w-10 h-10' / > }
        <p className='lg:text-2xl font-medium text-left'>{props.nama_fasilitas}</p>
    </div>
  )
}

export default FasilitasCard