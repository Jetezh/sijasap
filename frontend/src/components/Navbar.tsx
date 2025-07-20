import assets from '../assets/assets'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <nav className='flex flex-row justify-between items-center w-full bg-white lg:px-10 lg:py-5 md:px-7 md:py-3 px-5 py-2'>
        <div className='lg:w-1/6 md:w-1/6 w-1/5 h-full'>
            <img src={assets.upnvjLogoWithName} className='object-cover' />
        </div>
        <div className='flex flex-row lg:text-2xl md:text-xl text-sm text-black items-center'>
            <Link to={'/home'} className='lg:px-5 lg:py-4 md:px-4 md:py-3 px-2 py-1 hover:text-white font-medium hover:bg-(--primary-color) duration-300'>Home</Link>
            <Link to={'/ruangan'} className='lg:px-5 lg:py-4 md:px-4 md:py-3 px-2 py-1 hover:text-white font-medium hover:bg-(--primary-color) duration-300'>Ruangan</Link>
            <Link to={'/fasilitas'} className='lg:px-5 lg:py-4 md:px-4 md:py-3 px-2 py-1 hover:text-white font-medium hover:bg-(--primary-color) duration-300'>Fasilitas</Link>
            <div className='lg:text-3xl md:text-2xl text-md lg:ml-20 md:ml-12 ml-7 hover:cursor-pointer hover:text-(--primary-color) duration-300'><FontAwesomeIcon icon={faBell} /></div>
            <div className='lg:text-3xl md:text-2xl text-md lg:ml-10 md:ml-12 ml-7 hover:cursor-pointer hover:text-(--primary-color) duration-300'><FontAwesomeIcon icon={faUser} /></div>
        </div>
    </nav>
  )
}

export default Navbar