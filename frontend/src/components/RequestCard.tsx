import Container from "./Container";
import { FaCalendarDays, FaClock } from "react-icons/fa6";


type RequestCardProps = {
    submittedAt: string;
    title: string;
    tanggal: string;
    jam: string;
    status: string;
    room: string;
    user: string;
    action: string;
    role: string;
}

function RequestCard(props: RequestCardProps) {
    const { submittedAt, status, title, tanggal, jam, role, room, user, action } = props;

  return (
    <Container className="p-0">
        <div className="flex flex-col">
            <div className="flex flex-row gap-2 justify-between text-xl font-semibold border-b-2 border-gray-300 px-5 py-3">
                <p>submited {submittedAt ?? "N/A"}</p>
                <p>{status ?? "N/A"}</p>
            </div>
            <div>
                <div className="">
                    <p>Data Peminjam {role ?? "user"}</p>
                </div>
                <div className="flex flex-col gap-3 px-5 py-3">
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