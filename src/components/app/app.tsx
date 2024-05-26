import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../const/const';
import MainPage from '../../pages/main-page';
import FavoritesPage from '../../pages/favorites-page';
import LoginPage from '../../pages/login-page';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { ReviewType } from '../../types/reviews';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../../pages/loading-page';
import { HistoryRouter } from '../history-route/history-route';
import { browserHistory } from '../../browser-history';

type AppScreenProps = {
  reviews: ReviewType[];
}

export default function App({ reviews }: AppScreenProps): JSX.Element {
  const offers = useAppSelector((state)=>state.filteredOffers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>

          <Route
            path={AppRoute.Main}
            element={<MainPage offers={offers}/>}
          />

          <Route
            path={AppRoute.Login}
            element={<LoginPage/>}
          />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage offers={offers}/>
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.Offer}
            element={<OfferPage offers={offers} reviews={reviews}/>}
          />

          <Route
            path="*"
            element={<NotFoundPage/>}
          />

        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

