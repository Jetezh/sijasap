import { createContext, type Dispatch, type SetStateAction } from 'react';

export type User = {
    id: string;
    username: string;
    role: 'ADMIN' | 'SUPERADMIN' | 'MAHASISWA' | 'DOSEN';
    fullName?: string;
    email?: string;
    fakultasId?: number,
    unitUniversitasId?: number, 
    namaFakultas?: string;
    // Add other user properties as needed
}

export type AuthContextType = {
    isAuthenticated: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>,
    isLoading: boolean,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);