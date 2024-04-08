export const REVIEWS_AVATAR_SIZE = 54;

export const HOST_AVATAR_SIZE = 74;

export const STAR_WIDTH = 37;

export const STAR_HEIGHT = 33;

export const PLACE_CARD_WIDTH = 260;

export const PLACE_CARD_HEIGHT = 200;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
