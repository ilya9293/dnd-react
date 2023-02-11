import PropTypes from 'prop-types';
import { useState } from 'react';

const App = () => {
  const [parts, setParts] = useState([
    { order: 1 },
    { order: 2 },
    { order: 3 },
    { order: 4 },
  ]);
  return (
    <>
      <div className="field">
        <div className="part"></div>
        <div className="part"></div>
        <div className="part"></div>
        <div className="part"></div>
      </div>
      <div className="container">
        <div className="word">Я</div>
        <div className="word">хочу</div>
        <div className="word">работать</div>
        <div className="word">программистом</div>
      </div>
    </>
  );
};

export default App;
