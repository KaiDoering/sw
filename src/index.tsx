import './index.scss';

import React from 'react';

import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Spinner from './Spinner';

const App = React.lazy(() => import('./App'));

const root = createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <React.Suspense fallback={<Spinner />}>
              <App />
            </React.Suspense>
          )}
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
