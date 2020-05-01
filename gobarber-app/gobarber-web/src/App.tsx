import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

// AuthContext.Provider is a component with which we encapsulate components
// we wish it had access to the context.
const App: React.FC = () => (
    <>
        <AppProvider>
            <SignIn />
            {/* <SignUp /> */}
        </AppProvider>

        <GlobalStyle />
    </>
);

export default App;
