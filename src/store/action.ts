import {createAction} from '@reduxjs/toolkit';
import { Actions } from '../components/const/const';

export const cityPick = createAction(Actions.PICK_CITY, (textContent: string | null) => ({
  payload: textContent,
}));

export const offerFilter = createAction(Actions.FILTER_OFFERS);
