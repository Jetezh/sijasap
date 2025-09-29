import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';
import Cookies from 'js-cookie';
import api from '../services/api';

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            setIsAuthenticated(false);
            setUser(null);
            return;
        }

        setIsAuthenticated(true);
        api.get('/auth/me')
            .then((res) => {
                if(res.data?.success && res.data?.user) {
                    const freshUser: User = {
                        id: String(res.data.user.id),
                        username: res.data.user.username,
                        role: res.data.user.role,
                    };
                    setUser(freshUser);
                } else {
                    setUser(null);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                setUser(null);
            });
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
