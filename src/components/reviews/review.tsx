import { ReviewType } from '../../types/reviews';
import { getRatingStars } from '../const/util';
import { humanizeDate } from '../const/util';
import { REVIEWS_AVATAR_SIZE } from '../const/const';

type ReviewProps = {
    review: ReviewType;
}

export default function Review({review}: ReviewProps): JSX.Element {
  const {date, rating, id, user, comment} = review;
  return (
    <li className="reviews__item" key={id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={REVIEWS_AVATAR_SIZE} height={REVIEWS_AVATAR_SIZE} alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingStars(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{humanizeDate(date)}</time>
      </div>
    </li>
  );
}
