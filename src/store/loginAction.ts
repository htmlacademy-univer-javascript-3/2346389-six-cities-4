import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../components/const/const';
import { saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute, requireAuthorization, setUserEmail } from './action';


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(setUserEmail(data.email));
  }
);
