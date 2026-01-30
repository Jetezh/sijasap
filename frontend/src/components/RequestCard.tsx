import Container from "./Container";
import Tag from "./Tag";
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";


type RequestCardProps = {
    submittedAt: string;
    title: string;
    tanggal: string;
    jam: string;
    status: string;
    role: string;
    nama_lengkap: string;
    nama_fakultas: string;
    nomor_telepon: string;
}

function RequestCard(props: RequestCardProps) {
    const { submittedAt, status, title, tanggal, jam, role, nama_lengkap, nama_fakultas, nomor_telepon } = props;

  return (
    <Container className="p-0">
        <div className="flex flex-col">
            <div className="flex flex-row gap-2 justify-between text-xl font-semibold border-b-2 border-gray-300 px-5 py-5">
                <p>submited {submittedAt ?? "N/A"}</p>
                <p>{status ?? "N/A"}</p>
            </div>
            <div className="flex text-left flex-row gap-3 px-5 py-5">
                <div className="basis-1/2">
                    <p className="text-xl font-medium">Data Peminjam</p>
                    <div className="flex flex-row gap-2">
                        <img src="" alt="" width={100} height={100} className="" />
                        <div className="text-2xl font-medium">
                            <div className="flex flex-row gap-3">
                                {nama_lengkap ?? "nama lengkap"} 
                                <Tag title={role ?? "role"} />
                            </div>
                            <div className="text-gray-400 font-normal">{nama_fakultas ?? "nama fakultas"}</div>
                            <div className="flex flex-row gap-3 items-center">
                                <BsFillTelephoneFill />
                                {nomor_telepon ?? "nomor telepon"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex basis-1/2 flex-col gap-3 px-5 py-3">
                    <h1 className="text-3xl text-left font-bold">{title ?? "Judul Peminjaman"}</h1>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-row items-center text-2xl gap-2 font-medium">
                            <FaCalendarDays />
                            {tanggal ?? "N/A"}
                        </div>
                        <div className="flex flex-row items-center text-2xl gap-2 font-medium">
                            <FaClock />
                            {jam ?? "N/A"}
                        </div>
                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
        </div>
        <div>

        </div>
    </Container>
  )
}

export default RequestCard