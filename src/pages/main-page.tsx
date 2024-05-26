import OffersList from '../components/lists/offer-list';
import { Offer } from '../types/offers';
import { Link } from 'react-router-dom';
import Map from '../components/map/map';
import { useState } from 'react';
import CitiesList from '../components/cities-list/cities-list';
import { useAppSelector } from '../components/hooks';
import SortingTypeForm from '../components/sorting-options-form/sorting-options-form';
import { useSort } from '../components/hooks/use-sort';
import { SortingTypes } from '../components/const/const';

type MainPageProps = {
  offers: Offer[];
}

export default function MainScreen({ offers }: MainPageProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState('0');
  const currentCity = useAppSelector((state) => state.cityName);
  const [sortingType, setSortingType] = useState<string | null>(SortingTypes.Popular);
  const sortedOffers = useSort(offers, sortingType);
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList setSortingType={setSortingType} currentCity={currentCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} place{(offers.length !== 1) ? 's' : ''} to stay in {currentCity}
              </b>
              <SortingTypeForm onSortingTypeClick={setSortingType} sortingType={sortingType}/>
              <div className="cities__places-list places__list tabs__content">
                <OffersList isMainPage offers={sortedOffers} setActiveOfferId={setActiveOfferId}/>
              </div>
            </section>
            <div className="cities__right-section">
              <Map isMainPage offers={offers} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
