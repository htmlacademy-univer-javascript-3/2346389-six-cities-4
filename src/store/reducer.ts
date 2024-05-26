import {createReducer} from '@reduxjs/toolkit';
import { CitiesName } from '../components/const/const';
import { initialStateType } from '../types/initial-state';
import { offerFilter, cityPick, loadOffers, setOffersDataLoading } from './action';

const initialState: initialStateType = {
  offers: [],
  cityName: CitiesName.PARIS,
  offerFilter: [],
  isOffersDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityPick, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(offerFilter, (state) => {
      state.offerFilter = state.offers.filter((offer)=> offer.city.name === state.cityName);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoading, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
