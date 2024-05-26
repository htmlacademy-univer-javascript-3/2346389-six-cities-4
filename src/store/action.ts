import {createAction} from '@reduxjs/toolkit';
import { Actions } from '../components/const/const';
import { Offer } from '../types/offers';

export const cityPick = createAction(Actions.PICK_CITY, (textContent: string | null) => ({
  payload: textContent,
}));

export const offerFilter = createAction(Actions.FILTER_OFFERS);

export const loadOffers = createAction<Offer[]>(Actions.LOAD_OFFERS);

export const setOffersDataLoading = createAction<boolean>(Actions.SET_STATUS_OFFERS_DATA_LOADING);
