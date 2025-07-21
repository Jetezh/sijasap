import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback } from "react";
import assets from "../assets/assets";

function Caraousal({ slides }: {slides: {img: string, alt: string}[]}) {
    const [ current, setCurrent ] = useState(0);

    const prevSlide = () => {
        return current === 0 ? setCurrent(slides.length - 1) : setCurrent(current - 1);
    }

    const nextSlide = useCallback(() => {
        setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
      }, [slides.length]);
      
    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [nextSlide]);

  return (
    <div className="overflow-hidden relative lg:[height:calc(100vh-7rem)] md:h-96 h-60">
        <div className="flex transition h-full ease-out duration-500" style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${current * (100 / slides.length)}%)`   
        }}>
            {slides.map( (s, i) => {
                return <img 
                key={i} 
                src={s.img} 
                alt={s.alt} 
                className="object-cover h-full"
                loading="lazy"
                style={{ width: `${100 / slides.length}%` }}
                 />
            })}
        </div>
        <div className="absolute h-full w-full top-0 flex flex-row justify-between items-center lg:text-3xl md:text-xl text-sm lg:px-10 md:px-7 px-3 z-10">
            <button onClick={prevSlide} className="hover:cursor-pointer rounded-full bg-white hover:bg-(--gray-color) lg:px-10 lg:py-8 md:px-6 md:py-4 px-2 py-0.5 duration-300">
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button onClick={nextSlide} className="hover:cursor-pointer rounded-full bg-white hover:bg-(--gray-color) lg:px-10 lg:py-8 md:px-6 md:py-4 px-2 py-0.5 duration-300">
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
        <div className="absolute w-full h-full flex items-center top-0 justify-center lg:text-5xl md:text-2xl text-md text-white font-bold lg:px-0 md:px-0 px-6">
            <h1>SIJASAP<br />Sistem Informasi Peminjaman Sarana dan Prasarana</h1>
        </div>
        <div className="absolute bottom-0 flex justify-center w-full lg:py-5 md:py-3 py-1 lg:gap-3 md:gap-2 gap-1">
            {
                slides.map((s, i) => {
                    return <div 
                    onClick={() => setCurrent(i)}
                    key={"circle" + i} 
                    className={`rounded-full lg:w-7 lg:h-7 md:w-5 md:h-5 w-2.5 h-2.5 lg:border-4 md:border-3 border-2 border-white hover:cursor-pointer z-11 ${i === current ? "bg-white" : "bg-transparent"}`}></div>
                })
            }
        </div>
        <div>
            <img src={assets.badgeUPNVJ} />
            <img src={assets.badgeTutwuri} />
            <img src={assets.badgeBLU} />
        </div>
    </div>
  )
}

export default Caraousal