import assets from "../../assets/assets";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { dataPinjamTesting as dataUserTesting } from "../../lib/dataTesting";

function ReservingForm() {
  return (
    <div className="flex flex-col gap-5">
      <section className="w-full lg:[height:calc(50vh-7rem)] md:h-96 h-60 p-0 relative">
            <img src={assets.gedungFIK} alt="Foto Ruangan" className="w-full h-full object-cover" />
            <h1 className="absolute bottom-4 left-4 text-white font-bold lg:text-5xl md:text-3xl text-xl">Nama Ruangan</h1>
        </section>
        <Container className="max-w-[50%]">
          <h1 className="lg:text-3xl md:text-2xl font-bold">Formulir Peminjaman</h1>
          <form>
            <div className="bg-gray-100 p-5 lg:text-2xl mg:text-2xl font-medium rounded-md flex flex-col gap-3 text-left">
              <div className="flex flex-row gap-5">
                <p className="flex-1">Nama:</p>
                <span className="flex-1">{dataUserTesting["nama"]}</span>
                <p className="flex-1">NIM:</p>
                <span className="flex-1">{dataUserTesting["nim"]}</span>
              </div>
              <div className="flex flex-row gap-5">
                <p className="flex-1">Program Studi:</p><span className="flex-1">{dataUserTesting["program studi"]}</span>
                <p className="flex-1">Semester:</p><span className="flex-1">{dataUserTesting["semester"]}</span>
              </div>
              <p>Email: </p>
            </div>
            <Button title="Submit" classname="lg:text-2xl md:text-2xl w-full py-3" />
          </form>
        </Container>
    </div>
  )
}

export default ReservingForm