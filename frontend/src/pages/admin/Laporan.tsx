import Button from "../../components/Button"
import Container from "../../components/Container"


function Laporan() {
  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <h1>Laporan</h1>
      <Container>
        <div>

        </div>
        <div className="flex flex-row gap-2 justify-center">
          <Button title="Word" classname="lg:text-xl md:text-xl lg:py-3 w-30" />
          <Button title="Excel" classname="lg:text-xl md:text-xl lg:py-3 w-30" />
          <Button title="PDF" classname="lg:text-xl md:text-xl lg:py-3 w-30" />
        </div>
      </Container>
    </div>
  )
}

export default Laporan