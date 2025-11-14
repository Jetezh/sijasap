import { cn } from '../lib/utils';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import type { RuanganProps } from '../types';
import { useEffect, useState } from 'react';
import api from '../services/api';
import Tag from './Tag';
import type { RuanganFasilitasType } from '../types';

function RoomCardAdmin( props: RuanganProps) {
  const { 
    className,
    nama_ruangan,
    kapasitas,
    gedung,
    id_ruangan, } = props;
    
    const [ ruanganFasiltias, setRuanganFasilitas ] = useState<RuanganFasilitasType[]>([]);

    useEffect(() => {
      const fetchRuanganFasilitas = async () => {
        try {
          const response = await api.get(`/api/ruangan-fasilitas/${id_ruangan}`);
    
          if(response.data?.success && response.data?.ruanganFasilitas){
            setRuanganFasilitas(response.data.ruanganFasilitas);
          } else {
            throw new Error('Invalid response format');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
  
      fetchRuanganFasilitas();
    }, [id_ruangan])

  return (
    <div className={cn("flex flex-col bg-white p-10 rounded-md shadow-(--card-shadow) gap-10", className)}>
      <div className='flex flex-col gap-10'>
        <div className='text-left'>
          <h1 className='text-3xl font-bold'>{nama_ruangan}</h1>
          <h2>{}</h2>
        </div>
        <div className='flex flex-row gap-5 text-2xl font-medium text-gray-400'>
          <div className='flex flex-row gap-3 items-center'>
            <FontAwesomeIcon icon={faUserGroup} />
            <p>{kapasitas} Orang</p>
          </div>
          <div className='flex flex-row gap-3 items-center'>
            <FontAwesomeIcon icon={faLocationDot} />
            <p>Gedung {gedung}</p>
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='text-left text-2xl font-medium'>Fasilitas :</p>
          <div className='flex flex-row justify-start gap-3 flex-wrap'>
            {
              ruanganFasiltias.filter(item => item.id_ruangan === id_ruangan).map((item) => {
                  return <Tag title={item.fasilitas.nama_fasilitas} key={`${item.id_ruangan}-${item.id_fasilitas}`} classname='px-10 mt-3 text-xl bg-[var(--gray-color)]'/>
              })
            }
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-5 text-2xl'>
        <Button classname='py-5 flex-3/8 bg-(--button-gray) border-[#CBCBCB] border-2 text-black hover:text-white' title='Detail' />
        <Button classname='py-5 flex-3/8 bg-(--button-gray) border-[#CBCBCB] border-2 text-black hover:text-white' title='Edit' />
        <Button classname='py-5 flex-2/8' title='Booking' />
      </div>
    </div>
  )
}

export default RoomCardAdmin
