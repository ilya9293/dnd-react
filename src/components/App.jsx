import PropTypes from 'prop-types';
import { useState } from 'react';

const App = () => {
  const [parts, setParts] = useState([
    { order: 1, wordBox: '' },
    { order: 2, wordBox: '' },
    { order: 3, wordBox: '' },
    { order: 4, wordBox: '' },
  ]);

  const [words, setWords] = useState([
    { id: 1, word: 'Я' },
    { id: 2, word: 'хочу' },
    { id: 3, word: 'работать' },
    { id: 4, word: 'программистом' },
  ]);

  const [saveWord, setSaveWord] = useState('');

  //   const [memory, setMemory] = useState(null);

  const handleDragStart = (e, word) => {
    setSaveWord(word);
    //  setWords(el => console.log(el));
    //  setMemory(e.target);
    //  console.log(e.target.dataset.id);
    //  console.log('drugstart', id);
  };

  const handleDragLeave = e => {};

  const handleDragEnd = e => {};

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, order) => {
    e.preventDefault();
    const filteredWords = words.filter(({ id, word }) => word !== saveWord);
    setWords(filteredWords);
    //  console.log('drop', order);
    //  console.dir(memory);
    //  e.target.append(memory);
  };

  return (
    <>
      <div className="field">
        {parts.map(({ order, wordBox }) => (
          <div
            key={order}
            className="part"
            data-order={order}
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleDrop(e, order)}
          >
            {wordBox}
          </div>
        ))}
      </div>
      <div className="container">
        {words.map(({ id, word }) => (
          <div
            key={id}
            className="word"
            data-id={id}
            draggable={true}
            onDragStart={e => handleDragStart(e, word)}
            onDragLeave={e => handleDragLeave(e)}
            onDragEnd={e => handleDragEnd(e)}
          >
            {word}
          </div>
        ))}

        {/* {words.map(({ id, word }) => (
          <div
            key={id}
            className="word"
            data-id={id}
            draggable={true}
            onDragStart={e => handleDragStart(e, id)}
            onDragLeave={e => handleDragLeave(e)}
            onDragEnd={e => handleDragEnd(e)}
          >
            {word}
          </div>
        ))} */}
      </div>
    </>
  );
};

export default App;
