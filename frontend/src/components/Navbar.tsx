import assets from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBars, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItems'
import Cookies from 'js-cookie'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import cn from 'clsx'

type NavbarProps = {
  className?: string
}

function Navbar({ className }: NavbarProps) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { setIsAuthenticated } = authContext;

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    setIsAuthenticated(false);

    navigate('/login', { replace: true })
  }

  return (
    <nav className={cn('flex flex-row justify-between items-center w-full bg-white lg:px-10 lg:py-5 md:px-7 md:py-3 px-5 py-2', className)}>
        <div className='lg:w-1/8 md:w-1/7 w-1/6'>
            <img src={assets.upnvjLogoWithName} className='object-cover' />
        </div>
        <div className='flex flex-row lg:text-2xl md:text-xl text-xs h-full text-black items-center'>
            <Link to={'/home'} className='lg:px-5 lg:py-4 md:px-4 md:py-3 px-2 py-1 hover:text-white font-medium hover:bg-(--primary-color) duration-300'>Home</Link>
            <Link to={'/ruangan'} className='lg:px-5 lg:py-4 md:px-4 md:py-3 px-2 py-1 hover:text-white font-medium hover:bg-(--primary-color) duration-300'>Ruangan</Link>
            <Link to={'/fasilitas'} className='lg:px-5 lg:py-4 md:px-4 md:py-3 px-2 py-1 hover:text-white font-medium hover:bg-(--primary-color) duration-300'>Fasilitas</Link>
            <Link to={'/notifikasi'}>
              <div className='lg:text-3xl md:text-2xl text-md lg:ml-20 md:ml-12 ml-7 hover:cursor-pointer hover:text-(--primary-color) duration-300'><FontAwesomeIcon icon={faBell} /></div>
            </Link>
            <Dropdown trigger={<div className='lg:text-3xl md:text-2xl text-md lg:ml-10 md:ml-7 ml-4 hover:cursor-pointer hover:text-(--primary-color) duration-300'><FontAwesomeIcon icon={faBars} /></div>}>
              <DropdownItem>
                <FontAwesomeIcon icon={faUser} />
                <div className=''>Profile</div>
              </DropdownItem>
              <DropdownItem callbackFn={logout}>
                <FontAwesomeIcon icon={faPowerOff} />
                <div className=''>Logout</div>
              </DropdownItem>
            </Dropdown>

        </div>
    </nav>
  )
}

export default Navbar