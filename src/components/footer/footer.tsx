import { Link } from 'react-router-dom';
import { AppRoute } from '../const/const';

const LOGO_WIDTH = 64;
const LOGO_HEIGHT = 33;

export default function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <Link to={AppRoute.Root} className="footer__logo-link">
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
        />
      </Link>
    </footer>
  );
}
