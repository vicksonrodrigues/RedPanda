import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';

import { store } from './app/store';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
