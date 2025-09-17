import React from 'react';
import { LeftSidebar, SidebarItem } from '../../components/Sidebar';
import Cookies from 'js-cookie';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faCalendarDays, faFile, faPersonShelter, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard: React.FC = () => {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { setIsAuthenticated } = authContext;
  const [ isModalOpen, setIsModalOpen ] = React.useState(false);

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    setIsAuthenticated(false);

    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <LeftSidebar title='Fakultas Ilmu Komputer'>
        <Link to={"home"}><SidebarItem className='flex gap-4 items-center'><FontAwesomeIcon icon={faHouse} />Home</SidebarItem></Link>
        <Link to={"profile"}><SidebarItem className='flex gap-6 items-center'><FontAwesomeIcon icon={faUser} />Profile</SidebarItem></Link>
        <Link to={"kalender-akademik"}><SidebarItem className='flex gap-6 items-center'><FontAwesomeIcon icon={faCalendarDays} />Kalender Akademik</SidebarItem></Link>
        <Link to={"laporan"}><SidebarItem className='flex gap-7 items-center'><FontAwesomeIcon icon={faFile} />Laporan</SidebarItem></Link>
        <Link to={"ruang-fasilitas"}><SidebarItem className='flex gap-5 items-center'><FontAwesomeIcon icon={faPersonShelter} />Ruang & Fasilitas</SidebarItem></Link>
        <SidebarItem className='flex gap-5 items-center' onClick={() => setIsModalOpen(true)}><FontAwesomeIcon icon={faArrowRightFromBracket} />Log out</SidebarItem>
        <Modal isOpen={isModalOpen}>
          <h1>Apakah kamu ingin keluar?</h1>
          <div className='flex flex-row gap-4'>
            <button onClick={logout} className="bg-(--red-button) hover:bg-(--red-button-hover) text-white px-4 py-2 rounded-md basis-1/2 hover:cursor-pointer duration-300">Ya</button>
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md basis-1/2 hover:cursor-pointer duration-300">Tidak</button>
          </div>
        </Modal>
      </LeftSidebar>
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard; 