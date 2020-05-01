import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';
import Routes from './routes';

// AuthContext.Provider is a component with which we encapsulate components
// we wish it had access to the context.
const App: React.FC = () => (
    <>
        <AppProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </AppProvider>

        <GlobalStyle />
    </>
);

export default App;
