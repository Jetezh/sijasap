import { cn } from '../lib/utils';
import { FaTools } from "react-icons/fa";
import { icons } from '../lib/data';
import type { fasilitasProps } from '../types';

function FasilitasCard(props: fasilitasProps) {

  const { className, nama_fasilitas } = props;

  const MatchedIcon = icons.find(item => {
    return nama_fasilitas.toLowerCase() === item.id.toLowerCase()
  })
  
  return (
    <div className={cn("flex flex-row items-center gap-5 bg-white p-6 rounded-md shadow-(--card-shadow)", className)}>
        { MatchedIcon ? <MatchedIcon.icon className='w-10 h-10' /> : <FaTools className='w-10 h-10' / > }
        <p className='lg:text-2xl font-medium text-left'>{nama_fasilitas}</p>
    </div>
  )
}

export default FasilitasCard