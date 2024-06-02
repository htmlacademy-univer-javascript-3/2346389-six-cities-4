import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../const/const';
import MainPage from '../../pages/main-page';
import FavoritesScreen from '../../pages/favorites-page';
import LoginPage from '../../pages/login-page';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../../pages/loading-page';
import { getOffersDataLoadingStatus } from '../../store/offers-data/selectors';
import { getCurrentOfferDataLoadingStatus } from '../../store/current-offer-data/selectors';

export default function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isCurrenOfferDataLoading = useAppSelector(getCurrentOfferDataLoadingStatus);

  if (isOffersDataLoading || isCurrenOfferDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <Routes>

        <Route
          path={AppRoute.Root}
          element={<MainPage/>}
        />

        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen/>
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element={<OfferPage/>}
        />

        <Route
          path="*"
          element={<NotFoundPage/>}
        />

      </Routes>
    </HelmetProvider>
  );
}
