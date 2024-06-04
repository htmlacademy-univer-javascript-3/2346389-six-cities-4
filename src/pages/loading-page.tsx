import { useState, CSSProperties } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

function LoadingPage() {
  const [loading] = useState(true);
  const [color] = useState('#007FFF');

  return (
    <div className="sweet-loading">
      <PacmanLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={75}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingPage;
