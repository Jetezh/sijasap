import React from "react";
import { LeftSidebar, SidebarItem } from "../../components/Sidebar";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

import Modal from "../../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { sidebarItems } from "../../lib/data";

const AdminDashboard: React.FC = () => {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, setIsAuthenticated, setUser } = authContext;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const navigate = useNavigate();

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <LeftSidebar
        className={` min-h-screen ${sidebarCollapsed ? "min-w-28" : "min-w-120"} duration-300`}
      >
        <div className="fixed flex flex-col justify-between h-screen">
          <div>
            <div
              className="px-5 border-b-5 border-b-(--primary-color) mb-2 flex gap-5 items-center font-bold duration-300"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <FontAwesomeIcon
                icon={faBars}
                className="hover:cursor-pointer w-10 my-5"
              />
              {!sidebarCollapsed && (
                <span>
                  {!user?.nama_fakultas ? "Fakultas UPNVJ" : `Fakultas ${user.nama_fakultas}`}
                </span>
              )}
            </div>
            <div>
              {sidebarItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <SidebarItem to={item.path} className="flex gap-4">
                    <FontAwesomeIcon icon={item.icon} className="w-10 my-5" />
                    {!sidebarCollapsed && item.name}
                  </SidebarItem>
                </Link>
              ))}
            </div>
          </div>
          <SidebarItem
            className="flex mb-5 gap-5 items-center hover:bg-red-100 text-(--red-button) hover:text-red-600"
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="w-10 my-5"
            />
            {!sidebarCollapsed && "Log out"}
          </SidebarItem>
        </div>
        <Modal isOpen={isModalOpen}>
          <h1>Apakah kamu ingin keluar?</h1>
          <div className="flex flex-row gap-4">
            <button
              onClick={logout}
              className="bg-(--red-button) hover:bg-(--red-button-hover) text-white px-4 py-2 rounded-md basis-1/2 hover:cursor-pointer duration-300"
            >
              Ya
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md basis-1/2 hover:cursor-pointer duration-300"
            >
              Tidak
            </button>
          </div>
        </Modal>
      </LeftSidebar>
      <main
        className={`flex-1 ml-${sidebarCollapsed ? "28 " : "120"} duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
