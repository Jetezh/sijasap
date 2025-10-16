import { useEffect, useState } from "react"
import Container from "../../components/Container"
import api from "../../services/api"

interface UserData {
  id: string;
  username: string;
  role: string;
  fullName: string;
}

interface MeDataResponse {
  success: boolean;
  user: UserData;
}

function Profile() {

  const [ meData, setMeData ] = useState<MeDataResponse | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchMeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await api.get('/api/auth/profile');
        
        if (response.data?.success && response.data?.user) {
          setMeData(response.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: unknown) {
        console.error('Error fetching user data:', err);
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to fetch user data';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 px-5 py-5">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-5 px-5 py-5">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-red-600 mb-2">Error loading profile data</p>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <h1>Halo {meData?.user?.fullName || 'User'}</h1>
      <p>Informasi Profil Pengguna</p>
      <Container>
        {meData?.user && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username:</label>
              <p className="mt-1 text-sm text-gray-900">{meData.user.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role:</label>
              <p className="mt-1 text-sm text-gray-900">{meData.user.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name:</label>
              <p className="mt-1 text-sm text-gray-900">{meData.user.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID:</label>
              <p className="mt-1 text-sm text-gray-900">{meData.user.id}</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Profile