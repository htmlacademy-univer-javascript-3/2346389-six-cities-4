import { NameSpace } from '../../components/const/const';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';

export const getFavoriteOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.FavoriteOffersData].isFavoriteOffersDataLoading;
export const getFavoriteOffers = (state: State): Offer[]=> state[NameSpace.FavoriteOffersData].favoriteOffers;
