import cn from 'clsx';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faLocationDot } from '@fortawesome/free-solid-svg-icons';

type RuanganProps = {
  className?: string;
  nama_ruangan: string;
}

function RoomCardAdmin( props: RuanganProps) {
  return (
    <div className={cn("flex flex-col bg-white p-6 rounded-md shadow-(--card-shadow) gap-5", props.className)}>
      <div className='flex flex-col gap-3'>
        <div className='text-left'>
          <h1 className='text-3xl font-bold'>{props.nama_ruangan}</h1>
          <h2>{}</h2>
        </div>
        <div className='flex flex-row gap-5 text-2xl font-medium'>
          <div className='flex flex-row gap-3 items-center'>
            <FontAwesomeIcon icon={faUserGroup} />
            <p>{} Orang</p>
          </div>
          <div className='flex flex-row gap-3 items-center'>
            <FontAwesomeIcon icon={faLocationDot} />
            <p>Gedung {}</p>
          </div>
        </div>
        <div className='flex '>
          <p className='text-left'>Fasilitas</p>
          {

          }
        </div>
      </div>
      <div className='flex flex-row gap-5 text-2xl'>
        <Button classname='py-5 flex-3/8' title='Detail' />
        <Button classname='py-5 flex-3/8' title='Edit' />
        <Button classname='py-5 flex-2/8' title='Booking' />
      </div>
    </div>
  )
}

export default RoomCardAdmin