import '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './app/pages/main';
import FilmPage from './app/pages/film';
import ErrorPage from './app/pages/error';
import { store } from './app/context';
import { enterEmail, enterToken } from './components/auth-dialog/content';
import { getRequest } from './app/client';

const mainProps = {
  enterEmail,
  enterToken,
};

const baseUrl = process.env.BASE_URL;

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage {...mainProps} />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'films/:film',
    element: <FilmPage />,
    loader: ({ params }) => getRequest(`${baseUrl}movie/${params.film}?language=ru-RU`),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
