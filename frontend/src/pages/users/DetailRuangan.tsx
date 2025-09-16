import Button from "../../components/Button"
import assets from "../../assets/assets"

function DetailRuangan() {
  return (
    <div className="flex flex-col lg:gap-5 md:gap-3 gap-4 bg-white">
        <section className="w-full lg:[height:calc(50vh-7rem)] md:h-96 h-60 p-0 relative">
            <img src={assets.gedungFIK} alt="Foto Ruangan" className="w-full h-full object-cover" />
            <h1 className="absolute bottom-4 left-4 text-white font-bold lg:text-5xl md:text-3xl text-xl">Nama Ruangan</h1>
            <Button title="Pinjam Ruangan" classname="absolute bottom-4 right-4 lg:py-4 lg:px-10 md:py-3 md:px-7 py-2 px-5" />
        </section>
        <section className="flex lg:flex-row md:flex-row flex-col lg:gap-10 md:gap-7 gap-5 lg:px-5 md:px-2 px-4">
            <div className="flex flex-col basis-1/2 gap-5 ">
                <div>
                    <img src={assets.fiklab301} alt="Foto Ruangan" className="w-full h-full object-cover" />
                    <div>
                        {

                        }
                    </div>
                </div>
                <div className="flex flex-row">
                        <div className="flex flex-col basis-1/4">
                            <h1>Kategori</h1>
                            <div className="bg-gray-200 border-1 py-5">asdasd</div>
                        </div>
                        <div className="flex flex-col basis-1/4">
                            <h1>Lokasi</h1>
                            <div className="bg-gray-200 border-1 py-5">asdasda</div>
                        </div>
                        <div className="flex flex-col basis-1/4">
                            <h1>Lantai</h1>
                            <div className="bg-gray-200 border-1 py-5">asdasda</div>
                        </div>
                        <div className="flex flex-col basis-1/4">
                            <h1>Kapasitas</h1>
                            <div className="bg-gray-200 border-1 py-5">asdasd</div>
                        </div>
                </div>
                <div>

                </div>
            </div>
            <div className="basis-1/2">
                <h1 className="text-2xl text-left">Ruangan ini telah direservasi pada:</h1>
            </div>
        </section>
    </div>
  )
}

export default DetailRuangan