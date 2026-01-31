import Container from "./Container";
import Tag from "./Tag";
import Button from "./Button";
import { FaCalendarDays, FaClock, FaCircleUser, FaLocationDot, FaCheck } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdMessage, MdOutlineSupervisorAccount, MdGroups } from "react-icons/md";
import { GoNote } from "react-icons/go";

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
    lokasi: string;
    keterangan: string;
    jumlah_peserta: string;
    Supervisor: string;
    jenis_kegiatan: string;
}

function RequestCard(props: RequestCardProps) {
    const { submittedAt, status, title, tanggal, jam, role, nama_lengkap, nama_fakultas, nomor_telepon, lokasi, keterangan, Supervisor, jumlah_peserta, jenis_kegiatan } = props;

  return (
    <Container className="p-0">
        <div className="flex flex-col">
            <div className="flex flex-row gap-2 justify-between text-xl font-semibold border-b-2 border-gray-300 p-5">
                <p>submited: {submittedAt ?? "2 jam lalu"}</p>
                <p>{status ?? "diproses"}</p>
            </div>
            <div className="flex text-left flex-row gap-5 px-5 py-5">
                <Container className="basis-1/2 flex flex-col gap-3 py-3">
                    <p className="text-xl font-medium">Data Peminjam</p>
                    <div className="flex flex-row gap-4">
                        {/* if there is a picture, use the image tag */}
                        {/* <img src="" alt="" width={100} height={100} className="" /> */}
                        <div className="flex items-center">
                            <FaCircleUser className="text-8xl" />
                        </div>
                        <div className="text-2xl font-medium">
                            <div className="flex flex-row gap-3">
                                {nama_lengkap ?? "nama lengkap"} 
                                <Tag title={role ?? "role"} />
                                {/* NOTE: this is background color for Tag Component */}
                                {/* classname={`${role.toLowerCase() === "dosen" ? "bg-(--primary-color)" : "bg-(--secondary-color)"}`} */}
                            </div>
                            <div className="text-gray-400 font-normal">{nama_fakultas ?? "nama fakultas"}</div>
                            <div className="flex flex-row gap-3 items-center">
                                <BsFillTelephoneFill />
                                {nomor_telepon ? ("+62" + nomor_telepon) : "+62 82xxxxxxx"}
                            </div>
                        </div>
                    </div>
                </Container>
                <div className="flex basis-1/2 flex-col gap-3 py-3">
                    <h1 className="text-3xl text-left font-bold">{title ?? "Judul Peminjaman"}</h1>
                    <div className="flex flex-row items-center text-2xl gap-2 font-medium">
                        <FaCalendarDays />
                        {tanggal ?? "Senin, 25 Januari 2026"}
                    </div>
                    <div className="flex flex-row items-center text-2xl gap-2 font-medium">
                        <FaClock />
                        {jam ?? "07:00 - 09:00"}
                    </div>
                    <div className="flex flex-row items-center text-2xl gap-2 font-medium">
                        <FaLocationDot />
                        {lokasi ?? "Gedung FIK"}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-5 justify-between px-5 pb-5">
            <h1 className="text-2xl font-semibold text-left">Detail</h1>
            <div className="flex flex-row gap-5">
                <div className="basis-1/2 flex flex-col gap-5">
                    <div className="flex flex-row gap-2">
                        <MdOutlineSupervisorAccount className="text-3xl" />
                        <div className="flex flex-col text-left gap-1 text-2xl font-medium">
                            <p className="text-xl font-medium text-gray-400">Supervisor</p>
                            {Supervisor ?? "Pak juryantono"}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <MdGroups className="text-3xl" />
                        <div className="flex flex-col text-left gap-1 text-2xl font-medium">
                            <p className="text-xl font-medium text-gray-400">Partisipan</p>
                            {jumlah_peserta ?? "40 orang"}
                        </div>
                    </div>
                </div>
                <div className="basis-1/2">
                    <div>
                        <div>
                            <p>Jenis Kegiatan</p>
                            {jenis_kegiatan ?? "Perkuliahan"}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-2 items-center">
                            <GoNote className="text-3xl text-black" />
                            <p className="text-xl font-medium text-gray-400">Keterangan</p>
                        </div>
                        <div>
                            <Container className="p-2 text-xl text-justify">
                                {keterangan ?? "Keterangan"}
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-row gap-5 justify-between p-5 border-t-2 border-gray-300">
            <div className="flex flex-row gap-5">
                <Button classname="text-2xl px-5 py-3 flex flex-row gap-2 items-center">X Tolak</Button>
                <Button classname="text-2xl px-5 py-3 flex flex-row gap-2 items-center"><MdMessage /> Kirim Pesan</Button>
            </div>
            <Button classname="text-2xl px-5 py-3 flex flex-row gap-2 items-center"><FaCheck /> Setujui</Button>
        </div>
    </Container>
  )
}

export default RequestCard