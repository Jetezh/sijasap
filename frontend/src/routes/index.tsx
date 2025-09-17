import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from 'react-router-dom';

// Login page import
import Login from "../pages/Login";

// User page imports
import Layout from "../components/Layout";
import Home from "../pages/users/Home";
import Ruangan from "../pages/users/Ruangan";
import Fasilitas from "../pages/users/Fasilitas";
import Notifications from "../pages/users/Notifications";
import DetailRuangan from "../pages/users/DetailRuangan";
import ReservingForm from "../pages/users/ReservingForm";

// Admin page imports
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminHome from "../pages/admin/AdminHome";
import Profile from "../pages/admin/Profile";
import Laporan from "../pages/admin/Laporan";
import KalenderAkademik from "../pages/admin/KalenderAkademik";
import RuangDanFasilitas from "../pages/admin/RuangDanFasilitas";

// Superadmin page imports
import SuperAdminDashboard from "../pages/superadmin/Dashboard";

export default function AppRoutes() {
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    
    const { isAuthenticated, user } = authContext;

    // Fungsi untuk menentukan kemana users yang sudah terontetikasi berdasarkan role
    const getRedirectPath = () => {
        if (!user) return "/login";
        
        switch (user.role) {
            case 'ADMIN':
                return "/admin/";
            case 'SUPERADMIN':
                return "/superadmin/dashboard/home";
            case 'MAHASISWA':
            case 'DOSEN':
                return "/home";
            default:
                return "/login";
        }
    };

    return(
        <Routes>
            {/* Default route - redirect to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Login route - tanpa layout */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to={getRedirectPath()} replace /> : <Login />
            } />
            
            {/* Admin routes - tanpa layout */}
            <Route path="/admin" element={
                isAuthenticated && user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" replace />
            }>
                <Route path="home" element={<AdminHome />} />
                <Route path="profile" element={<Profile />} />
                <Route path="kalender-akademik" element={<KalenderAkademik />} />
                <Route path="laporan" element={<Laporan />} />
                <Route path="ruang-fasilitas" element={<RuangDanFasilitas />} />
            </Route>
            
            {/* Superadmin routes - tanpa layout */}
            <Route path="/superadmin/dashboard/home" element={
                isAuthenticated && user?.role === 'SUPERADMIN' ? <SuperAdminDashboard /> : <Navigate to="/login" replace />
            } />
            
            {/* User routes dengan Layout SPA */}
            <Route path="/" element={
                isAuthenticated && (user?.role === 'MAHASISWA' || user?.role === 'DOSEN') ? <Layout /> : <Navigate to="/login" replace />
            }>
                <Route path="home" element={<Home />} />
                <Route path="ruangan" element={<Ruangan />} />
                <Route path="fasilitas" element={<Fasilitas />} />
                <Route path="notifikasi" element={<Notifications />} />
                <Route path="detail-ruangan" element={<DetailRuangan />} />
                <Route path="reserving-form" element={<ReservingForm />} />
            </Route>

            {/* Catch all route - redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

