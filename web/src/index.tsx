import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStore, faUtensils, faTimes } from '@fortawesome/free-solid-svg-icons';

import ReactDOM from 'react-dom';
import MapPage from './pages/MapPage';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faStore, faUtensils, faTimes);

ReactDOM.render(
  <React.StrictMode>
    <MapPage />
  </React.StrictMode>,
  document.getElementById('root')
);