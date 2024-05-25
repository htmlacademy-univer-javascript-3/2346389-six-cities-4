import {createReducer} from '@reduxjs/toolkit';
import { CitiesName } from '../components/const/const';
import { offers } from '../mocks/offers';
import { initialStateType } from '../types/initial-state';
import { offerFilter, cityPick } from './action';

const START_CITY_NAME = 'Paris';

const initialState: initialStateType = {
  cityName: CitiesName.PARIS,
  offers: offers.filter((offer) => offer.city.name === START_CITY_NAME),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityPick, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(offerFilter, (state) => {
      state.offers = offers.filter((offer)=> offer.city.name === state.cityName);
    });
});
