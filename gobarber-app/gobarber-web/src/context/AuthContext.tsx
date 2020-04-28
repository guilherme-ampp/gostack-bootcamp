import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}
interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthState {
    token: string;
    user: object;
}

/** For an authentication context - it makes little sense to give it an
 * initial value.
 * To init with an empty object and still trick TypeScript into accepting it.
 * We do {} as AuthContext - we cast an empty object as AuthContext */
export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(
        (): AuthState => {
            const token = localStorage.getItem('@GoBarber:token');
            const user = localStorage.getItem('@GoBarber:user');
            if (token && user) {
                return { token, user: JSON.parse(user) };
            }
            return {} as AuthState;
        },
    );

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            const response = await api.post('/sessions', { email, password });

            const { token, user } = response.data;
            localStorage.setItem('@GoBarber:token', token);
            localStorage.setItem('@GoBarber:user', JSON.stringify(user));

            setData({ token, user });
        },
        [],
    );

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};
