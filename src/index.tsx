import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOffersAction, fetchFavoriteOffersAction } from './store/api-actions';
import { HistoryRouter } from './components/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
