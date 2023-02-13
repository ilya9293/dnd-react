import { useState } from 'react';

const text = 'Я хочу работать программистом';

const formInitialState = (text = '') =>
  text.split(' ').map((word, index) => ({ id: String(index), word }));

const App = () => {
  const [words, setWords] = useState(() => formInitialState(text));
  const [replacedWords, setReplacedWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  const onDragStart = id => () => {
    setSelectedWord(words.find(word => word.id === id));
  };

  const onBoxDragOver = e => {
    e.preventDefault();
  };

  const onDropBox = e => {
    if (!selectedWord) return;
    e.preventDefault();

    setReplacedWords(prev => [...prev, selectedWord]);
    setWords(prev => prev.filter(word => word.id !== selectedWord.id));
    setSelectedWord(null);
  };

  const onDropSpan = (e, before = false) => {
    if (!selectedWord) return;
    e.preventDefault();

    setReplacedWords(prev =>
      !before ? [...prev, selectedWord] : [selectedWord, ...prev]
    );
    setWords(prev => prev.filter(word => word.id !== selectedWord.id));
    setSelectedWord(null);
  };

  const chekIds = () => {
    if (!replacedWords.length === 4) {
      return false;
    }
    const numbers = replacedWords.map(el => el.id);
    return numbers.join('') === '0123';
  };

  return (
    <>
      <div className="wordsBox">
        {!!words.length &&
          words.map(({ id, word }) => (
            <span
              className="words"
              key={id}
              draggable={true}
              onDragStart={onDragStart(id)}
            >
              {word}
            </span>
          ))}
        {chekIds() && <p className="words">Готово!!!</p>}
        {!words.length && !chekIds() && (
          <p className="words">Поменяй порядок!!!</p>
        )}
      </div>

      <div
        className="dropBox"
        style={{
          backgroundColor: !chekIds() ? 'tomato' : '#00bd6b',
        }}
        onDrop={!replacedWords.length ? onDropBox : null}
        onDragOver={!replacedWords.length ? onBoxDragOver : null}
      >
        {!!replacedWords.length && (
          <span
            className="replacedWordsBoxSpan"
            onDrop={replacedWords.length ? e => onDropSpan(e, true) : null}
            onDragOver={replacedWords.length ? onBoxDragOver : null}
          >
            Перемещай сюда
          </span>
        )}

        <div className="replacedWordsBox">
          {!!replacedWords.length && (
            <>
              {replacedWords.map(({ id, word }) => (
                <span className="words" key={id}>
                  {word}
                </span>
              ))}
            </>
          )}
          {!replacedWords.length && <p>Перемещай в этот контейнер слова</p>}
        </div>
        {!!replacedWords.length && (
          <span
            className="replacedWordsBoxSpan"
            onDrop={replacedWords.length ? onDropSpan : null}
            onDragOver={replacedWords.length ? onBoxDragOver : null}
          >
            Перемещай сюда
          </span>
        )}
      </div>
    </>
  );
};

export default App;
