import Container from "../../components/Container"


function KalenderAkademik() {
  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <div>
        <h1>Kalender Akademik</h1>
        <Container>

        </Container>
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex-1">
          <h1>Hari Libur</h1>
          <Container>

          </Container>
        </div>
        <div className="flex-1">
          <h1>Acara dan Kegiatan</h1>
          <Container>

          </Container>
        </div>
      </div>
    </div>
  )
}

export default KalenderAkademik