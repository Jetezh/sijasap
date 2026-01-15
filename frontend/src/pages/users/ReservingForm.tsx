import assets from "../../assets/assets";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Modal from "../../components/Modal";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useParams } from "react-router-dom";

import type { Ruangan } from "../../types";
import api from "../../services/api";

function ReservingForm() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { id_ruangan } = useParams();
  const location = useLocation();
  const locationState = location.state as { ruangan?: Ruangan } | null;
  const [ruangan, setRuangan] = useState<Ruangan | null>(
    locationState?.ruangan ?? null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { user } = authContext;

  useEffect(() => {
    if (!id_ruangan) {
      setErrorMessage("ID ruangan tidak ditemukan.");
      return;
    }

    const ruanganId = Number(id_ruangan);
    if (Number.isNaN(ruanganId)) {
      setErrorMessage("ID ruangan tidak valid.");
      return;
    }

    if (ruangan?.id_ruangan === ruanganId) {
      return;
    }

    const fetchRuangan = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const response = await api.get(`/api/ruangan/${ruanganId}`);
        if (response.data?.success && response.data?.ruangan) {
          setRuangan(response.data.ruangan as Ruangan);
        } else {
          throw new Error("Format response ruangan tidak sesuai.");
        }
      } catch (err) {
        console.error("Error fetching ruangan data:", err);
        setErrorMessage("Gagal memuat data ruangan.");
      } finally {
        setLoading(false);
      }
    };

    fetchRuangan();
  }, [id_ruangan, ruangan?.id_ruangan]);

  const title = ruangan?.nama_ruangan ?? "Nama Ruangan";

  if (user?.role === "DOSEN") {
    return (
      <div className="flex flex-col gap-5 mb-10">
        <section className="w-full lg:[height:calc(50vh-7rem)] md:h-96 h-60 p-0 relative">
          <img
            src={assets.gedungFIK}
            alt="Foto Ruangan"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute bottom-4 left-4 text-white font-bold lg:text-5xl md:text-3xl text-xl">
            {title}
          </h1>
        </section>
        <div className="w-full flex justify-center">
          <Container className="min-w-[50%] flex flex-col gap-5">
            <h1 className="lg:text-3xl md:text-2xl font-bold">
              Formulir Peminjaman untuk {user?.role}
            </h1>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            {loading && (
              <p className="text-sm text-gray-500">Memuat data ruangan...</p>
            )}
            <form className="flex flex-col gap-5">
              <div className="bg-gray-100 p-5 lg:text-2xl md:text-2xl font-medium rounded-md flex flex-col gap-5 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2">
                    <span>Nama Dosen</span>
                    <input
                      className="border rounded-md p-2"
                      type="text"
                      placeholder="Nama dosen"
                      defaultValue={user?.nama_lengkap || "-"}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>NIP</span>
                    <input
                      className="border rounded-md p-2"
                      type="text"
                      placeholder="NIP"
                      defaultValue={user?.username || "-"}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Fakultas / Unit</span>
                    <input
                      className="border rounded-md p-2"
                      type="text"
                      placeholder="Program studi atau unit"
                      defaultValue={user?.nama_fakultas || "-"}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Email Institusi</span>
                    <input
                      className="border rounded-md p-2"
                      type="email"
                      placeholder="email@institusi.ac.id"
                      defaultValue={user?.email_upnvj || "-"}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Nomor Telepon/WhatsApp</span>
                    <input
                      className="border rounded-md p-2"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2">
                    <span>Nama Kegiatan</span>
                    <input
                      className="border rounded-md p-2"
                      type="text"
                      placeholder="Nama kegiatan"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Jenis Kegiatan</span>
                    <select className="border rounded-md p-2">
                      <option value="">Pilih jenis kegiatan</option>
                      <option value="perkuliahan">Perkuliahan</option>
                      <option value="praktikum">Praktikum</option>
                      <option value="penelitian">Penelitian</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Ruangan yang Dipinjam</span>
                    <input
                      className="border rounded-md p-2"
                      type="text"
                      placeholder="Nama laboratorium"
                      defaultValue={ruangan?.nama_ruangan}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Tanggal Peminjaman</span>
                    <input className="border rounded-md p-2" type="date" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Waktu Mulai</span>
                    <input className="border rounded-md p-2" type="time" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Waktu Selesai</span>
                    <input className="border rounded-md p-2" type="time" />
                  </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2">
                    <span>Jumlah Mahasiswa/Peserta</span>
                    <input
                      className="border rounded-md p-2"
                      type="number"
                      min="1"
                      placeholder="Jumlah peserta"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Mata Kuliah (jika relevan)</span>
                    <input
                      className="border rounded-md p-2"
                      type="text"
                      placeholder="Nama mata kuliah"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Kebutuhan Peralatan Tambahan (Opsional)</span>
                    <textarea
                      className="border rounded-md p-2"
                      rows={3}
                      placeholder="Tuliskan kebutuhan peralatan"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Keterangan Tambahan (Opsional)</span>
                    <textarea
                      className="border rounded-md p-2"
                      rows={3}
                      placeholder="Keterangan tambahan"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Pernyataan & Persetujuan</p>
                  <label className="flex items-start gap-2">
                    <input
                      className="mt-1 hover:cursor-pointer lg:w-5 lg:h-5 md:w-4 md:h-5 w-3 h-3 duration-300"
                      type="checkbox"
                    />
                    <span>
                      Menyetujui{" "}
                      <span
                        onClick={() => setIsModalOpen(true)}
                        className="italic text-(--link-color) hover:text-(--link-hover-color) hover:cursor-pointer"
                      >
                        syarat dan aturan
                      </span>{" "}
                      penggunaan ruangan
                    </span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      className="mt-1 hover:cursor-pointer lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3 duration-300"
                      type="checkbox"
                    />
                    <span>
                      Bertanggung jawab atas fasilitas selama peminjaman
                    </span>
                  </label>
                </div>
              </div>
              <Button
                title="Submit"
                classname="lg:text-2xl md:text-2xl w-full py-3"
              />
            </form>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 mb-10">
      <section className="w-full lg:[height:calc(50vh-7rem)] md:h-96 h-60 p-0 relative">
        <img
          src={assets.gedungFIK}
          alt="Foto Ruangan"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute bottom-4 left-4 text-white font-bold lg:text-5xl md:text-3xl text-xl">
          {title}
        </h1>
      </section>
      <div className="w-full flex justify-center">
        <Container className="min-w-[50%] flex flex-col gap-5">
          <h1 className="lg:text-3xl md:text-2xl font-bold">
            Formulir Peminjaman untuk {user?.role}
          </h1>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          {loading && (
            <p className="text-sm text-gray-500">Memuat data ruangan...</p>
          )}
          <form className="flex flex-col gap-5">
            <div className="bg-gray-100 p-5 lg:text-2xl md:text-2xl font-medium rounded-md flex flex-col gap-5 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span>Nama Lengkap</span>
                  <div className="border rounded-md p-2">
                    {user?.nama_lengkap}
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span>NIM</span>
                  <div className="border rounded-md p-2">{user?.username}</div>
                </label>
                <label className="flex flex-col gap-2">
                  <span>Program Studi</span>
                  <div className="border rounded-md p-2">
                    {user?.nama_program_studi}
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span>Angkatan</span>
                  <div className="border rounded-md p-2">
                    {user?.username ? `20${user.username.slice(0, 2)}` : "-"}
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span>Email</span>
                  <div className="border rounded-md p-2">
                    {user?.email_upnvj}
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span>Nomor Telepon/WhatsApp</span>
                  <input
                    className="border rounded-md p-2"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span>Nama Kegiatan</span>
                  <input
                    className="border rounded-md p-2"
                    type="text"
                    placeholder="Nama kegiatan"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Jenis Kegiatan</span>
                  <select className="border rounded-md p-2">
                    <option value="">Pilih jenis kegiatan</option>
                    <option value="PERKULIAHAN">Perkuliahan</option>
                    <option value="PRAKTIKUM">Praktikum</option>
                    <option value="PENELITIAN">Penelitian</option>
                    <option value="SIDANG_SKRIPSI">Sidang Skripsi</option>
                    <option value="LAINNYA">Lainnya</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span>Jenis Ruangan yang Dipinjam</span>
                  <input
                    className="border rounded-md p-2"
                    type="text"
                    placeholder="Jenis Ruangan"
                    defaultValue={ruangan?.nama_ruangan}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Tanggal Peminjaman</span>
                  <input className="border rounded-md p-2" type="date" />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Waktu Mulai</span>
                  <input className="border rounded-md p-2" type="time" />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Waktu Selesai</span>
                  <input className="border rounded-md p-2" type="time" />
                </label>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span>Dosen Penanggung Jawab</span>
                  <input
                    className="border rounded-md p-2"
                    type="text"
                    placeholder="Nama dosen"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Upload Surat Permohonan (jika diminta)</span>
                  <input className="border rounded-md p-2" type="file" />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Jumlah Peserta</span>
                  <input
                    className="border rounded-md p-2"
                    type="number"
                    min="1"
                    placeholder="Jumlah peserta"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Kebutuhan Tambahan (Opsional)</span>
                  <textarea
                    className="border rounded-md p-2"
                    rows={3}
                    placeholder="Tuliskan kebutuhan tambahan"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-semibold">Pernyataan & Persetujuan</p>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                ></Modal>
                <label className="flex items-start gap-2">
                  <input
                    className="mt-1 hover:cursor-pointer lg:w-5 lg:h-5 md:w-4 md:h-5 w-3 h-3 duration-300"
                    type="checkbox"
                  />
                  <span>
                    Menyetujui{" "}
                    <span
                      onClick={() => setIsModalOpen(true)}
                      className="italic text-(--link-color) hover:text-(--link-hover-color) hover:cursor-pointer"
                    >
                      syarat dan aturan
                    </span>{" "}
                    penggunaan ruangan
                  </span>
                </label>
                <label className="flex items-start gap-2">
                  <input
                    className="mt-1 hover:cursor-pointer lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3 duration-300"
                    type="checkbox"
                  />
                  <span>
                    Bertanggung jawab atas fasilitas selama peminjaman
                  </span>
                </label>
              </div>
            </div>
            <Button
              title="Submit"
              classname="lg:text-2xl md:text-2xl w-full py-3"
            />
          </form>
        </Container>
      </div>
    </div>
  );
}

export default ReservingForm;
