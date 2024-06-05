import { NameSpace } from '../../components/const/const';
import { State } from '../../types/state';

export const getSortType = (state: State): string => state[NameSpace.Page].sortType;
export const getCurrentOfferId = (state: State): string | null => state[NameSpace.Page].currentOfferId;
