import { SlicesName } from '../../components/const/const';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';

export const getFavoriteOffersDataLoadingStatus = (state: State): boolean => state[SlicesName.FavoriteOffersData].isFavoriteOffersDataLoading;
export const getFavoriteOffers = (state: State): Offer[]=> state[SlicesName.FavoriteOffersData].favoriteOffers;
