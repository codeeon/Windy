import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import GlobalStyles from './styles/GlobalStyles';
// import router from './routes/config/router';
import Layout from './components/Layout';
import Home from './routes/Home';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Signup from './routes/Signup';
import { auth } from '../firebase';
import { ThemeProvider, styled } from 'styled-components';
import ProtectedRoute from './components/ProtectedRoute';
import { LightTheme } from './styles/Theme';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    // Firebase의 auth가 준비되는 텀에 LoadingScreen 컴포넌트를 띄움.
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      // 만약 해당 path 하위 목록을 전부 ProtectedRoute 적용하고 싶다면, 하위 요소가 아닌 Layout을 감싸면 된다.
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'profile',
          element: (
            // <ProtectedRoute>
            <Profile />
            // </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
  ]);

  return (
    <Wrapper>
      <ThemeProvider theme={LightTheme}>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
