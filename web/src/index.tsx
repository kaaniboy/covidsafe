import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStore,
  faUtensils,
  faTimes,
  faCheck,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import ReactDOM from 'react-dom';
import MapPage from './pages/MapPage';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faStore, faUtensils, faTimes, faCheck, faChevronUp, faChevronDown);

ReactGA.initialize('UA-80633604-5');
ReactGA.pageview(window.location.pathname);

ReactDOM.render(
  <React.StrictMode>
    <MapPage />
  </React.StrictMode>,
  document.getElementById('root')
);