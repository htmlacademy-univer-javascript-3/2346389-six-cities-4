import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageEvents } from '../../types/state';
import { NameSpace, SortingTypes } from '../../components/const/const';

const initialState: PageEvents = {
  sortType: SortingTypes.Popular,
  currentOfferId: null,
};

export const pageEvents = createSlice({
  name: NameSpace.Page,
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
    setCurrentOfferId: (state, action: PayloadAction<string | null>) => {
      state.currentOfferId = action.payload;
    },
  },
});

export const {setCurrentOfferId, setSortType} = pageEvents.actions;
