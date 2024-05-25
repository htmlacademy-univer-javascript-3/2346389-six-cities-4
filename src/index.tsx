import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import { reviews } from './mocks/reviews';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <App
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);