import { createSlice } from '@reduxjs/toolkit';
import { FavoriteOffersData } from '../../types/state';
import { fetchFavoriteOffersAction } from '../api-actions';
import { NameSpace } from '../../components/const/const';

const initialState: FavoriteOffersData = {
  isFavoriteOffersDataLoading: false,
  favoriteOffers: [],
};

export const favoriteOffersData = createSlice({
  name: NameSpace.FavoriteOffersData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersDataLoading = false;
      });
  }
});
