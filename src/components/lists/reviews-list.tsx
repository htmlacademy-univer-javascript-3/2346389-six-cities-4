import Review from '../reviews/review';
import { ReviewType } from '../../types/reviews';

type ReviewListProps = {
    reviews: ReviewType[];
}

export default function ReviewsList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews
        .slice()
        .sort((reviewA, reviewB) => {
          const dateA = new Date(reviewA.date).getTime();
          const dateB = new Date(reviewB.date).getTime();

          return dateB - dateA;
        })
        .slice(0, 10)
        .map((review) => (
          <Review key={review.id} review={review} />
        ))}
    </ul>
  );
}
