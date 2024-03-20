import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <h1>
        404 Not Found (*_*)
      </h1>
      <Link to="/">Go to main page</Link>
    </>
  );
}

export default NotFoundPage;
