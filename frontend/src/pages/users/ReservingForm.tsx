import assets from "../../assets/assets";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Dialog from "../../components/Dialog";
import Modal from "../../components/Modal";
import WibTimePicker from "../../components/WibTimePicker";

import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import type { Ruangan } from "../../types";
import api from "../../services/api";

const WIB_OFFSET = "+07:00";

type TimeFieldName = "waktu_mulai" | "waktu_selesai";

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const initialFormData = {
    nomor_telepon: "",
    nama_kegiatan: "",
    jenis_kegiatan: "",
    tanggal_peminjaman: "",
    waktu_mulai: "",
    waktu_selesai: "",
    jumlah_peserta: "",
    mata_kuliah: "",
    kebutuhan_alat: "",
    keterangan_tambahan: "",
    dosen_penanggung_jawab: "",
    path_file_surat: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { user } = authContext;
  const navigate = useNavigate();

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
  const minTime = "07:00";
  const maxTime = "17:20";
  const isErrorOpen = Boolean(errorMessage);

  const timeToMinutes = (timeValue: string) => {
    if (!timeValue) {
      return null;
    }
    const [hours, minutes] = timeValue.split(":").map(Number);
    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return null;
    }
    return hours * 60 + minutes;
  };

  const combineDateTime = (dateValue: string, timeValue: string) => {
    if (!dateValue || !timeValue) {
      return null;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      return null;
    }

    if (timeToMinutes(timeValue) === null) {
      return null;
    }

    return `${dateValue}T${timeValue}:00${WIB_OFFSET}`;
  };

  const handleTimeChange = (name: TimeFieldName, value: string) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    const target = event.target;
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      path_file_surat: selectedFile?.name ?? "",
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ruangan?.id_ruangan) {
      setErrorMessage("Data ruangan belum tersedia.");
      return;
    }

    const waktuMulai = combineDateTime(
      formData.tanggal_peminjaman,
      formData.waktu_mulai,
    );
    const waktuSelesai = combineDateTime(
      formData.tanggal_peminjaman,
      formData.waktu_selesai,
    );

    if (
      new Date(formData.tanggal_peminjaman) <
      new Date(new Date().toISOString().split("T")[0])
    ) {
      setErrorMessage("Tidak dapat meminjam pada tanggal yang sudah lampau.");
      return;
    }

    if (!waktuMulai || !waktuSelesai) {
      setErrorMessage("Tanggal dan waktu peminjaman wajib diisi.");
      return;
    }

    if (new Date(waktuMulai) >= new Date(waktuSelesai)) {
      setErrorMessage("Waktu selesai harus lebih besar dari waktu mulai.");
      return;
    }

    const waktuMulaiMinutes = timeToMinutes(formData.waktu_mulai);
    const waktuSelesaiMinutes = timeToMinutes(formData.waktu_selesai);
    const minTimeMinutes = timeToMinutes(minTime);
    const maxTimeMinutes = timeToMinutes(maxTime);

    if (
      waktuMulaiMinutes === null ||
      waktuSelesaiMinutes === null ||
      minTimeMinutes === null ||
      maxTimeMinutes === null
    ) {
      setErrorMessage("Format waktu tidak valid.");
      return;
    }

    if (waktuMulaiMinutes < minTimeMinutes) {
      setErrorMessage(
        `Waktu mulai harus antara ${minTime} sampai ${maxTime} WIB.`,
      );
      return;
    }

    if (waktuSelesaiMinutes > maxTimeMinutes) {
      setErrorMessage(
        `Waktu selesai harus antara ${minTime} sampai ${maxTime} WIB.`,
      );
      return;
    }

    if (waktuSelesaiMinutes - waktuMulaiMinutes < 40) {
      setErrorMessage("Durasi peminjaman minimal 40 menit.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const payload = {
        id_ruangan: ruangan.id_ruangan,
        nama_kegiatan: formData.nama_kegiatan,
        jenis_kegiatan: formData.jenis_kegiatan,
        nomor_telepon: formData.nomor_telepon,
        jumlah_peserta: formData.jumlah_peserta,
        dosen_penanggung_jawab: formData.dosen_penanggung_jawab,
        path_file_surat: formData.path_file_surat,
        mata_kuliah: formData.mata_kuliah,
        kebutuhan_alat: formData.kebutuhan_alat,
        keterangan_tambahan: formData.keterangan_tambahan,
        waktu_mulai: waktuMulai,
        waktu_selesai: waktuSelesai,
      };

      const response = await api.post("/api/peminjaman-fasilitas", payload);

      if (response.data?.success) {
        setSuccessMessage("Pengajuan peminjaman berhasil dikirim.");
        setFormData(initialFormData);
      } else {
        setErrorMessage("Pengajuan peminjaman gagal diproses.");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        "Terjadi kesalahan saat mengirim pengajuan.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Dialog
              isOpen={isErrorOpen}
              title="Pengajuan gagal"
              message={errorMessage ?? ""}
              variant="error"
              onClose={() => setErrorMessage(null)}
            />
            {successMessage && (
              <Container className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                <p className="text-lg font-semibold text-green-700">
                  {successMessage}
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    title="OK"
                    classname="px-6 py-2"
                    onClick={() => {
                      setSuccessMessage(null);
                      setFormData(initialFormData);
                    }}
                  />
                  <Button
                    title="Kembali"
                    classname="px-6 py-2"
                    onClick={() => navigate(-1)}
                  />
                </div>
              </Container>
            )}
            {loading && (
              <p className="text-sm text-gray-500">Memuat data ruangan...</p>
            )}
            {!successMessage && (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="bg-gray-100 p-5 lg:text-2xl md:text-2xl font-medium rounded-md flex flex-col gap-5 text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2">
                      <span>Nama Dosen</span>
                      <div className="border rounded-md p-2">
                        {user?.nama_lengkap || "-"}
                      </div>
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>NIP</span>
                      <div className="border rounded-md p-2">
                        {user?.username || "-"}
                      </div>
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Fakultas / Unit</span>
                      <div className="border rounded-md p-2">
                        {user?.nama_fakultas || "-"}
                      </div>
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Email Institusi</span>
                      <div className="border rounded-md p-2">
                        {user?.email_upnvj || "-"}
                      </div>
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Nomor Telepon/WhatsApp</span>
                      <input
                        className="border rounded-md p-2"
                        type="tel"
                        name="nomor_telepon"
                        value={formData.nomor_telepon}
                        onChange={handleInputChange}
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
                        name="nama_kegiatan"
                        value={formData.nama_kegiatan}
                        onChange={handleInputChange}
                        placeholder="Nama kegiatan"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Jenis Kegiatan</span>
                      <select
                        className="border rounded-md p-2"
                        name="jenis_kegiatan"
                        value={formData.jenis_kegiatan}
                        onChange={handleInputChange}
                      >
                        <option value="">Pilih jenis kegiatan</option>
                        <option value="PERKULIAHAN">Perkuliahan</option>
                        <option value="PRAKTIKUM">Praktikum</option>
                        <option value="PENELITIAN">Penelitian</option>
                        <option value="SIDANG_SKRIPSI">Sidang Skripsi</option>
                        <option value="LAINNYA">Lainnya</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Ruangan yang Dipinjam</span>
                      <input
                        className="border rounded-md p-2"
                        type="text"
                        placeholder="Nama laboratorium"
                        defaultValue={ruangan?.nama_ruangan}
                        readOnly
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Tanggal Peminjaman</span>
                      <input
                        className="border rounded-md p-2"
                        type="date"
                        name="tanggal_peminjaman"
                        value={formData.tanggal_peminjaman}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </label>
                    <WibTimePicker
                      label="Waktu Mulai"
                      name="waktu_mulai"
                      value={formData.waktu_mulai}
                      onChange={handleTimeChange}
                      minTime={minTime}
                      maxTime={maxTime}
                    />
                    <WibTimePicker
                      label="Waktu Selesai"
                      name="waktu_selesai"
                      value={formData.waktu_selesai}
                      onChange={handleTimeChange}
                      minTime={minTime}
                      maxTime={maxTime}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2">
                      <span>Jumlah Mahasiswa/Peserta</span>
                      <input
                        className="border rounded-md p-2"
                        type="number"
                        name="jumlah_peserta"
                        value={formData.jumlah_peserta}
                        onChange={handleInputChange}
                        min="1"
                        max={ruangan?.kapasitas}
                        placeholder="Jumlah peserta"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Mata Kuliah (jika relevan)</span>
                      <input
                        className="border rounded-md p-2"
                        type="text"
                        name="mata_kuliah"
                        value={formData.mata_kuliah}
                        onChange={handleInputChange}
                        placeholder="Nama mata kuliah"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Kebutuhan Peralatan Tambahan (Opsional)</span>
                      <textarea
                        className="border rounded-md p-2"
                        name="kebutuhan_alat"
                        value={formData.kebutuhan_alat}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Tuliskan kebutuhan peralatan"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span>Keterangan Tambahan (Opsional)</span>
                      <textarea
                        className="border rounded-md p-2"
                        name="keterangan_tambahan"
                        value={formData.keterangan_tambahan}
                        onChange={handleInputChange}
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
                        required
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
                        required
                      />
                      <span>
                        Bertanggung jawab atas fasilitas selama peminjaman
                      </span>
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  title={isSubmitting ? "Mengirim..." : "Submit"}
                  classname="lg:text-2xl md:text-2xl w-full py-3"
                />
              </form>
            )}
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
          <Dialog
            isOpen={isErrorOpen}
            title="Pengajuan gagal"
            message={errorMessage ?? ""}
            variant="error"
            onClose={() => setErrorMessage(null)}
          />
          {successMessage && (
            <Container className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
              <p className="text-lg font-semibold text-green-700">
                {successMessage}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  title="OK"
                  classname="px-6 py-2"
                  onClick={() => {
                    setSuccessMessage(null);
                    setFormData(initialFormData);
                  }}
                />
                <Button
                  title="Kembali"
                  classname="px-6 py-2"
                  onClick={() => navigate(-1)}
                />
              </div>
            </Container>
          )}
          {loading && (
            <p className="text-sm text-gray-500">Memuat data ruangan...</p>
          )}
          {!successMessage && (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
                    <div className="border rounded-md p-2">
                      {user?.username}
                    </div>
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
                      name="nomor_telepon"
                      value={formData.nomor_telepon}
                      onChange={handleInputChange}
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
                      name="nama_kegiatan"
                      value={formData.nama_kegiatan}
                      onChange={handleInputChange}
                      placeholder="Nama kegiatan"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Jenis Kegiatan</span>
                    <select
                      className="border rounded-md p-2"
                      name="jenis_kegiatan"
                      value={formData.jenis_kegiatan}
                      onChange={handleInputChange}
                    >
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
                      readOnly
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Tanggal Peminjaman</span>
                    <input
                      className="border rounded-md p-2"
                      type="date"
                      name="tanggal_peminjaman"
                      value={formData.tanggal_peminjaman}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </label>
                  <WibTimePicker
                    label="Waktu Mulai"
                    name="waktu_mulai"
                    value={formData.waktu_mulai}
                    onChange={handleTimeChange}
                    minTime={minTime}
                    maxTime={maxTime}
                  />
                  <WibTimePicker
                    label="Waktu Selesai"
                    name="waktu_selesai"
                    value={formData.waktu_selesai}
                    onChange={handleTimeChange}
                    minTime={minTime}
                    maxTime={maxTime}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2">
                    <span>Dosen Penanggung Jawab</span>
                    <input
                      className="border rounded-md p-2"
                      type="text"
                      name="dosen_penanggung_jawab"
                      value={formData.dosen_penanggung_jawab}
                      onChange={handleInputChange}
                      placeholder="Nama dosen"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Upload Surat Permohonan (jika diminta)</span>
                    <input
                      className="border rounded-md p-2"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Jumlah Peserta</span>
                    <input
                      className="border rounded-md p-2"
                      type="number"
                      name="jumlah_peserta"
                      value={formData.jumlah_peserta}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="Jumlah peserta"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Mata Kuliah (jika relevan)</span>
                    <input
                      className="border rounded-md p-2"
                      type="text"
                      name="mata_kuliah"
                      value={formData.mata_kuliah}
                      onChange={handleInputChange}
                      placeholder="Nama mata kuliah"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span>Kebutuhan Tambahan (Opsional)</span>
                    <textarea
                      className="border rounded-md p-2"
                      name="kebutuhan_alat"
                      value={formData.kebutuhan_alat}
                      onChange={handleInputChange}
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
                      required
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
                      required
                    />
                    <span>
                      Bertanggung jawab atas fasilitas selama peminjaman
                    </span>
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                title={isSubmitting ? "Mengirim..." : "Submit"}
                classname="lg:text-2xl md:text-2xl w-full py-3"
              />
            </form>
          )}
        </Container>
      </div>
    </div>
  );
}

export default ReservingForm;
