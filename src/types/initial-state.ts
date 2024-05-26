import { Offer } from './offers';

export type initialStateType = {
  cityName: string | null;
  offers: Offer[];
  filteredOffers: Offer[];
  isOffersDataLoading: boolean;
  authorizationStatus: string;
  userEmail: string;
  error: string | null;
}
