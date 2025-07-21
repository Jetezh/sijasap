import React from 'react';
import assets from '../../assets/assets';
import Caraousal from '../../components/Caraousal';
import BuildingList from '../../components/BuildingList';

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
    </div>
  );
};

export default Home; 