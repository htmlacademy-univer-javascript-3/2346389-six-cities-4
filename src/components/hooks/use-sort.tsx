import { SortingTypes } from '../const/const';
import { Offer } from '../../types/offers';
import { compareOffersPriceUp, compareOffersPriceDown, compareOffersRatingDown } from '../const/util';

export function useSort(offers: Offer[], sortingType: string | null) {
  const sortedOffers = [...offers];
  switch(sortingType) {
    case SortingTypes.LowToHigh:
      return sortedOffers.sort(compareOffersPriceUp);
    case SortingTypes.HighToLow:
      return sortedOffers.sort(compareOffersPriceDown);
    case SortingTypes.TopRated:
      return sortedOffers.sort(compareOffersRatingDown);
    default:
      return sortedOffers;
  }
}
