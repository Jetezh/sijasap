import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../components/Button"
import Container from "../../components/Container"
import { faBuilding } from "@fortawesome/free-solid-svg-icons"


function RuangDanFasilitas() {
  return (
    <div className="flex flex-col gap-15 px-15 py-15">
      <div>
        <div className="flex flex-col text-left gap-3">
          <h1 className="font-bold lg:text-5xl">Daftar Ruangan</h1>
          <p className="md:text-2xl">Kelola Ruang dan Fasilitas</p>
        </div>
        <div className="flex flex-row justify-between gap-15">
          <Container className="flex-1 lg:text-4xl font-medium gap-2 flex py-10">
            <FontAwesomeIcon icon={faBuilding} className="text-(--primary-color) lg:text-5xl" />
            {15}
            <p className="lg:text-2xl text-gray-400">Total Ruang</p>
          </Container>
          <Container className="flex-1">
            
            <p>Tersedia</p>
          </Container>
          <Container className="flex-1">
            <p>Terpakai</p>
          </Container>
          <Container className="flex-1">
            <p>Maintenance</p>
          </Container>
        </div>
        <Container>
          <div className="flex flex-row">
            <input type="text" className="mx-auto bg-gray-100 rounded-md px-5 py-3 lg:text-2xl md:text-xl" placeholder="Search..." />
            <Button title="Add" classname="lg:text-2xl md:text-2xl w-30"/>
          </div>
        </Container>
      </div>
      <div>
        <h1>Detail Ruangan</h1>
        <Container>
          <div className="flex flex-row justify-between">
            <Button title="Delete" classname="lg:text-2xl md:text-2xl w-40 py-3 bg-(--red-button) hover:bg-(--red-button-hover)"/>
            <Button title="Update" classname="lg:text-2xl md:text-2xl w-40 py-3 bg-(--blue-button) hover:bg-(--blue-button-hover)"/>
          </div>
          <div>

          </div>
        </Container>
      </div>
      <div>
        <h1>Daftar Fasilitas</h1>
        <Container>
          <div className="flex flex-row">
            <input type="text" className="mx-auto bg-gray-100 rounded-md px-5 py-3 lg:text-2xl md:text-xl" placeholder="Search..." />
            <Button title="Add" classname="lg:text-2xl md:text-2xl w-30"/>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default RuangDanFasilitas