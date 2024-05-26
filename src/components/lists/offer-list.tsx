import OfferCard from '../cards/offer-card';
import { Offer } from '../../types/offers';

type OffersListProps = {
    offers: Offer[];
    setActiveOfferId?: (id:string)=> void;
    isMainPage: boolean;
};

export default function OffersList({ offers, setActiveOfferId, isMainPage }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard isMainPage={isMainPage} onCardMouseOver = {setActiveOfferId} key={offer.id} offer={offer}/>)};
    </div>
  );
}
