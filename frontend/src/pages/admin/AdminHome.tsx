import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import RequestCard from "../../components/RequestCard";

const dataWeek = [
  { hari: 'Monday', value: 4000 },
  { hari: 'Tuesday', value: 3000 },
  { hari: 'Wednesday', value: 2000 },
  { hari: 'Thursday', value: 2780 },
  { hari: 'Friday', value: 1890 },
]

// const dataMonth = [
//   { name: 'January', value: 4000 },
//   { name: 'February', value: 3000 },
//   { name: 'March', value: 2000 },
//   { name: 'April', value: 2780 },
//   { name: 'May', value: 1890 },
//   { name: 'June', value: 2390 },
//   { name: 'July', value: 3490 },
//   { name: 'August', value: 2000 },
//   { name: 'September', value: 2780 },
//   { name: 'October', value: 1890 },
//   { name: 'November', value: 2390 },
//   { name: 'December', value: 3490 },
// ]

function AdminHome() {
  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <section className="">
        <h1 className="font-bold lg:text-3xl">Permintaan Peminjaman</h1>
        <Container className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <RequestCard />
          </div>
          <Button classname="lg:text-2xl md:text-2xl lg:py-3 w-70 mx-auto">Tampilkan Semua</Button>
        </Container>
      </section>
      <section className="flex flex-row gap-5">
        <div className="flex flex-col gap-5 flex-1/2">
            <Container className="flex flex-col">
              <div className="flex flex-row gap-4 md:text-2xl text-left">
                <FontAwesomeIcon icon={faChartColumn} />
                <h1 className="font-medium">Frekuensi Peminjaman</h1>
              </div>
              <div className="flex flex-row flex-start gap-5">
                <Button classname="lg:text-xl md:text-lg px-8 py-2">Minggu ini</Button>
                <Button classname="lg:text-xl md:text-lg px-8" >Button</Button>
              </div>
              <div className="h-80 bg-gray-200 rounded-md justify-center items-end flex">
                <ResponsiveContainer width="90%" height="90%">
                  <BarChart width={500} height={400} data={dataWeek}>
                    <XAxis dataKey="hari" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#008549" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Container>
            <Container>
              <h1 className="font-medium md:text-2xl text-left">Status Peminjaman</h1>

            </Container>
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