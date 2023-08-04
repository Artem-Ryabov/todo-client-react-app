import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import initStore from './app/lib/redux/store';
import { Provider } from 'react-redux';

const store = initStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
