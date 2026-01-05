import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import assets from "../../assets/assets";
import Caraousal from "../../components/Caraousal";
import BuildingList from "../../components/BuildingList";
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";
import Button from "../../components/Button";
import RoomCard from "../../components/RoomCard";
import Pagination from "../../components/Pagination";
import type { Fakultas, Ruangan } from "../../types";

import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  const [fakultas, setFakultas] = useState<Fakultas[]>([]);
  const [ruangan, setRuangan] = useState<Ruangan[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const slides = [
    {
      img: assets.gedungFEB,
      alt: "gedung-feb",
    },
    {
      img: assets.gedungFH,
      alt: "gedung-fh",
    },
    {
      img: assets.gedungFIK,
      alt: "gedung-fik",
    },
    {
      img: assets.gedungFIKES,
      alt: "gedung-fikes",
    },
    {
      img: assets.gedungFISIP,
      alt: "gedung-fisip",
    },
    {
      img: assets.gedungFK,
      alt: "gedung-fk",
    },
    {
      img: assets.gedungFT,
      alt: "gedung-ft",
    },
  ];

  type slides = {
    img: string;
    alt: string;
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchFakultas = async () => {
      try {
        const response = await api.get("/api/fakultas");

        if (response.data?.success && response.data?.fakultas) {
          setFakultas(response.data.fakultas);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching fakultas data:", err);
      }
    };

    fetchFakultas();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchRuangan = async () => {
      try {
        const response = await api.get("/api/ruangan");

        if (response.data?.success && response.data?.ruangan) {
          setRuangan(response.data.ruangan);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching ruangan data:", err);
      }
    };

    fetchRuangan();
  }, [isAuthenticated]);

  const placeholderImg = assets.fiklab301;
  const mobileBatchSize = 6;
  const isLg = viewportWidth >= 1024;
  const isMobile = !isLg;
  const pageSize = isLg ? 8 : mobileBatchSize;

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setVisibleCount(Math.min(mobileBatchSize, ruangan.length));
      return;
    }
    setCurrentPage(1);
  }, [isMobile, mobileBatchSize, ruangan.length]);

  useEffect(() => {
    if (!isMobile) return;
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setVisibleCount((prev) =>
          Math.min(prev + mobileBatchSize, ruangan.length),
        );
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isMobile, mobileBatchSize, ruangan.length]);

  const paginatedRooms = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return ruangan.slice(start, end);
  }, [ruangan, currentPage, pageSize]);

  const mobileRooms = useMemo(() => {
    return ruangan.slice(0, visibleCount);
  }, [ruangan, visibleCount]);

  return (
    <div className="w-full h-full mx-auto bg-gray-100">
      <Caraousal slides={slides} />
      <BuildingList building={fakultas} />
      <div className="lg:py-10 md:py-7 py-5">
        <form className="flex flex-row flex-wrap justify-between lg:text-2xl md:text-xl text-sm font-medium lg:px-10 md:px-7 px-5">
          <DatePicker
            title="Tanggal Awal"
            classname="lg:basis-3/14 md:basis-1/2 basis-full"
          />
          <DatePicker
            title="Tanggal Akhir"
            classname="lg:basis-3/14 md:basis-1/2 basis-full"
          />
          <TimePicker
            title="Waktu Mulai"
            classname="lg:basis-2/14 md:basis-1/3 basis-1/2"
          />
          <TimePicker
            title="Waktu Akhir"
            classname="lg:basis-2/14 md:basis-1/3 basis-1/2"
          />
          <Button
            title="Check"
            classname="lg:basis-3/14 md:basis-1/3 basis-full lg:text-3xl md:text-2xl text-xl lg:h-34 md:h-25 md:mt-4 lg:mt-0 mt-2 lg:mx-0 md:mx-0 mx-1 py-4"
          />
        </form>
      </div>
      <div className="lg:mt-15 md:mt-10 mt-5 lg:px-9 md:px-6 px-5 flex flex-col gap-10">
        <span className="text-3xl font-medium">Informasi Ruangan</span>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {(isMobile ? mobileRooms : paginatedRooms).map((item) => {
            return (
              <RoomCard
                img={placeholderImg}
                tag={item.nama_ruangan}
                lokasi={`Gedung ${item.gedung}`}
                lantai={0}
                antrianPinjaman={0}
                key={`room-${item.id_ruangan}`}
              />
            );
          })}
        </div>
        {isLg && ruangan.length > pageSize && (
          <Pagination
            totalItems={ruangan.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
        {isMobile && visibleCount < ruangan.length && (
          <div ref={loadMoreRef} className="h-6" />
        )}
      </div>
    </div>
  );
};

export default Home;
