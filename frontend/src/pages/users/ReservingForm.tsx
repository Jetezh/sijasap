import assets from "../../assets/assets";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { dataPinjamTesting as dataUserTesting } from "../../lib/dataTesting";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

function ReservingForm() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, setUser } = authContext;

  useEffect(() => {
    try {
      if (user) {
        console.log(user);
      }
    } catch (err) {}
  }, [user]);

  if (user?.role === "DOSEN") {
    return (
      <div className="flex flex-col gap-5">
        <section className="w-full lg:[height:calc(50vh-7rem)] md:h-96 h-60 p-0 relative">
          <img
            src={assets.gedungFIK}
            alt="Foto Ruangan"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute bottom-4 left-4 text-white font-bold lg:text-5xl md:text-3xl text-xl">
            Nama Ruangan
          </h1>
        </section>
        <div className="w-full flex justify-center">
          <Container className="min-w-[50%] flex flex-col gap-5">
            <h1 className="lg:text-3xl md:text-2xl font-bold">
              Formulir Peminjaman untuk {user?.role}
            </h1>
            <form className="flex flex-col gap-5">
              <div className="bg-gray-100 p-5 lg:text-2xl md:text-2xl font-medium rounded-md flex flex-col gap-3 text-left">
                <div className="flex flex-row gap-5">
                  <p className="flex-1">Nama:</p>
                  <span className="flex-1">{dataUserTesting["nama"]}</span>
                  <p className="flex-1">NIM:</p>
                  <span className="flex-1">{dataUserTesting["nim"]}</span>
                </div>
                <div className="flex flex-row gap-5">
                  <p className="flex-1">Program Studi:</p>
                  <span className="flex-1">{}</span>
                  <p className="flex-1">Semester:</p>
                  <span className="flex-1">{dataUserTesting["semester"]}</span>
                </div>
                <p>Email: </p>
              </div>
              <Button
                title="Submit"
                classname="lg:text-2xl md:text-2xl w-full py-3"
              />
            </form>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="w-full lg:[height:calc(50vh-7rem)] md:h-96 h-60 p-0 relative">
        <img
          src={assets.gedungFIK}
          alt="Foto Ruangan"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute bottom-4 left-4 text-white font-bold lg:text-5xl md:text-3xl text-xl">
          Nama Ruangan
        </h1>
      </section>
      <div className="w-full flex justify-center">
        <Container className="min-w-[50%] flex flex-col gap-5">
          <h1 className="lg:text-3xl md:text-2xl font-bold">
            Formulir Peminjaman untuk {user?.role}
          </h1>
          <form className="flex flex-col gap-5">
            <div className="bg-gray-100 p-5 lg:text-2xl md:text-2xl font-medium rounded-md flex flex-col gap-3 text-left">
              <div className="flex flex-row gap-5">
                <p className="flex-1">Nama:</p>
                <span className="flex-1">{user?.nama_lengkap}</span>
                <p className="flex-1">NIM:</p>
                <span className="flex-1">{user?.username}</span>
              </div>
              <div className="flex flex-row gap-5">
                <p className="flex-1">Program Studi:</p>
                <span className="flex-1">{user?.program_studi}</span>
                <p className="flex-1">Semester:</p>
                <span className="flex-1">{dataUserTesting["semester"]}</span>
              </div>
              <p>Email: </p>
            </div>
            <Button
              title="Submit"
              classname="lg:text-2xl md:text-2xl w-full py-3"
            />
          </form>
        </Container>
      </div>
    </div>
  );
}

export default ReservingForm;
