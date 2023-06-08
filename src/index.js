import React from 'react';
import './index.css';
import App from './App';

import { makeServer } from "./server";

makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

