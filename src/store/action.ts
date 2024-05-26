import { createAction } from '@reduxjs/toolkit';
import { AppRoute, Actions } from '../components/const/const';

export const redirectToRoute = createAction<AppRoute>(Actions.REDIRECT_ROUTE);
