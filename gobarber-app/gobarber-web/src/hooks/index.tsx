import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

/** A global provider to encapsulate all providers */
const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
    );
};

export default AppProvider;
