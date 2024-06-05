import { NameSpace } from '../../components/const/const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): string => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].userInfo;
