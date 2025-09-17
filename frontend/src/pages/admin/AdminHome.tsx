function AdminHome() {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1>Permintaan Peminjaman</h1>
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