import Review from '../reviews/review';
import { ReviewType } from '../../types/reviews';

type ReviewListProps = {
    reviews: ReviewType[];
}

export default function ReviewsList({ reviews }: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review}/>
      ))}
    </ul>
  );
}
