import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import {
  useCallback,
  type ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../../context/AuthContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import FasilitasCard from "../../components/FasilitasCard";
import RoomCardAdmin from "../../components/RoomCardAdmin";
import Pagination from "../../components/Pagination";
import type {
  Ruangan,
  RuanganFasilitasType,
  FasilitasItem,
  MaintenanceProps,
  PeminjamanTerpakaiProps,
} from "../../types";

function RuangDanFasilitas() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  // state management
  const [ruangan, setRuangan] = useState<Ruangan[]>([]);
  const [fasilitas, setFasilitas] = useState<FasilitasItem[]>([]);
  const [peminjamanTerpakai, setPeminjamanTerpakai] = useState<
    PeminjamanTerpakaiProps[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [ruanganSearch, setRuanganSearch] = useState("");
  const [fasilitasSearch, setFasilitasSearch] = useState("");
  const [maintenance, setMaintenance] = useState<MaintenanceProps[]>([]);

  const pageSize = 4;
  const gridRef = useRef<HTMLDivElement | null>(null);
  const animationMs = 500;
  const fasilitasCache = useRef<Map<number, RuanganFasilitasType[]>>(new Map());
  const [pageFasilitas, setPageFasilitas] = useState<
    Record<number, RuanganFasilitasType[]>
  >({});
  const [loadingFasilitasIds, setLoadingFasilitasIds] = useState<Set<number>>(
    new Set(),
  );
  const [fasilitasCacheVersion, setFasilitasCacheVersion] = useState(0);

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
        console.error("Error fetching user data:", err);
      }
    };

    fetchRuangan();

    const fetchDataPeminjamanTerpakai = async () => {
      try {
        const response = await api.get("/api/peminjaman-terpakai");

        if (response.data?.success && response.data?.peminjaman) {
          setPeminjamanTerpakai(response.data.peminjaman);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchDataPeminjamanTerpakai();

    const fetchDataFasilitas = async () => {
      try {
        const response = await api.get("/api/fasilitas");

        if (response.data?.success && response.data?.fasilitas) {
          setFasilitas(response.data.fasilitas);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchDataFasilitas();
  }, [isAuthenticated]);

  const fasilitasByRuangan = useMemo(() => {
    return new Map(fasilitasCache.current);
  }, [fasilitasCacheVersion]);

  const ruanganSearchTerm = ruanganSearch.trim().toLowerCase();
  const fasilitasSearchTerm = fasilitasSearch.trim().toLowerCase();

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
      const fasilitasMatch = (
        fasilitasByRuangan.get(item.id_ruangan) ?? []
      ).some((f) =>
        f.fasilitas.nama_fasilitas.toLowerCase().includes(ruanganSearchTerm),
      );
      return namaMatch || kapasitasMatch || gedungMatch || fasilitasMatch;
    });
  }, [ruangan, ruanganSearchTerm, fasilitasByRuangan]);

  const filteredFasilitas = useMemo(() => {
    if (!fasilitasSearchTerm) return fasilitas;
    return fasilitas.filter((item) =>
      item.nama_fasilitas.toLowerCase().includes(fasilitasSearchTerm),
    );
  }, [fasilitas, fasilitasSearchTerm]);

  // Keep current page within bounds when data changes
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
  }, [filteredRuangan, currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (gridRef.current) {
        const h = gridRef.current.clientHeight;
        gridRef.current.style.minHeight = `${h}px`;
      }
      setLastPage(currentPage);
      setCurrentPage(page);
      // Keep viewport position to emphasize slide transition
    },
    [currentPage],
  );

  // Clear min-height after the slide animation completes
  useEffect(() => {
    const t = setTimeout(() => {
      if (gridRef.current) gridRef.current.style.minHeight = "";
    }, animationMs + 50);
    return () => clearTimeout(t);
  }, [currentPage]);

  // Fetch fasilitas for rooms on the current page with caching to prevent per-card flicker
  useEffect(() => {
    const ids = paginatedRuangan.map((r) => r.id_ruangan);
    const missing = ids.filter((id) => !fasilitasCache.current.has(id));

    // mark loading for missing ids
    setLoadingFasilitasIds(
      (prev) => new Set([...Array.from(prev), ...missing]),
    );

    if (missing.length === 0) {
      const mapObj: Record<number, RuanganFasilitasType[]> = {};
      ids.forEach((id) => {
        mapObj[id] = fasilitasCache.current.get(id) ?? [];
      });
      setPageFasilitas(mapObj);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.all(
          missing.map(async (id) => {
            const res = await api.get(`/api/ruangan-fasilitas/${id}`);
            const data: RuanganFasilitasType[] =
              res.data?.ruanganFasilitas ?? [];
            return { id, data };
          }),
        );
        if (cancelled) return;
        results.forEach(({ id, data }) => {
          fasilitasCache.current.set(id, data);
        });
        setFasilitasCacheVersion((prev) => prev + 1);
        const mapObj: Record<number, RuanganFasilitasType[]> = {};
        ids.forEach((id) => {
          mapObj[id] = fasilitasCache.current.get(id) ?? [];
        });
        setPageFasilitas(mapObj);
      } catch (e) {
        console.error("Error fetching fasilitas per page:", e);
      } finally {
        if (!cancelled) {
          setLoadingFasilitasIds((prev) => {
            const next = new Set(prev);
            missing.forEach((id) => next.delete(id));
            return next;
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [paginatedRuangan]);

  // Prefetch fasilitas for adjacent pages (next and previous) to warm the cache
  useEffect(() => {
    const nextStart = currentPage * pageSize;
    const nextEnd = nextStart + pageSize;
    const prevStart = Math.max(0, (currentPage - 2) * pageSize);
    const prevEnd = prevStart + pageSize;

    const nextIds = ruangan.slice(nextStart, nextEnd).map((r) => r.id_ruangan);
    const prevIds = ruangan.slice(prevStart, prevEnd).map((r) => r.id_ruangan);
    const candidates = Array.from(new Set([...nextIds, ...prevIds]));
    const missing = candidates.filter((id) => !fasilitasCache.current.has(id));
    if (missing.length === 0) return;

    let cancelled = false;
    setLoadingFasilitasIds(
      (prev) => new Set([...Array.from(prev), ...missing]),
    );

    (async () => {
      try {
        const results = await Promise.all(
          missing.map(async (id) => {
            const res = await api.get(`/api/ruangan-fasilitas/${id}`);
            const data: RuanganFasilitasType[] =
              res.data?.ruanganFasilitas ?? [];
            return { id, data };
          }),
        );
        if (cancelled) return;
        results.forEach(({ id, data }) => {
          fasilitasCache.current.set(id, data);
        });
        setFasilitasCacheVersion((prev) => prev + 1);
      } catch (e) {
        console.error("Error prefetching fasilitas:", e);
      } finally {
        if (!cancelled) {
          setLoadingFasilitasIds((prev) => {
            const next = new Set(prev);
            missing.forEach((id) => next.delete(id));
            return next;
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ruangan, currentPage, pageSize]);

  useEffect(() => {
    if (!ruanganSearchTerm) return;
    const ids = ruangan.map((r) => r.id_ruangan);
    const missing = ids.filter((id) => !fasilitasCache.current.has(id));
    if (missing.length === 0) return;

    let cancelled = false;
    setLoadingFasilitasIds(
      (prev) => new Set([...Array.from(prev), ...missing]),
    );

    (async () => {
      try {
        const results = await Promise.all(
          missing.map(async (id) => {
            const res = await api.get(`/api/ruangan-fasilitas/${id}`);
            const data: RuanganFasilitasType[] =
              res.data?.ruanganFasilitas ?? [];
            return { id, data };
          }),
        );
        if (cancelled) return;
        results.forEach(({ id, data }) => {
          fasilitasCache.current.set(id, data);
        });
        setFasilitasCacheVersion((prev) => prev + 1);
      } catch (e) {
        console.error("Error fetching fasilitas for search:", e);
      } finally {
        if (!cancelled) {
          setLoadingFasilitasIds((prev) => {
            const next = new Set(prev);
            missing.forEach((id) => next.delete(id));
            return next;
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ruangan, ruanganSearchTerm]);

  useEffect(() => {
    const fetchRuanganMaintenance = async () => {
      try {
        const response = await api.get("/api/ruangan-maintenance");

        if (response.data?.success && response.data?.data) {
          setMaintenance(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching fasilitas:", err);
      }
    };

    fetchRuanganMaintenance();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRuanganSearch(event.target.value);
    setCurrentPage(1);
  };

  // TODO add function for ruangan terpakai dan tersedia
  // const totalPeminjamanTerpakai = useMemo(() => {
  //   if (ruangan.isActive);
  // }, [peminjamanTerpakai]);

  return (
    <div className="flex flex-col gap-15 px-15 py-15">
      <div className="flex flex-col gap-15">
        <div className="flex flex-col text-left gap-3">
          <h1 className="font-bold lg:text-5xl">Daftar Ruangan</h1>
          <p className="md:text-2xl">Kelola Ruang dan Fasilitas</p>
        </div>
        <div className="flex flex-row justify-between gap-15">
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
            <FontAwesomeIcon
              icon={faBuilding}
              className="text-(--primary-color) lg:text-5xl"
            />
            <div className="font-bold">{ruangan.length}</div>
            <p className="lg:text-2xl text-gray-400">Total Ruang</p>
          </Container>
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
            <DotLottieReact
              className="w-15 h-15"
              src="https://lottie.host/ebb80b0e-b548-4672-890a-9fb9bec7d059/GdboYuhJkv.lottie"
              loop
              autoplay
            />
            <div className="font-bold text-[#41A67E]">{0}</div>
            <p className="lg:text-2xl text-gray-400">Tersedia</p>
          </Container>
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
            <DotLottieReact
              className="w-15 h-15"
              src="https://lottie.host/b6054b81-151c-4bdf-9f81-824695882e55/NEEK380pwb.lottie"
              loop
              autoplay
            />
            <div className="font-bold text-[#FF6C0C]">{0}</div>
            <p className="lg:text-2xl text-gray-400">Terpakai</p>
          </Container>
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
            <DotLottieReact
              className="w-15 h-15"
              src="https://lottie.host/bddb8cc7-0ca2-4f21-855d-9e1d835cb554/bJ3L5VRpFk.lottie"
              loop
              autoplay
            />
            <div className="font-bold text-[#000000]">{maintenance.length}</div>
            <p className="lg:text-2xl text-gray-400">Maintenance</p>
          </Container>
        </div>
      </div>
      <div className="flex flex-col gap-15">
        <h1 className="font-bold lg:text-5xl text-left">Daftar Ruangan</h1>
        <Container>
          <div className="flex flex-row">
            <input
              id="search-daftar-ruangan"
              type="text"
              className="mx-auto bg-gray-100 rounded-md px-5 py-3 lg:text-2xl md:text-xl"
              placeholder="Search..."
              value={ruanganSearch}
              onChange={handleSearchChange}
            />
            <Button title="Add" classname="lg:text-2xl md:text-2xl w-30" />
          </div>
        </Container>
        <div
          ref={gridRef}
          className={`grid grid-cols-2 gap-15 ${currentPage > lastPage ? "animate-slide-left" : currentPage < lastPage ? "animate-slide-right" : ""}`}
        >
          {paginatedRuangan.map((s: RuanganProps) => {
            const fasilitasList = pageFasilitas[s.id_ruangan] ?? [];
            const fasilitasLoading = loadingFasilitasIds.has(s.id_ruangan);
            return (
              <RoomCardAdmin
                className=""
                {...s}
                fasilitasList={fasilitasList}
                fasilitasLoading={fasilitasLoading}
                key={`ruangan-${s.id_ruangan}`}
              />
            );
          })}
        </div>
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="flex flex-col gap-15">
        <h1 className="font-bold lg:text-5xl text-left">Daftar Fasilitas</h1>
        <div className="flex flex-col gap-10">
          <Container>
            <div className="flex flex-row">
              <input
                id="search-daftar-fasilitas"
                type="text"
                className="mx-auto bg-gray-100 rounded-md px-5 py-3 lg:text-2xl md:text-xl"
                placeholder="Search..."
                value={fasilitasSearch}
                onChange={(event) => setFasilitasSearch(event.target.value)}
              />
              <Button title="Add" classname="lg:text-2xl md:text-2xl w-30" />
            </div>
          </Container>
          <div className="grid grid-cols-3 gap-5">
            {filteredFasilitas.map((s, i) => {
              return (
                <FasilitasCard
                  className="lg:basis-1/3 "
                  {...s}
                  key={"fasilitas" + i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RuangDanFasilitas;
