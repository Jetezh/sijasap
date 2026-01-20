import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Table, { type Column } from "../../components/Table";
import Tag from "../../components/Tag";
import assets from "../../assets/assets";
import api from "../../services/api";
import type {
  Ruangan,
  RuanganFasilitasType,
  PeminjamanByRuanganProps,
} from "../../types";

function DetailRuangan() {
  const { id_ruangan } = useParams();
  const [ruangan, setRuangan] = useState<Ruangan | null>(null);
  const [fasilitas, setFasilitas] = useState<RuanganFasilitasType[]>([]);
  const [daftarPeminjaman, setDaftarPeminjaman] = useState<
    PeminjamanByRuanganProps[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id_ruangan) {
      setErrorMessage("ID ruangan tidak ditemukan.");
      setLoading(false);
      return;
    }

    const ruanganId = Number(id_ruangan);
    if (Number.isNaN(ruanganId)) {
      setErrorMessage("ID ruangan tidak valid.");
      setLoading(false);
      return;
    }

    const fetchRuanganDanFasilitas = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const [ruanganResponse, fasilitasResponse] = await Promise.all([
          api.get(`/api/ruangan/${ruanganId}`),
          api.get(`/api/ruangan-fasilitas/${ruanganId}`),
        ]);

        if (ruanganResponse.data?.success && ruanganResponse.data?.ruangan) {
          setRuangan(ruanganResponse.data.ruangan as Ruangan);
        } else {
          throw new Error("Format response ruangan tidak sesuai.");
        }

        if (
          fasilitasResponse.data?.success &&
          fasilitasResponse.data?.ruanganFasilitas
        ) {
          const filtered = fasilitasResponse.data.ruanganFasilitas.filter(
            (item: RuanganFasilitasType) => item.id_ruangan === ruanganId,
          );
          setFasilitas(filtered);
        }
      } catch (err) {
        console.error("Error fetching detail ruangan:", err);
        setErrorMessage("Gagal memuat detail ruangan.");
      } finally {
        setLoading(false);
      }
    };

    fetchRuanganDanFasilitas();

    const fetchDaftarPeminjaman = async () => {
      try {
        if (!id_ruangan) {
          setErrorMessage("ID ruangan tidak ditemukan.");
          setLoading(false);
          return;
        }

        const response = await api.get(`/api/peminjaman/${id_ruangan}`);
        if (response.data?.success && response.data?.data) {
          setDaftarPeminjaman(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching peminjaman:", err);
        setErrorMessage("Gagal memuat daftar peminjaman.");
      } finally {
        setLoading(false);
      }
    };

    fetchDaftarPeminjaman();
  }, [id_ruangan]);

  const title = ruangan?.nama_ruangan ?? "Detail Ruangan";

  type TableRow = {
    no: number;
    tanggal: string;
    waktu: string;
    status: React.ReactNode;
    namaPeminjam: string;
  };

  const columns: Column<TableRow>[] = [
    { header: "No", accessor: "no" },
    { header: "Tanggal", accessor: "tanggal" },
    { header: "Waktu", accessor: "waktu" },
    { header: "Status", accessor: "status" },
    { header: "Nama Peminjam", accessor: "namaPeminjam" },
  ];

  const tableData: TableRow[] = daftarPeminjaman.map((peminjaman, index) => {
    const waktuMulai = new Date(peminjaman.waktu_mulai);
    const waktuSelesai = new Date(peminjaman.waktu_selesai);

    return {
      no: index + 1,
      tanggal: waktuMulai.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
      }),
      waktu: `${waktuMulai.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${waktuSelesai.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      status: (
        <Tag
          title={peminjaman.status_peminjaman}
          classname={
            peminjaman.status_peminjaman === "DITERIMA"
              ? "green"
              : peminjaman.status_peminjaman === "DIPROSES"
                ? "yellow"
                : "red"
          }
        />
      ),
      namaPeminjam: peminjaman.nama_peminjam,
    };
  });

  return (
    <div className="flex flex-col lg:gap-5 md:gap-3 gap-4 bg-white">
      <section className="w-full lg:[height:calc(50vh-7rem)] md:h-96 h-60 p-0 relative">
        <img
          src={assets.gedungFIK}
          alt="Foto Ruangan"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute bottom-4 left-4 text-white font-bold lg:text-5xl md:text-3xl text-xl">
          {title}
        </h1>
        <Link
          to={`/reserving-form/${ruangan?.id_ruangan ?? id_ruangan ?? ""}`}
          state={{ ruangan }}
        >
          <Button
            title="Pinjam Ruangan"
            classname="absolute bottom-4 right-4 lg:py-4 lg:px-10 md:py-3 md:px-7 py-2 px-5"
          />
        </Link>
      </section>
      <section className="flex lg:flex-row md:flex-row flex-col lg:gap-10 md:gap-7 gap-5 lg:px-5 md:px-2 px-4">
        <div className="flex flex-col basis-1/2 gap-5 ">
          <div>
            <img
              src={assets.fiklab301}
              alt="Foto Ruangan"
              className="w-full h-full object-cover"
            />
            <div>
              {loading && (
                <p className="text-sm text-gray-500">
                  Memuat detail ruangan...
                </p>
              )}
              {!loading && errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col basis-1/4">
              <h1>Kategori</h1>
              <div className="bg-gray-200 border-1 py-5">
                {ruangan ? "Ruangan" : "-"}
              </div>
            </div>
            <div className="flex flex-col basis-1/4">
              <h1>Lokasi</h1>
              <div className="bg-gray-200 border-1 py-5">
                {ruangan ? `Gedung ${ruangan.gedung}` : "-"}
              </div>
            </div>
            <div className="flex flex-col basis-1/4">
              <h1>Lantai</h1>
              <div className="bg-gray-200 border-1 py-5">
                {ruangan ? `${ruangan.lantai}` : "-"}
              </div>
            </div>
            <div className="flex flex-col basis-1/4">
              <h1>Kapasitas</h1>
              <div className="bg-gray-200 border-1 py-5">
                {ruangan?.kapasitas ?? "-"}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-left">Fasilitas {title}</h1>
            <div>
              {fasilitas.length === 0 && !loading && (
                <p className="text-sm text-gray-500">
                  Belum ada data fasilitas.
                </p>
              )}
              {fasilitas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {fasilitas.map((item) => (
                    <span
                      key={`${item.id_ruangan}-${item.id_fasilitas}`}
                      className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                    >
                      {item.fasilitas.nama_fasilitas}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
        <div className="basis-1/2">
          <h1 className="text-2xl text-left">
            Ruangan ini telah direservasi pada:
          </h1>
          <Table data={tableData} columns={columns} />
        </div>
      </section>
    </div>
  );
}

export default DetailRuangan;
