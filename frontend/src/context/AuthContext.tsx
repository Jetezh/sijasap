import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';
import Cookies from 'js-cookie';
import api from '../services/api';

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        const savedUser = Cookies.get('user');
        
        if (!token) {
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return;
        }

        // Set initial state from saved data
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing saved user data:', error);
            }
        }

        // Verify token with server
        api.get('/api/profile')
            .then((res) => {
                if(res.data?.success && res.data?.user) {
                    const freshUser: User = {
                        id: String(res.data.user.id_user),
                        username: res.data.user.username,
                        role: res.data.user.role,
                        email_upnvj: res.data.user.email_upnvj,
                        nama_lengkap: res.data.user.nama_lengkap,
                        nama_fakultas: res.data.user.fakultas?.nama_fakultas,
                        fakultas_id: res.data.user.fakultas_id,
                        unit_universitas_id: res.data.user.unit_universitas_id,
                    };
                    setUser(freshUser);
                    setIsAuthenticated(true);
                    // Update saved user data
                    Cookies.set('user', JSON.stringify(freshUser));
                } else {
                    // If server response is invalid, clear everything
                    setIsAuthenticated(false);
                    setUser(null);
                    Cookies.remove('token');
                    Cookies.remove('user');
                }
            })
            .catch((error) => {
                console.error('Auth verification failed:', error);
                // Only clear auth if we don't have saved user data
                if (!savedUser) {
                    setIsAuthenticated(false);
                    setUser(null);
                    Cookies.remove('token');
                    Cookies.remove('user');
                }
                // If we have saved user data, keep the user logged in
                // but mark as not verified
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
