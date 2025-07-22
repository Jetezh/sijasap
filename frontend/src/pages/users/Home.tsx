import React from 'react';
import assets from '../../assets/assets';
import Caraousal from '../../components/Caraousal';
import BuildingList from '../../components/BuildingList';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import Button from '../../components/Button';

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

  return (
    <div className="w-full h-full mx-auto bg-gray-100">
      <Caraousal slides={slides} />
      <BuildingList building={buildingList} />
      <div className='py-5 px-10'>
        <form className='flex flex-row gap-5 text-2xl'>
          <DatePicker title='Tanggal Awal' />
          <DatePicker title='Tanggal Akhir' />
          <TimePicker title='Waktu Mulai' />
          <TimePicker title='Waktu Akhir' />
          <Button />
        </form>
      </div>
      <div className='gap-5'>
        <span className='text-2xl font-medium'>Informasi Ruangan</span>
      </div>
    </div>
  );
};

export default Home; 