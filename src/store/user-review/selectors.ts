import { NameSpace } from '../../components/const/const';
import { State } from '../../types/state';

export const getCommentDataSendingStatus = (state: State): boolean => state[NameSpace.UserReview].isCommentDataSending;
