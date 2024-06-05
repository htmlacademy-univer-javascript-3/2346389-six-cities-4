import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { getRatingStars } from '../const/util';
import { AppRoute } from '../const/const';
import { fetchOfferInfoAction, setOfferFavoriteStatusAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrentOfferId } from '../../store/page-events/page-events';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/authorization-user-process/selectors';

const FAV_BUTTON_WIDTH = 18;
const FAV_BUTTON_HEIGHT = 19;
const CARD_IMG_WIDTH = 260;
const CARD_IMG_HEIGHT = 200;

type OfferCardProps = {
  offer: Offer;
  isMainScreen: boolean;
};

export default function OfferCard({ offer, isMainScreen }: OfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {isFavorite, isPremium, previewImage, price, title, type, rating, id} = offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteStatus = `${+!isFavorite}`;
  const handleFavoriteButtonClick = () => {
    if(authorizationStatus !== 'AUTH') {
      browserHistory.push(AppRoute.Login);
      return;
    }
    dispatch(setOfferFavoriteStatusAction({id, favoriteStatus}));
  };

  return (
    <article className={isMainScreen ? ('cities__card place-card') : ('near-places__card place-card')} onMouseOver={()=> {
      if (isMainScreen) {
        dispatch(setCurrentOfferId(id));
      }
    }} onMouseLeave={() => {
      if (isMainScreen) {
        dispatch(setCurrentOfferId(null));
      }
    }}
    >
      {
        isMainScreen &&
        <div className="place-card__mark">
          <span>{isPremium ? 'Premium' : ''}</span>
        </div>
      }
      <div className={isMainScreen ? ('cities__image-wrapper place-card__image-wrapper') : ('near-places__image-wrapper place-card__image-wrapper')}>
        <Link to={`/offer/${offer.id}`} onClick={() => {
          dispatch(fetchOfferInfoAction(id.toString()));
        }}
        >
          <img className="place-card__image" src={previewImage} width={CARD_IMG_WIDTH} height={CARD_IMG_HEIGHT} alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} onClick={handleFavoriteButtonClick} type="button">
            <svg className="place-card__bookmark-icon" width={FAV_BUTTON_WIDTH} height={FAV_BUTTON_HEIGHT}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating" data-test={getRatingStars(rating)}>
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingStars(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`} onClick={() => {
            dispatch(fetchOfferInfoAction(id.toString()));
          }}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
