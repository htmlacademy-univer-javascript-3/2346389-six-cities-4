import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../const/const';
import MainPage from '../../pages/main-page';
import FavoritesPage from '../../pages/favorites-page';
import LoginPage from '../../pages/login-page';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import PrivateRoute from '../private-route/privaye-route';
import { Offer } from '../../types/offers';
import { ReviewType } from '../../types/reviews';

type AppPageProps = {
  offers: Offer[];
  reviews: ReviewType[];
}

export default function App({ offers, reviews }: AppPageProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
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
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
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
      </BrowserRouter>
    </HelmetProvider>
  );
}

