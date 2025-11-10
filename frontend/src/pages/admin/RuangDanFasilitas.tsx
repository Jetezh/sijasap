import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../components/Button"
import Container from "../../components/Container"
import { faBuilding } from "@fortawesome/free-solid-svg-icons"
import api from "../../services/api"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import FasilitasCard from "../../components/FasilitasCard"
import RoomCardAdmin from "../../components/RoomCardAdmin"

function RuangDanFasilitas() {

  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  const [ ruangan, setRuangan ] = useState([]);
  const [ fasilitas, setFasilitas ] = useState([]);

  useEffect(() => {
    if(!isAuthenticated) return;

    const fetchRuangan = async () => {

      try{
          const response = await api.get('/api/ruangan');
          
          if(response.data?.success && response.data?.ruangan){
            setRuangan(response.data.ruangan);
            console.log(response.data.ruangan)
          } else {
            throw new Error('Invalid response format');
          }

      } catch(err) {
        console.error('Error fetching user data:', err);
      }
    }

    fetchRuangan();

    const fetchDataFasilitas = async () => {
      try{
        const response = await api.get('/api/fasilitas');

        if(response.data?.success && response.data?.fasilitas) {
          setFasilitas(response.data.fasilitas);
        } else {
          throw new Error('Invalid response format');
        }
      } catch(err) {
        console.error('Error fetching user data:', err);
      }
    }

    fetchDataFasilitas();
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
            <div className="font-bold">{ruangan.length}</div>
            <p className="lg:text-2xl text-gray-400">Total Ruang</p>
          </Container>
          <Container className="flex-1 justify-center items-center lg:text-5xl font-medium gap-5 flex py-10">
            <DotLottieReact
              className="w-15 h-15"
              src="https://lottie.host/ebb80b0e-b548-4672-890a-9fb9bec7d059/GdboYuhJkv.lottie"
              loop
              autoplay
            />
            <div className="font-bold text-">{0}</div>
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
      </div>
      <div className="flex flex-col gap-15" >
        <h1 className="font-bold lg:text-5xl text-left">Daftar Ruangan</h1>
          <Container>
            <div className="flex flex-row">
              <input type="text" className="mx-auto bg-gray-100 rounded-md px-5 py-3 lg:text-2xl md:text-xl" placeholder="Search..." />
              <Button title="Add" classname="lg:text-2xl md:text-2xl w-30"/>
            </div>
          </Container>
          <div className="grid grid-cols-2 gap-5">
            {
              ruangan.map((s, i) => {
                return <RoomCardAdmin className="" {...s} key={'ruangan' + i} />
              })
            }
          </div>
      </div>
      <div className="flex flex-col gap-15">
        <h1 className="font-bold lg:text-5xl text-left">Daftar Fasilitas</h1>
        <div className="flex flex-col gap-10">
          <Container>
            <div className="flex flex-row">
              <input type="text" className="mx-auto bg-gray-100 rounded-md px-5 py-3 lg:text-2xl md:text-xl" placeholder="Search..." />
              <Button title="Add" classname="lg:text-2xl md:text-2xl w-30"/>
            </div>
          </Container>
          <div className="grid grid-cols-3 gap-5">
            {
              fasilitas.map((s, i) => {
                return <FasilitasCard className="lg:basis-1/3 " {...s} key={'fasilitas' + i} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default RuangDanFasilitas