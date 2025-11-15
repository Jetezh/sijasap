import { useContext } from "react"
import Container from "../../components/Container"
import { AuthContext } from "../../context/AuthContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdEmail } from "react-icons/md";

function Profile() {

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user } = authContext

  if (!user) {
    return (
      <div className="flex flex-col gap-5 px-5 py-5">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="text-gray-500 text-xl mb-4">⏳</div>
            <p className="text-gray-600">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-15">
      <div className="text-left flex flex-col gap-3">
        <h1 className="font-bold lg:text-5xl">Halo, {user?.nama_lengkap || 'User'}</h1>
        <p className="md:text-2xl text-text-green font-medium">Bagaimana kabarmu hari ini?</p>
      </div>
      <div className="flex flex-row gap-15">
        <Container className="flex-1 items-center gap-5 p-15">
          <div className="w-full flex flex-col gap-5 text-left">
            <div className="flex flex-row gap-5 items-center mb-5">
              <FontAwesomeIcon icon={faUser} className="text-(--primary-color) text-5xl"/>
              <h1 className="text-5xl font-semibold">Informasi Personal</h1>
            </div>
            <div>
              <label className="block text-2xl font-medium text-(--text-green)">NIP:</label>
              <p className="text-4xl font-semibold text-black">{user?.username || '-'}</p>
            </div>
            <div>
              <label className="block text-2xl font-medium text-(--text-green)">Role:</label>
              <p className="text-4xl font-semibold text-black">{user?.role.toLowerCase() === 'admin' ? 'Administrator' : '-'}</p>
            </div>
            <div>
              <label className="block text-2xl font-medium text-(--text-green)">Full Name:</label>
              <p className="text-4xl font-semibold text-black">{user?.nama_lengkap || '-'}</p>
            </div>
            <div>
              <label className="block text-2xl font-medium text-(--text-green)">Fakultas:</label>
              <p className="text-4xl font-semibold text-black">{user?.nama_fakultas || '-'}</p>
            </div>
          </div>
        </Container>
        <Container className="flex-1 font-medium gap-5 p-15">
          <div className="w-full flex flex-col gap-5 text-left">
            <div className="flex flex-row gap-5 mb-5">
              <MdEmail className="text-(--primary-color) text-5xl"/>
              <h1 className="text-5xl font-semibold">Informasi Kontak</h1>
            </div>
            <a href={`mailto:${user?.email_upnvj}`} className="flex flex-row gap-5 items-center">
              <MdEmail className="text-(--text-green) text-4xl"/>
              <h1 className="text-3xl font-semibold text-black">{user?.email_upnvj || '-'}</h1>
            </a>
            <div>

            </div>
            <div>

            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Profile