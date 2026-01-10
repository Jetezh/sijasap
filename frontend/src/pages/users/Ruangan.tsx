import { useCallback, useMemo, useRef, useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";
import RoomCard from "../../components/RoomCard";
import BuildingList from "../../components/BuildingList";
import Pagination from "../../components/Pagination";
import assets from "../../assets/assets";
import type { Ruangan as RuanganType, Fakultas } from "../../types";

function Ruangan() {
  const [ruangan, setRuangan] = useState<RuanganType[]>([]);
  const [ruanganSearch, setRuanganSearch] = useState("");
  const [fakultas, setFakultas] = useState<Fakultas[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const animationMs = 500;
  const pageSize = 8;

  useEffect(() => {
    const fetchRuangan = async () => {
      try {
        const response = await api.get("/api/ruangan");

        if (response.data?.success && response.data?.ruangan) {
          setRuangan(response.data.ruangan);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching ruangan:", err);
      }
    };
    fetchRuangan();

    const fetchFakultas = async () => {
      try {
        const response = await api.get("/api/fakultas");

        if (response.data?.success && response.data?.fakultas) {
          setFakultas(response.data.fakultas);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching fakultas:", err);
      }
    };
    fetchFakultas();
  }, []);

  const ruanganSearchTerm = ruanganSearch.trim().toLowerCase();
  const filteredRuangan = useMemo(() => {
    if (!ruanganSearchTerm) return ruangan;
    return ruangan.filter((item) => {
      const namaMatch = item.nama_ruangan
        .toLowerCase()
        .includes(ruanganSearchTerm);
      const kapasitasMatch = String(item.kapasitas)
        .toLowerCase()
        .includes(ruanganSearchTerm);
      const gedungMatch = item.gedung.toLowerCase().includes(ruanganSearchTerm);
      return namaMatch || kapasitasMatch || gedungMatch;
    });
  }, [ruangan, ruanganSearchTerm]);

  const totalItems = filteredRuangan.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedRuangan = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredRuangan.slice(start, end);
  }, [filteredRuangan, currentPage, pageSize]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (gridRef.current) {
        const h = gridRef.current.clientHeight;
        gridRef.current.style.minHeight = `${h}px`;
      }
      setLastPage(currentPage);
      setCurrentPage(page);
    },
    [currentPage],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (gridRef.current) gridRef.current.style.minHeight = "";
    }, animationMs + 50);
    return () => clearTimeout(t);
  }, [currentPage]);

  const placeholderImg = assets.fiklab301;

  return (
    <div className="mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Halaman Ruangan</h1>
      <div className="flex flex-row items-center gap-3">
        <div className="mb-6 basis-8/9">
          <input
            id="search-ruangan"
            type="text"
            className="w-full bg-gray-100 rounded-md px-5 py-3 text-lg border"
            placeholder="Cari ruangan, gedung, atau kapasitas..."
            value={ruanganSearch}
            onChange={(event) => {
              setRuanganSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="mb-6 basis-1/9">
          <BuildingList building={fakultas} />
        </div>
      </div>
      <div
        ref={gridRef}
        className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 mb-10 ${currentPage > lastPage ? "animate-slide-left" : currentPage < lastPage ? "animate-slide-right" : ""}`}
      >
        {paginatedRuangan.map((item) => (
          <RoomCard
            id={item.id_ruangan}
            img={placeholderImg}
            tag={item.nama_ruangan}
            lokasi={`Gedung ${item.gedung}`}
            lantai={item.lantai}
            antrianPinjaman={0}
            key={`room-${item.id_ruangan}`}
          />
        ))}
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Ruangan;
