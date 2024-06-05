import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../components/const/const';
import {authorizationUserProcess} from './authorization-user-process/authorization-user-process';
import {currentOfferData} from './current-offer-data/current-offer-data';
import { userReview } from './user-review/user-review';
import {offersData} from './offers-data/offers-data';
import {pageEvents} from './page-events/page-events';
import {favoriteOffersData} from './favorite-offers-data/favorite-offers-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: authorizationUserProcess.reducer,
  [NameSpace.Page]: pageEvents.reducer,
  [NameSpace.OffersData]: offersData.reducer,
  [NameSpace.CurrentOfferData]: currentOfferData.reducer,
  [NameSpace.FavoriteOffersData]: favoriteOffersData.reducer,
  [NameSpace.UserReview]: userReview.reducer,
});
