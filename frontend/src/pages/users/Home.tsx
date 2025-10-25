import React, { useContext, useEffect, useState } from 'react';
import assets from '../../assets/assets';
import Caraousal from '../../components/Caraousal';
import BuildingList from '../../components/BuildingList';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import Button from '../../components/Button';
import RoomCard from '../../components/RoomCard';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const Home: React.FC = () => {

  const authContext = useContext(AuthContext);

  if(!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  type Fakultas = {
    id_fakultas: number;
    nama_fakultas: string;
  }

  const [ fakultas, setFakultas ] = useState<Fakultas[]>([]);

  const slides = [
    {
      img: assets.gedungFEB,
      alt: 'gedung-feb',
    },
    {
      img: assets.gedungFH,
      alt: 'gedung-fh',
    },
    {
      img: assets.gedungFIK,
      alt: 'gedung-fik',
    },
    {
      img: assets.gedungFIKES,
      alt: 'gedung-fikes',
    },
    {
      img: assets.gedungFISIP,
      alt: 'gedung-fisip',
    },
    {
      img: assets.gedungFK,
      alt: 'gedung-fk',
    },
    {
      img: assets.gedungFT,
      alt: 'gedung-ft',
    }
  ]

  type slides = {
    img: string,
    alt: string
  }


  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchFakultas = async () => {
      try {
        const response = await api.get('/api/fakultas');
    
        if(response.data?.success && response.data?.fakultas) {
          setFakultas(response.data.fakultas);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    } 

    fetchFakultas();
  }, [isAuthenticated])

  const rooms = [
    {
      img: assets.fiklab301,
      tag: 'Fakultas Ilmu Komputer',
      lokasi: 'Gedung dewi sartika 2',
      lantai: 3,
      antrianPinjaman: 48,
    },
    {
      img: assets.fiklab301,
      tag: 'Fakultas Ilmu Komputer',
      lokasi: 'Gedung dewi sartika 2',
      lantai: 3,
      antrianPinjaman: 48,
    },
    {
      img: assets.fiklab301,
      tag: 'Fakultas Ilmu Komputer',
      lokasi: 'Gedung dewi sartika 2',
      lantai: 3,
      antrianPinjaman: 48,
    },
    {
      img: assets.fiklab301,
      tag: 'Fakultas Ilmu Komputer',
      lokasi: 'Gedung dewi sartika 2',
      lantai: 3,
      antrianPinjaman: 48,
    },
  ]

  return (
    <div className="w-full h-full mx-auto bg-gray-100">
      <Caraousal slides={slides} />
      <BuildingList building={fakultas} />
      <div className='lg:py-10 md:py-7 py-5'>
        <form className='flex flex-row flex-wrap justify-between lg:text-2xl md:text-xl text-sm font-medium lg:px-10 md:px-7 px-5'>
          <DatePicker title='Tanggal Awal' classname='lg:basis-3/14 md:basis-1/2 basis-full' />
          <DatePicker title='Tanggal Akhir' classname='lg:basis-3/14 md:basis-1/2 basis-full' />
          <TimePicker title='Waktu Mulai' classname='lg:basis-2/14 md:basis-1/3 basis-1/2' />
          <TimePicker title='Waktu Akhir' classname='lg:basis-2/14 md:basis-1/3 basis-1/2' />
          <Button title='Check' classname='lg:basis-3/14 text-base md:basis-1/3 basis-full lg:h-34 md:h-25 md:mt-4 lg:mt-0 mt-2 lg:mx-0 md:mx-0 mx-1 py-4' />
        </form>
      </div>
      <div className='lg:mt-15 md:mt-10 mt-5 lg:px-9 md:px-6 px-5 flex flex-col gap-10'>
        <span className='text-3xl font-medium'>Informasi Ruangan</span>
        <div className='flex flex-row flex-wrap justify-between'>
          {
            rooms.map((s, i) => {
              return <RoomCard {...s} key={"room" + i} />
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Home; 