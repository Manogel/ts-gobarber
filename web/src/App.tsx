import React from 'react';

import GlobalStyle from './styles/global';
import AppProvider from './hooks';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        {/* <SignUp /> */}
        <SignIn />
      </AppProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
