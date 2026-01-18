import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

type PeminjamanItem = {
  id_peminjaman: number;
  status_peminjaman: "DIPROSES" | "DITERIMA" | "DITOLAK" | "SELESAI";
  waktu_mulai: string;
  waktu_selesai: string;
  createdAt: string;
  ruangan: {
    id_ruangan: number;
    nama_ruangan: string;
    gedung: string;
    lantai: number;
  };
};

const STATUS_KEYS = ["DIPROSES", "DITERIMA", "DITOLAK", "SELESAI"] as const;
const REFRESH_INTERVAL_MS = 60 * 1000;

function Notifications() {
  const [peminjaman, setPeminjaman] = useState<PeminjamanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPeminjaman = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await api.get("/api/notifikasi-peminjaman");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setPeminjaman(data as PeminjamanItem[]);
      } else {
        setPeminjaman([]);
      }
    } catch (error) {
      console.error("Error fetching peminjaman:", error);
      setErrorMessage("Gagal memuat status peminjaman.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPeminjaman();
    const intervalId = setInterval(fetchPeminjaman, REFRESH_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  const statusCount = useMemo(() => {
    const counts: Record<(typeof STATUS_KEYS)[number], number> = {
      DIPROSES: 0,
      DITERIMA: 0,
      DITOLAK: 0,
      SELESAI: 0,
    };

    for (const item of peminjaman) {
      if (STATUS_KEYS.includes(item.status_peminjaman)) {
        counts[item.status_peminjaman] += 1;
      }
    }

    return counts;
  }, [peminjaman]);

  return (
    <div className="flex flex-col gap-3">
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {errorMessage}
        </div>
      )}
      {loading && (
        <div className="text-sm text-gray-500">Memuat status peminjaman...</div>
      )}
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman Sedang <span className="text-yellow-600">diProses</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {statusCount.DIPROSES}
        </p>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-(--primary-color)">diTerima</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {statusCount.DITERIMA}
        </p>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-red-500">diTolak</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {statusCount.DITOLAK}
        </p>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-blue-500">Selesai</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {statusCount.SELESAI}
        </p>
      </section>
    </div>
  );
}

export default Notifications;
