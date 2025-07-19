import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from "../pages/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import Home from "../pages/users/Home";

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
                return "/admin/dashboard/home";
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
            
            {/* Login route */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to={getRedirectPath()} replace /> : <Login />
            } />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard/home" element={
                isAuthenticated && user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" replace />
            } />
            
            {/* Superadmin routes */}
            <Route path="/superadmin/dashboard/home" element={
                isAuthenticated && user?.role === 'SUPERADMIN' ? <SuperAdminDashboard /> : <Navigate to="/login" replace />
            } />
            
            {/* Home route for mahasiswa and dosen */}
            <Route path="/home" element={
                isAuthenticated && (user?.role === 'MAHASISWA' || user?.role === 'DOSEN') ? <Home /> : <Navigate to="/login" replace />
            } />
            
            {/* Catch all route - redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

