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

export enum CitiesName {
  AMSTERDAM = 'Amsterdam',
  COLOGNE = 'Cologne',
  PARIS = 'Paris',
  DUSSELDORF = 'Dusseldorf',
  BRUSSELS = 'Brussels',
  HAMBURG = 'Hamburg',
}

export enum MapClasses {
  SectionMainMapClass = 'cities__map map',
  SectionPropertyMapClass = 'offer__map map',
}

export enum SortingTypes {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum Actions {
  PICK_CITY = 'PICK_CITY',
  FILTER_OFFERS = 'FILTER_OFFERS',
  LOAD_OFFERS = 'LOAD_OFFERS',
  SET_STATUS_OFFERS_DATA_LOADING = 'SET_STATUS_OFFERS_DATA_LOADING',
}

export enum APIRoute {
  Offers = '/offers',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
