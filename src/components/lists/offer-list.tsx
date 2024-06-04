import OfferCard from '../cards/offer-card';
import { Offer } from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
  isMainScreen: boolean;
};

export default function OffersList({ offers, isMainScreen }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard isMainScreen={isMainScreen} key={offer.id} offer={offer}/>)};
    </div>
  );
}
