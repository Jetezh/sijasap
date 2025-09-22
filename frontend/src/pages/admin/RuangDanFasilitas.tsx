import Button from "../../components/Button"
import Container from "../../components/Container"


function RuangDanFasilitas() {
  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <div>
        <h1>Daftar Ruangan</h1>
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