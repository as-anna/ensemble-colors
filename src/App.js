import './App.css';
import { useState } from 'react';
import { CHARACTER_COLORS_MAP } from './consts/CharacterColors';
import { CharacterChip } from './components/CharacterChip';
import { map, shuffle } from 'lodash';
import { useCorrectAnswers } from './useCorrectAnswers';

function App() {
  const colors = map(CHARACTER_COLORS_MAP, 'color');
  const [userAnswers, setUserAnswers] = useState({});
  const [activeColorStack, setActiveColorStack] = useState(shuffle(colors));
  const [showResults, setShowResults] = useState(false);
  const activeColor = activeColorStack[0];
  const { numCorrectAnswers, totalQuestions } = useCorrectAnswers({userAnswers});
  const totalPercent = Math.round((100/totalQuestions) * numCorrectAnswers * 100) / 100;

  return (
    <div className='app'>
      <div className='chip-grid'>
        {map(CHARACTER_COLORS_MAP, character => 
          <CharacterChip
            key={character.key}
            character={character}
            activeColor={activeColor}
            showResults={showResults}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            setActiveColorStack={setActiveColorStack}
          />
        )}
      </div>
      <div className='footer'>
        {showResults && <div className='result'>SCORE: {numCorrectAnswers} / {totalQuestions} ({totalPercent}%)</div>}
        {!showResults && <div className='active-color' style={{width: '80px', height: '80px', borderRadius: '50%', backgroundColor: activeColorStack[0]}}></div>}
        {!showResults && <button className='finish-button' onClick={() => setShowResults(true)}>FINISH</button>}
      </div>
    </div>
  );
}

export default App;
