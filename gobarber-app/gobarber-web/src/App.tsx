import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

// AuthContext.Provider is a component with which we encapsulate components
// we wish it had access to the context.
const App: React.FC = () => (
    <>
        <AuthProvider>
            <SignIn />
            {/* <SignUp /> */}
        </AuthProvider>
        <GlobalStyle />
    </>
);

export default App;
