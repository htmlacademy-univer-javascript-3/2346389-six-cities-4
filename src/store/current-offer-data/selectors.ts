import { NameSpace } from '../../components/const/const';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';
import { ReviewType } from '../../types/reviews';

export const getCurrentOfferDataLoadingStatus = (state: State): boolean => state[NameSpace.CurrentOfferData].isCurrentOfferDataLoading;
export const getOfferInfo = (state: State): Offer | null => state[NameSpace.CurrentOfferData].offerInfo;
export const getComments = (state: State): ReviewType[] => state[NameSpace.CurrentOfferData].comments;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.CurrentOfferData].nearbyOffers;
