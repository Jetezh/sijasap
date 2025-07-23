import React from 'react';
import assets from '../../assets/assets';
import Caraousal from '../../components/Caraousal';
import BuildingList from '../../components/BuildingList';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import Button from '../../components/Button';
import RoomCard from '../../components/RoomCard';

const Home: React.FC = () => {
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

  const buildingList = [
    "Fakultas Ilmu Komputer",
    "Fakultas Ekonomi dan Bisni",
    "Fakultas Kedokteran",
    "Fakultas Hukum",
    "Fakultas Ilmu Kesehatan",
    "Fakultas Teknik",
    "Fakultas Ilmu Sosial dan Ilmu Politik"
  ]

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
      <BuildingList building={buildingList} />
      <div className='py-5'>
        <form className='flex flex-row flex-wrap gap-5 text-2xl font-medium px-10'>
          <DatePicker title='Tanggal Awal' />
          <DatePicker title='Tanggal Akhir' />
          <TimePicker title='Waktu Mulai' />
          <TimePicker title='Waktu Akhir' />
          <Button title='Check' />
        </form>
      </div>
      <div className='mt-15 px-10 flex flex-col gap-10'>
        <span className='text-3xl font-medium'>Informasi Ruangan</span>
        <div className='flex flex-row flex-wrap gap-5 justify-between'>
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