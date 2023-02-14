import { useState, useEffect } from 'react';

const text = 'Я хочу работать программистом';
const chekedWords = [
  { id: 0, word: '' },
  { id: 1, word: '' },
  { id: 2, word: '' },
  { id: 3, word: '' },
];

const formInitialState = (text = '') =>
  text.split(' ').map((word, index) => ({ id: index, word }));

const App = () => {
  const [words, setWords] = useState(() => formInitialState(text));
  const [replacedWords, setReplacedWords] = useState(chekedWords);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isDrop, setIsDrop] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const onDragStart = id => () => {
    setSelectedWord(words.find(word => word.id === id));
  };

  useEffect(() => {
    if (!isDrop) return;
    //  setTimeout(() => {
    const chekedReplacedWords = replacedWords.map((el, idx) => {
      return el.id !== idx ? { id: idx, word: '' } : el;
    });
    setReplacedWords(chekedReplacedWords);
    setIsDrop(false);
    setIsAdded(true);
    //  }, 1000);
  }, [isDrop, replacedWords, selectedWord]);

  useEffect(() => {
    if (!isAdded) return;
    const isElement = replacedWords.some(
      ({ word }) => word === selectedWord.word
    );
    console.log(isElement);

    if (!isElement) {
      return setIsAdded(false);
    }
    setWords(prev => prev.filter(word => word.id !== selectedWord.id));
    setIsAdded(false);
    setSelectedWord(null);
  }, [isAdded, replacedWords, selectedWord]);

  const onBoxDragOver = e => {
    e.preventDefault();
  };

  const onDropSpan = (e, id) => {
    e.preventDefault();
    if (!selectedWord) return;
    const changedReplacedWords = replacedWords.map((el, idx) =>
      idx === id && !el.word ? selectedWord : el
    );
    setReplacedWords(changedReplacedWords);
    setIsDrop(true);
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
        {!words.length && <p className="words">Готово!!!</p>}
      </div>

      <div
        className="dropBox"
        style={{
          backgroundColor: words.length ? 'tomato' : '#00bd6b',
        }}
      >
        {replacedWords.map((el, idx) => (
          <div
            key={idx}
            className="replacedWordsBoxSpan"
            onDrop={e => onDropSpan(e, idx)}
            onDragOver={onBoxDragOver}
          >
            <span className={el.word && 'words'}>
              {el.word ? el.word : 'Тяни сюда'}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;

// const text = 'Я хочу работать программистом';

// const formInitialState = (text = '') =>
//   text.split(' ').map((word, index) => ({ id: String(index), word }));

// const App = () => {
//   const [words, setWords] = useState(() => formInitialState(text));
//   const [replacedWords, setReplacedWords] = useState([]);
//   const [selectedWord, setSelectedWord] = useState(null);

//   const onDragStart = id => () => {
//     setSelectedWord(words.find(word => word.id === id));
//   };

//   const onBoxDragOver = e => {
//     e.preventDefault();
//   };

//   const onDropBox = e => {
//     if (!selectedWord) return;
//     e.preventDefault();

//     setReplacedWords(prev => [...prev, selectedWord]);
//     setWords(prev => prev.filter(word => word.id !== selectedWord.id));
//     setSelectedWord(null);
//   };

//   const onDropSpan = (e, before = false) => {
//     if (!selectedWord) return;
//     e.preventDefault();

//     setReplacedWords(prev =>
//       !before ? [...prev, selectedWord] : [selectedWord, ...prev]
//     );
//     setWords(prev => prev.filter(word => word.id !== selectedWord.id));
//     setSelectedWord(null);
//   };

//   const chekIds = () => {
//     if (!replacedWords.length === 4) {
//       return false;
//     }
//     const numbers = replacedWords.map(el => el.id);
//     return numbers.join('') === '0123';
//   };

//   return (
//     <>
//       <div className="wordsBox">
//         {!!words.length &&
//           words.map(({ id, word }) => (
//             <span
//               className="words"
//               key={id}
//               draggable={true}
//               onDragStart={onDragStart(id)}
//             >
//               {word}
//             </span>
//           ))}
//         {chekIds() && <p className="words">Готово!!!</p>}
//         {!words.length && !chekIds() && (
//           <p className="words">Поменяй порядок!!!</p>
//         )}
//       </div>

//       <div
//         className="dropBox"
//         style={{
//           backgroundColor: !chekIds() ? 'tomato' : '#00bd6b',
//         }}
//         onDrop={!replacedWords.length ? onDropBox : null}
//         onDragOver={!replacedWords.length ? onBoxDragOver : null}
//       >
//         {!!replacedWords.length && (
//           <span
//             className="replacedWordsBoxSpan"
//             onDrop={replacedWords.length ? e => onDropSpan(e, true) : null}
//             onDragOver={replacedWords.length ? onBoxDragOver : null}
//           >
//             Перемещай сюда
//           </span>
//         )}

//         <div className="replacedWordsBox">
//           {!!replacedWords.length && (
//             <>
//               {replacedWords.map(({ id, word }) => (
//                 <span className="words" key={id}>
//                   {word}
//                 </span>
//               ))}
//             </>
//           )}
//           {!replacedWords.length && <p>Перемещай в этот контейнер слова</p>}
//         </div>
//         {!!replacedWords.length && (
//           <span
//             className="replacedWordsBoxSpan"
//             onDrop={replacedWords.length ? onDropSpan : null}
//             onDragOver={replacedWords.length ? onBoxDragOver : null}
//           >
//             Перемещай сюда
//           </span>
//         )}
//       </div>
//     </>
//   );
// };

// export default App;
