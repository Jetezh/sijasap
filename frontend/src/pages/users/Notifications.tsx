import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

type PeminjamanItem = {
  id_peminjaman: number;
  status_peminjaman:
    | "DIPROSES"
    | "DITERIMA"
    | "DITOLAK"
    | "SELESAI"
    | "DIBATALKAN";
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

const STATUS_KEYS = [
  "DIPROSES",
  "DITERIMA",
  "DITOLAK",
  "SELESAI",
  "DIBATALKAN",
] as const;
const REFRESH_INTERVAL_MS = 60 * 1000;
const WIB_TIMEZONE = "Asia/Jakarta";

const formatWibDate = (value: string) =>
  new Date(value).toLocaleDateString("id-ID", {
    timeZone: WIB_TIMEZONE,
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formatWibTime = (value: string) =>
  new Date(value).toLocaleTimeString("id-ID", {
    timeZone: WIB_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
  });

const statusLabel: Record<PeminjamanItem["status_peminjaman"], string> = {
  DIPROSES: "Diproses",
  DITERIMA: "Diterima",
  DITOLAK: "Ditolak",
  SELESAI: "Selesai",
  DIBATALKAN: "Dibatalkan",
};

const statusClassName: Record<PeminjamanItem["status_peminjaman"], string> = {
  DIPROSES: "bg-yellow-100 text-yellow-700",
  DITERIMA: "bg-green-100 text-green-700",
  DITOLAK: "bg-red-100 text-red-700",
  SELESAI: "bg-blue-100 text-blue-700",
  DIBATALKAN: "bg-gray-200 text-gray-700",
};

function Notifications() {
  const [peminjaman, setPeminjaman] = useState<PeminjamanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<number | null>(null);

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

  const handleCancel = async (item: PeminjamanItem) => {
    if (cancelingId) {
      return;
    }

    const confirmed = window.confirm(
      `Batalkan peminjaman ${item.ruangan.nama_ruangan}?`,
    );
    if (!confirmed) {
      return;
    }

    try {
      setCancelingId(item.id_peminjaman);
      const response = await api.patch(
        `/api/peminjaman/${item.id_peminjaman}/cancel`,
      );
      if (!response.data?.success) {
        throw new Error("Cancel failed");
      }
      await fetchPeminjaman();
    } catch (error) {
      console.error("Error canceling peminjaman:", error);
      setErrorMessage("Gagal membatalkan peminjaman.");
    } finally {
      setCancelingId(null);
    }
  };

  const statusCount = useMemo(() => {
    const counts: Record<(typeof STATUS_KEYS)[number], number> = {
      DIPROSES: 0,
      DITERIMA: 0,
      DITOLAK: 0,
      SELESAI: 0,
      DIBATALKAN: 0,
    };

    for (const item of peminjaman) {
      if (STATUS_KEYS.includes(item.status_peminjaman)) {
        counts[item.status_peminjaman] += 1;
      }
    }

    return counts;
  }, [peminjaman]);

  const grouped = useMemo(() => {
    return {
      DIPROSES: peminjaman.filter(
        (item) => item.status_peminjaman === "DIPROSES",
      ),
      DITERIMA: peminjaman.filter(
        (item) => item.status_peminjaman === "DITERIMA",
      ),
      DITOLAK: peminjaman.filter(
        (item) => item.status_peminjaman === "DITOLAK",
      ),
      SELESAI: peminjaman.filter(
        (item) => item.status_peminjaman === "SELESAI",
      ),
      DIBATALKAN: peminjaman.filter(
        (item) => item.status_peminjaman === "DIBATALKAN",
      ),
    };
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
        <div className="mt-4 flex flex-col gap-3">
          {grouped.DIPROSES.map((item) => (
            <div
              key={item.id_peminjaman}
              className="bg-white border rounded-md p-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {item.ruangan.nama_ruangan}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClassName[item.status_peminjaman]}`}
                >
                  {statusLabel[item.status_peminjaman]}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {formatWibDate(item.waktu_mulai)} •{" "}
                {formatWibTime(item.waktu_mulai)} -{" "}
                {formatWibTime(item.waktu_selesai)} WIB
              </div>
              <div className="text-sm text-gray-600">
                Gedung {item.ruangan.gedung}, Lantai {item.ruangan.lantai}
              </div>
              <button
                type="button"
                className="self-start bg-red-600 text-white text-sm px-3 py-1 rounded-md hover:cursor-pointer disabled:opacity-60"
                disabled={cancelingId === item.id_peminjaman}
                onClick={() => handleCancel(item)}
              >
                {cancelingId === item.id_peminjaman
                  ? "Membatalkan..."
                  : "Batalkan"}
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-(--primary-color)">diTerima</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {statusCount.DITERIMA}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {grouped.DITERIMA.map((item) => (
            <div
              key={item.id_peminjaman}
              className="bg-white border rounded-md p-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {item.ruangan.nama_ruangan}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClassName[item.status_peminjaman]}`}
                >
                  {statusLabel[item.status_peminjaman]}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {formatWibDate(item.waktu_mulai)} •{" "}
                {formatWibTime(item.waktu_mulai)} -{" "}
                {formatWibTime(item.waktu_selesai)} WIB
              </div>
              <div className="text-sm text-gray-600">
                Gedung {item.ruangan.gedung}, Lantai {item.ruangan.lantai}
              </div>
              <button
                type="button"
                className="self-start bg-red-600 text-white text-sm px-3 py-1 rounded-md disabled:opacity-60"
                disabled={cancelingId === item.id_peminjaman}
                onClick={() => handleCancel(item)}
              >
                {cancelingId === item.id_peminjaman
                  ? "Membatalkan..."
                  : "Batalkan"}
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-red-500">diTolak</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {statusCount.DITOLAK}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {grouped.DITOLAK.map((item) => (
            <div
              key={item.id_peminjaman}
              className="bg-white border rounded-md p-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {item.ruangan.nama_ruangan}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClassName[item.status_peminjaman]}`}
                >
                  {statusLabel[item.status_peminjaman]}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {formatWibDate(item.waktu_mulai)} •{" "}
                {formatWibTime(item.waktu_mulai)} -{" "}
                {formatWibTime(item.waktu_selesai)} WIB
              </div>
              <div className="text-sm text-gray-600">
                Gedung {item.ruangan.gedung}, Lantai {item.ruangan.lantai}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-blue-500">Selesai</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {statusCount.SELESAI}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {grouped.SELESAI.map((item) => (
            <div
              key={item.id_peminjaman}
              className="bg-white border rounded-md p-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {item.ruangan.nama_ruangan}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClassName[item.status_peminjaman]}`}
                >
                  {statusLabel[item.status_peminjaman]}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {formatWibDate(item.waktu_mulai)} •{" "}
                {formatWibTime(item.waktu_mulai)} -{" "}
                {formatWibTime(item.waktu_selesai)} WIB
              </div>
              <div className="text-sm text-gray-600">
                Gedung {item.ruangan.gedung}, Lantai {item.ruangan.lantai}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-gray-500">diBatalkan</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {statusCount.DIBATALKAN}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {grouped.DIBATALKAN.map((item) => (
            <div
              key={item.id_peminjaman}
              className="bg-white border rounded-md p-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {item.ruangan.nama_ruangan}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClassName[item.status_peminjaman]}`}
                >
                  {statusLabel[item.status_peminjaman]}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {formatWibDate(item.waktu_mulai)} •{" "}
                {formatWibTime(item.waktu_mulai)} -{" "}
                {formatWibTime(item.waktu_selesai)} WIB
              </div>
              <div className="text-sm text-gray-600">
                Gedung {item.ruangan.gedung}, Lantai {item.ruangan.lantai}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Notifications;
