import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';
import Cookies from 'js-cookie';

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
    const [user, setUser] = useState<User | null>(() => {
        const userCookie = Cookies.get('user');
        return userCookie ? JSON.parse(userCookie) : null
    });

    useEffect(() => {
        const handleTokenChange = () => {
            setIsAuthenticated(!!Cookies.get('token'));

            const userCookie = Cookies.get('user');
            setUser(userCookie ? JSON.parse(userCookie) : null)
        };

        window.addEventListener('storage', handleTokenChange);

        return () => {
            window.removeEventListener('storage', handleTokenChange);
        }
    })

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}