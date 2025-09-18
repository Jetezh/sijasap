import React, { useState, useContext } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Alerts from '../components/Alerts';
import Modal from '../components/Modal';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  
  const { setIsAuthenticated, setUser } = authContext;

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ validation, setValidation ] = useState<{errors?: Array<{path: string, msg: string}>} | null>(null);
  const [ loginFailed, setLoginFailed ] = useState<{message?: string} | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/login', {
        username: username,
        password: password
      });

      Cookies.set('token', response.data.token);
      Cookies.set('user', JSON.stringify(response.data.user));

      setIsAuthenticated(true);
      // otentikasi user
      setUser(response.data.user);

      const role = response.data.user.role?.toUpperCase();
      if(role === "ADMIN") {
        navigate('/admin/home', { replace: true });
      } else if (role === "SUPERADMIN") {
        navigate('/superadmin/dashboard/home', { replace: true });
      } else if (role === "MAHASISWA" || role === "DOSEN") {
        navigate('/home', { replace: true });
      }
    } catch (err) {
      if(err && typeof err === "object" && "response in err") {
        const errorObj = err as { response?: {data?: any} };
        setValidation(errorObj.response?.data || null);
        setLoginFailed(errorObj.response?.data || { message: 'Login gagal. Tolong coba lagi.' });
      } else {
        setValidation(null);
        setLoginFailed({ message:'Login gagal. Tolong coba lagi.'});
      }
    }
  }

  const showPassword =() => {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    return passwordInput.type === 'password' ? passwordInput.type = 'text' : passwordInput.type = 'password';
  }

  return (
    <div className='flex flex-col w-full h-screen'>
      <header className='flex w-full lg:shadow-(--banner-shadow-lg) md:shadow-(--banner-shadow-md) shadow-(--banner-shadow) justify-center z-10'>
        <img src={assets.bannerUpnvj} alt='banner-upnvj.png' loading='lazy' className='object-cover'/>
      </header>
      <main className='flex lg:flex-row md:flex-col flex-col w-full lg:h-screen'>
        <div className='flex flex-col flex-1 gap-5 justify-center items-center p-10'>
          <div className='w-7/12'>
            <img src={assets.highSchoolAmico} className='object-cover' />
          </div>
          <p className='lg:text-5xl md:text-3xl text-2xl font-medium'>Selamat Datang di Sistem Informasi Peminjaman Sarana dan Prasarana</p>
        </div>
        <div className='w-full h-full flex flex-1 flex-col lg:gap-10 md:gap-7 gap-5 justify-center items-center lg:p-10 md:p-7 p-5'>
          <div className='flex flex-col shadow-(--card-shadow) lg:p-10 md:p-7 p-4 lg:min-w-2xl md:min-w-xl lg:rounded-lg md:rounded-md rounded-sm'>
            <form onSubmit={login} className='flex flex-col lg:gap-6 md:gap-5 gap-3'>
              <label className='lg:text-2xl md:text-xl text-md text-left text-gray-400'>Masukan username dan password UPNVJ anda:</label>
              {
                Array.isArray(validation?.errors) && validation?.errors && (
                  <Alerts>
                    {validation.errors.map((error, index) => (
                        <p key={index}>{error.path} : {error.msg}</p>
                      ))}
                  </Alerts>
                )
              }
              {
                loginFailed?.message && (
                  <Alerts>
                    {
                      loginFailed?.message
                    }
                  </Alerts>
                )
              }
              <input 
                type='text' 
                placeholder='username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='lg:text-3xl md:text-2xl text-lg bg-(--gray-color) lg:px-7 lg:py-5 md:px-6 md:py-3 px-4 py-2 lg:rounded-md rounded-sm'
              />
              <input 
                id='password'
                type='password' 
                placeholder='password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='lg:text-3xl md:text-2xl text-lg bg-(--gray-color) lg:px-7 lg:py-5 md:px-6 md:py-3 px-4 py-2 lg:rounded-md rounded-sm'
              />
              <label className='lg:text-2xl md:text-xl text-sm flex flex-row lg:gap-3 md:gap-2 gap-1 items-center hover:cursor-pointer'>
                <input type='checkbox' className='hover:cursor-pointer lg:w-7 lg:h-7 md:w-5 md:h-5 w-3 h-3 duration-300' onClick={showPassword} />
                Show Password
              </label>
              <button type='submit' className='lg:text-3xl md:text-2xl text-lg font-medium text-white lg:px-8 lg:py-5 md:px-6 md:py-4 px-4 py-2 lg:rounded-lg md:rounded-md rounded-sm bg-(--blue-button) hover:cursor-pointer hover:bg-(--blue-button-hover) duration-300'>Login</button>
            </form>
            <div className='w-full ring-gray-200 ring-1 lg:mt-10 md:mt-7 mt-5'></div>
            <a className='lg:text-2xl md:text-xl text-md text-(--link-color) hover:text-(--link-hover-color) hover:cursor-pointer lg:mt-8 md:mt-6 mt-4'>bantuan<i>(Help)</i></a>
          </div>
          <div>
            <button onClick={() => setIsModalOpen(true)} className='lg:text-3xl md:text-2xl text-lg text-white lg:px-8 lg:py-5 md:px-6 md:py-4 px-4 py-2 lg:rounded-lg md:rounded-md rounded-sm bg-(--red-button) hover:bg-(--red-button-hover) hover:cursor-pointer duration-300'>Ketentuan Peminjaman</button>
            <Modal isOpen={isModalOpen}>
              <h2>Ketentuan Peminjaman</h2>
              <p>Berikut adalah ketentuan peminjaman ruang:</p>
              <ul className='flex flex-col gap-2 list-decimal list-inside text-left'>
                <li>Peminjaman hanya untuk civitas akademika UPNVJ.</li>
                <li>Ruang yang dipinjam harus sesuai dengan kebutuhan.</li>
                <li>Peminjam bertanggung jawab atas kebersihan ruang.</li>
              </ul>
              <button onClick={() => setIsModalOpen(false)} className='bg-(--red-button) hover:bg-(--red-button-hover) hover:cursor-pointer duration-300 text-white px-4 py-2 rounded-md w-full'>Close</button>
            </Modal>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login; 