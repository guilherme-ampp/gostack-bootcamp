import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}
interface AuthContextData {
    name: string;
    signIn(credentials: SignInCredentials): Promise<void>;
}

/** For an authentication context - it makes little sense to give it an
 * initial value.
 * To init with an empty object and still trick TypeScript into accepting it.
 * We do {} as AuthContext - we cast an empty object as AuthContext */
export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            const response = await api.post('/sessions', { email, password });

            console.log(response.data);
        },
        [],
    );

    return (
        <AuthContext.Provider value={{ name: 'Guilherme', signIn }}>
            {children}
        </AuthContext.Provider>
    );
};
