import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import assets from "../../assets/assets";
import Caraousal from "../../components/Caraousal";
import BuildingList from "../../components/BuildingList";
import ReactDatePicker from "../../components/ReactDatePicker";
import WibTimePicker from "../../components/WibTimePicker";
import Button from "../../components/Button";
import Container from "../../components/Container";
import RoomCard from "../../components/RoomCard";
import Pagination from "../../components/Pagination";
import type { Fakultas, Ruangan } from "../../types";
import {
  SERVICE_TIME,
  formatWibDate,
  getWibNow,
  minutesToTimeString,
  roundUpMinutes,
  timeToMinutes,
} from "../../lib/time";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated, user } = authContext;

  const [fakultas, setFakultas] = useState<Fakultas[]>([]);
  const [ruangan, setRuangan] = useState<Ruangan[]>([]);
  const [selectedFakultas, setSelectedFakultas] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(0);
  const [filterTimes, setFilterTimes] = useState({
    waktu_mulai: "",
    waktu_selesai: "",
  });
  const [filterMessage, setFilterMessage] = useState<string | null>(null);
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

  const handleFilterCheck = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (!startDate || !filterTimes.waktu_mulai || !filterTimes.waktu_selesai) {
      alert("Tolong pilih tanggal dan waktu mulai dan selesai");
      setFilterMessage(null);

      return;
    }

    const startDateTime = new Date(`${startDate}T${filterTimes.waktu_mulai}`);
    const endDateTime = new Date(`${startDate}T${filterTimes.waktu_selesai}`);
    const waktuMulaiMinutes = timeToMinutes(filterTimes.waktu_mulai);
    const waktuSelesaiMinutes = timeToMinutes(filterTimes.waktu_selesai);
    const minTimeMinutes = timeToMinutes(minTime);
    const maxStartMinutes = timeToMinutes(maxStartTime);
    const maxEndMinutes = timeToMinutes(maxEndTime);

    if (
      waktuMulaiMinutes === null ||
      waktuSelesaiMinutes === null ||
      minTimeMinutes === null ||
      maxStartMinutes === null ||
      maxEndMinutes === null
    ) {
      alert("Format waktu tidak valid.");
      setFilterMessage(null);
      return;
    }

    if (
      waktuMulaiMinutes < minTimeMinutes ||
      waktuMulaiMinutes > maxStartMinutes
    ) {
      alert(`Waktu mulai harus antara ${minTime} sampai ${maxStartTime} WIB.`);
      setFilterMessage(null);
      return;
    }

    if (waktuSelesaiMinutes > maxEndMinutes) {
      alert(`Waktu selesai harus antara ${minTime} sampai ${maxEndTime} WIB.`);
      setFilterMessage(null);
      return;
    }

    if (waktuSelesaiMinutes - waktuMulaiMinutes < minDurationMinutes) {
      alert(`Durasi peminjaman minimal ${minDurationMinutes} menit.`);
      setFilterMessage(null);
      return;
    }

    if (startDate === todayWib && waktuMulaiMinutes < roundedNowMinutes) {
      alert("Waktu mulai tidak boleh di waktu yang sudah lewat.");
      setFilterMessage(null);
      return;
    }

    const selectedFakultasObj = fakultas.find(
      (f) => f.nama_fakultas === selectedFakultas,
    );

    try {
      const response = await api.get("/api/ruangan-tersedia", {
        params: {
          waktu_mulai: startDateTime.toISOString(),
          waktu_selesai: endDateTime.toISOString(),
          fakultas_id: selectedFakultasObj?.id_fakultas,
        },
      });

      if (response.data?.success || response.data?.ruangan) {
        setRuangan(response.data.ruangan);
        const total = response.data.ruangan.length ?? 0;
        setFilterMessage(
          total > 0
            ? `Menampilkan ${total} ruangan tersedia.`
            : "Tidak ada ruangan tersedia untuk waktu tersebut.",
        );
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching available rooms:", err);
      setFilterMessage("Terjadi kesalahan saat memuat ruangan.");
    }
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

  // useEffect(() => {
  //   try {
  //     const ruanganId = Number(ruangan.id_ruangan);
  //     if (!ruanganId) {

  //     }
  //   } catch (err) {

  //   }
  // },[ruangan])

  const placeholderImg = assets.fiklab301;
  const mobileBatchSize = 6;
  const isLg = viewportWidth >= 1024;
  const isMobile = !isLg;
  const pageSize = isLg ? 8 : mobileBatchSize;
  const { minTime, maxStartTime, maxEndTime, minDurationMinutes, minuteStep } =
    SERVICE_TIME;

  type TimeFieldName = "waktu_mulai" | "waktu_selesai";

  const handleTimeChange = (name: TimeFieldName, value: string) => {
    setFilterTimes((prev) => ({ ...prev, [name]: value }));
  };

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

  const fakultasById = useMemo(() => {
    return new Map(
      fakultas.map((item) => [item.id_fakultas, item.nama_fakultas]),
    );
  }, [fakultas]);

  const getRoomTag = (item: Ruangan) => {
    if (item.nama_fakultas) return item.nama_fakultas;
    if (item.fakultas_id) return fakultasById.get(item.fakultas_id) ?? "";
    return selectedFakultas ?? user?.nama_fakultas ?? "";
  };

  const mobileRooms = useMemo(() => {
    return ruangan.slice(0, visibleCount);
  }, [ruangan, visibleCount]);

  const wibNow = getWibNow();
  const todayWib = formatWibDate(wibNow);
  const nowMinutes = wibNow.getHours() * 60 + wibNow.getMinutes();
  const roundedNowMinutes = roundUpMinutes(nowMinutes, minuteStep);
  const minTimeMinutes = timeToMinutes(minTime) ?? 0;
  const minSelectableTime =
    startDate === todayWib
      ? minutesToTimeString(Math.max(minTimeMinutes, roundedNowMinutes))
      : minTime;
  const minEndBaseMinutes = minTimeMinutes + minDurationMinutes;
  const minEndSelectableTime =
    startDate === todayWib
      ? minutesToTimeString(Math.max(minEndBaseMinutes, roundedNowMinutes))
      : minutesToTimeString(minEndBaseMinutes);

  return (
    <div className="w-full h-full mx-auto bg-gray-100">
      <Caraousal slides={slides} />
      <div className="pt-5" />
      <BuildingList
        building={fakultas}
        onFakultasChange={setSelectedFakultas}
      />
      <div className="lg:py-10 md:py-7 py-5">
        <form
          name="search-room-filter"
          className="flex flex-row flex-wrap justify-center lg:text-2xl md:text-xl text-sm font-medium lg:px-10 md:px-7 px-5 md:gap-10 sm:gap-7 gap-5"
        >
          <ReactDatePicker
            title="Tanggal Peminjaman"
            classname="lg:basis-3/14 md:basis-1/2 basis-full"
            value={startDate}
            onChange={setStartDate}
            min={new Date().toISOString().split("T")[0]}
          />
          <WibTimePicker
            label="Waktu Mulai"
            name="waktu_mulai"
            value={filterTimes.waktu_mulai}
            onChange={handleTimeChange}
            minTime={minSelectableTime}
            maxTime={maxStartTime}
            showHelperText={false}
            showTimezoneLabel={false}
            className="text-left lg:p-0 md:p-1.5 p-1 lg:basis-2/14 md:basis-1/3 basis-1/2"
          />
          <WibTimePicker
            label="Waktu Akhir"
            name="waktu_selesai"
            value={filterTimes.waktu_selesai}
            onChange={handleTimeChange}
            minTime={minEndSelectableTime}
            maxTime={maxEndTime}
            showHelperText={false}
            showTimezoneLabel={false}
            className="text-left lg:p-0 md:p-1.5 p-1 lg:basis-2/14 md:basis-1/3 basis-1/2"
          />
          <Button
            title="Check"
            classname="lg:basis-3/14 md:basis-1/3 basis-full lg:text-3xl md:text-2xl text-xl lg:h-34 md:h-25 md:mt-4 lg:mt-0 mt-2 lg:mx-0 md:mx-0 mx-1 py-4"
            onClick={handleFilterCheck}
          />
        </form>
      </div>
      <div className="lg:mt-15 md:mt-10 mt-5 lg:px-9 md:px-6 px-5 flex flex-col gap-10">
        <span className="text-3xl font-medium">Informasi Ruangan</span>
        {filterMessage && (
          <Container className="bg-blue-50 border border-blue-200 text-blue-800 shadow-none mt-0">
            <span className="text-sm font-medium">{filterMessage}</span>
          </Container>
        )}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
          {(isMobile ? mobileRooms : paginatedRooms).map((item) => {
            return (
              <RoomCard
                id={item.id_ruangan}
                img={placeholderImg}
                tag={getRoomTag(item)}
                title={item.nama_ruangan}
                lokasi={`Gedung ${item.gedung}`}
                lantai={item.lantai}
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
