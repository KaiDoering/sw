import './index.scss';

import React from 'react';

import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
} from '@mui/material';
import { LocalLibrary } from '@mui/icons-material';

import Spinner from './Spinner';
import Store from './redux/Store';

// monkey patch, see README!
const oldFetch = window.fetch;
window.fetch = (input: URL | RequestInfo, ...rest) => oldFetch(
  typeof input === 'string' ? input.replace('httpss://', 'https://') : input,
  ...rest,
);

const SearchPage = React.lazy(() => import('./SearchPage'));
const PeoplePage = React.lazy(() => import('./PeoplePage'));
const PlanetPage = React.lazy(() => import('./PlanetPage'));
const StarshipPage = React.lazy(() => import('./StarshipPage'));

const root = createRoot(
  document.getElementById('root') as HTMLElement,
);

function wrapInSuspenseWithAppBar(page: JSX.Element) {
  return (
    <>
      <CssBaseline />
      {/* IE is dead now, so we can use sticky */}
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton className="logo" href="/" size="large">
            <LocalLibrary />
            Encyclopedia Galactica
          </IconButton>
        </Toolbar>
      </AppBar>
      <React.Suspense fallback={<Spinner />}>
        {page}
      </React.Suspense>
    </>
  );
}

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={wrapInSuspenseWithAppBar(<SearchPage />)}
          />
          <Route
            path="/people/:id"
            element={wrapInSuspenseWithAppBar(<PeoplePage />)}
          />
          <Route
            path="/planets/:id"
            element={wrapInSuspenseWithAppBar(<PlanetPage />)}
          />
          <Route
            path="/starships/:id"
            element={wrapInSuspenseWithAppBar(<StarshipPage />)}
          />
          {/* this route only exists to admire the spinner */}
          <Route
            path="/spinner"
            element={(
              <Spinner />
            )}
          />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
