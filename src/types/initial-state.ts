import { Offer } from './offers';
import { ReviewType } from './reviews';

export type initialStateType = {
  cityName: string | null;
  offers: Offer[];
  filteredOffers: Offer[];
  isOffersDataLoading: boolean;
  authorizationStatus: string;
  userEmail: string;
  error: string | null;
  currentOffer: {
    offerInfo: Offer | null;
    comments: ReviewType[];
    nearbyOffers: Offer[];
    isCommentDataSending: boolean;
  };
  isCurrentOfferDataLoading: boolean;
}
