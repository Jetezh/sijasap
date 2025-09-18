import Button from "../../components/Button"

function AdminHome() {
  return (
    <div className="flex flex-col gap-5 px-5 py-5 w-[100vw]">
      <section className="w-full">
        <h1>Permintaan Peminjaman</h1>
        <div className="flex flex-col bg-white p-3 rounded-md shadow-(--card-shadow) gap-5 mt-3">
          <div>

          </div>
          <Button title="Tampilkan Semua" />
        </div>
      </section>
      <section className="flex flex-row gap-5">
        <div className="flex flex-col gap-5">
          <div>
            <h1>Frekuensi Peminjaman</h1>
          </div>
          <div>
            <h1>Status Peminjaman</h1>
          </div>
        </div>
        <div>
          <h1>Riwayat Peminjaman</h1>
        </div>
      </section>
    </div>
  )
}

export default AdminHome