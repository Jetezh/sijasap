import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../components/Button"
import Container from "../../components/Container"
import { faBuilding } from "@fortawesome/free-solid-svg-icons"
import api from "../../services/api"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function RuangDanFasilitas() {

  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  const [ totalRuangan, setTotalRuangan ] = useState<number>(0);

  useEffect(() => {
    const fetchTotalRuangan = async () => {

      if(!isAuthenticated) return;

      try{
          const response = await api.get('/api/ruangan');
          
          if(response.data?.success && response.data?.total_ruangan){
            setTotalRuangan(response.data.total_ruangan);
          } else {
            throw new Error('Invalid response format')
          }

      }catch(err) {
        console.error('Error fetching user data:', err);
      }
    }

    fetchTotalRuangan();
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col gap-15 px-15 py-15">
      <div className="flex flex-col gap-15">
        <div className="flex flex-col text-left gap-3">
          <h1 className="font-bold lg:text-5xl">Daftar Ruangan</h1>
          <p className="md:text-2xl">Kelola Ruang dan Fasilitas</p>
        </div>
        <div className="flex flex-row justify-between gap-15">
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
            <FontAwesomeIcon icon={faBuilding} className="text-(--primary-color) lg:text-5xl" />
            <div className="font-bold">{totalRuangan}</div>
            <p className="lg:text-2xl text-gray-400">Total Ruang</p>
          </Container>
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
            <DotLottieReact
              className="w-15 h-15"
              src="https://lottie.host/ebb80b0e-b548-4672-890a-9fb9bec7d059/GdboYuhJkv.lottie"
              loop
              autoplay
            />
            {0}
            <p className="lg:text-2xl text-gray-400">Tersedia</p>
          </Container>
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
          <DotLottieReact
              className="w-15 h-15"
              src="https://lottie.host/b6054b81-151c-4bdf-9f81-824695882e55/NEEK380pwb.lottie"
              loop
              autoplay
            />
            {0}
            <p className="lg:text-2xl text-gray-400">Terpakai</p>
          </Container>
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
          <DotLottieReact
              className="w-15 h-15"
              src="https://lottie.host/bddb8cc7-0ca2-4f21-855d-9e1d835cb554/bJ3L5VRpFk.lottie"
              loop
              autoplay
            />
            {0}
            <p className="lg:text-2xl text-gray-400">Maintenance</p>
          </Container>
        </div>
        <Container>
          <div className="flex flex-row">
            <input type="text" className="mx-auto bg-gray-100 rounded-md px-5 py-3 lg:text-2xl md:text-xl" placeholder="Search..." />
            <Button title="Add" classname="lg:text-2xl md:text-2xl w-30"/>
          </div>
        </Container>
      </div>
      <div className="flex flex-col gap-15" >
        <h1 className="font-bold lg:text-5xl text-left">Detail Ruangan</h1>
        <Container>
          <div className="flex flex-row justify-between">
            <Button title="Delete" classname="lg:text-2xl md:text-2xl w-40 py-3 bg-(--red-button) hover:bg-(--red-button-hover)"/>
            <Button title="Update" classname="lg:text-2xl md:text-2xl w-40 py-3 bg-(--blue-button) hover:bg-(--blue-button-hover)"/>
          </div>
          <div>

          </div>
        </Container>
      </div>
      <div className="flex flex-col gap-15">
        <h1 className="font-bold lg:text-5xl text-left">Daftar Fasilitas</h1>
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