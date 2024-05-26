import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { AppRoute, AuthorizationStatus } from '../const/const';
import { getAuthorizationStatus } from '../../store/authorization-user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === String(AuthorizationStatus.Auth)
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
