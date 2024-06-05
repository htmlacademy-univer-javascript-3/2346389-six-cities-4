import { NameSpace } from '../../components/const/const';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';

export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.OffersData].isOffersDataLoading;
export const getOffers = (state: State): Offer[]=> state[NameSpace.OffersData].offers;
export const getFilteredOffers = (state: State): Offer[]=> state[NameSpace.OffersData].filteredOffers;
export const getCityName = (state: State): string => state[NameSpace.OffersData].cityName;
