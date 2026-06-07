import React from 'react';
import ReactDOM from 'react-dom/client';
import  {BrowserRouter as Router} from 'react-router-dom';
import App from './App.js';

import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Não redireciona se o erro 401 ocorrer na própria tentativa de login
            if (error.config && error.config.url && !error.config.url.includes('/login')) {
                localStorage.removeItem('usuarioLogadoEmail');
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <App />
    </Router>
    </Provider>
  </React.StrictMode>
);

