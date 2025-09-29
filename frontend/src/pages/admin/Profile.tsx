import Container from "../../components/Container"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


function Profile() {
  const auth = useContext(AuthContext)
  const username = auth?.user?.username ?? "-"
  const role = auth?.user?.role ?? "-"
  const fullName = auth?.user?.fullName ?? username;
  const email = auth?.user?.email;

  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <h1>Halo, {fullName}</h1>
      <Container>
        <div className="flex flex-col gap-2">
          <div>Username: {username}</div>
          <div>Role: {role}</div>
          <div>Email: {email}</div>
        </div>
      </Container>
    </div>
  )
}

export default Profile