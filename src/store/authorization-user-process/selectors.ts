import { SlicesName } from '../../components/const/const';
import {State} from '../../types/state';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): string => state[SlicesName.User].authorizationStatus;
export const getUserInfo = (state: Pick<State, SlicesName.User>): UserData | null => state[SlicesName.User].userInfo;
