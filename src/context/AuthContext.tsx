import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import authService from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Optionally check for an existing auth token/session on initial load
        const initAuth = async () => {
            // const token = await authService.getToken(access_id);
            const token = '';
            if (token) {
                try {
                    // const newToken = authService.refreshToken(token);
                    // authService.setToken(newToken);
                    // const userData = authService.getUserData(); // Fetch user data using the new token
                    // setUser(userData);
                } catch (error) {
                    console.error('Token validation failed:', error);
                    // authService.clearToken(); // Clear the invalid token from storage
                }
            }
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const token = authService.login(email, password).then((resp) => {
                return resp.data.access_token
            });
            authService.setToken(token.toString()); // Save the token using your authService
        } catch (error) {
            console.error(error);
            throw error; // Or handle the error as you see fit
        }
    };

    const logout = () => {
        // authService.clearToken(); // Clear the token from storage
        setUser(null); // Reset user state
    };

    return (
        <AuthContext.Provider value={{isAuthenticated: !!user, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
