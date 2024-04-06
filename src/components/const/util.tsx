/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import dayjs from 'dayjs';

const RELEASE_DATE_FORMAT = 'MMMM YYYY';

export function getRatingStars(rating: number): string {
  return `${20 * rating}%`;
}

export function humanizeDate(date: string): string {
  return date ? dayjs(date).format(RELEASE_DATE_FORMAT) : '';
}
