import { useContext } from "react"
import Container from "../../components/Container"
import { AuthContext } from "../../context/AuthContext";

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
    <div className="flex flex-col gap-5 px-5 py-5">
      <h1>Halo {user.fullName || 'User'}</h1>
      <p>Informasi Profil Pengguna</p>
      <Container>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <p className="mt-1 text-sm text-gray-900">{user.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role:</label>
            <p className="mt-1 text-sm text-gray-900">{user.role}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name:</label>
            <p className="mt-1 text-sm text-gray-900">{user.fullName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User ID:</label>
            <p className="mt-1 text-sm text-gray-900">{user.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fakultas:</label>
            <p className="mt-1 text-sm text-gray-900">{user.namaFakultas}</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Profile