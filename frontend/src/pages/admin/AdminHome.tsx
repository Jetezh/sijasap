import Button from "../../components/Button";
import Container from "../../components/Container";

const permintaanPeminjamanTest = {
    "nama": "Budi Santoso",
    "nim": "123456789",
    "program strudi": "S1 Informatika",
    "semester": "5",
    "email": "budi.santoso@mahasiswa.upnvj.ac.id",
    "tanggal": "2023-10-15",
    "waktu mulai": "10:00",
    "waktu selesai": "12:00",
    "Dosen Pembimbing": "Dr. Andi Wijaya",
    "Mata Kuliah": "Pemrograman Lanjut",
    "NIP/NIK Dosen Pembimbing": "987654321",
    "Tujuan Peminjaman": "Kelas PenggantiPraktikum Pemrograman",
}

function AdminHome() {
  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <section className="">
        <h1 className="font-bold lg:text-3xl">Permintaan Peminjaman</h1>
        <Container>
          <div>

          </div>
          <Button title="Tampilkan Semua" classname="lg:text-2xl md:text-2xl lg:py-3 w-70 mx-auto" />
        </Container>
      </section>
      <section className="flex flex-row gap-5">
        <div className="flex flex-col gap-5 flex-1/2">
          <div>
            <h1 className="font-bold lg:text-3xl">Frekuensi Peminjaman</h1>
            <Container>

            </Container>
          </div>
          <div>
            <h1 className="font-bold lg:text-3xl">Status Peminjaman</h1>
            <Container>

            </Container>
          </div>
        </div>
        <div className="flex flex-col flex-1/2">
          <h1 className="font-bold lg:text-3xl">Riwayat Peminjaman</h1>
          <Container>
            
          </Container>
        </div>
      </section>
    </div>
  )
}

export default AdminHome