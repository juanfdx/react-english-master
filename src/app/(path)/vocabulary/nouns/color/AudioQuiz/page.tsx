import { useEffect, useMemo, useState } from 'react';
import { filterWordsByCategory, getRandomWord, playWord, shuffleArray } from '../../../../../../utils/functions';
import type { Word } from '../../../../../../interfaces/word';
// data
import { words } from '../../../../../../data/words';
// components
import { QuizOptions } from '../../../../../../components/ui/QuizOptions';
import { Title } from '../../../../../../components/ui/Title';
import { QuizResultModal } from '../../../../../../components/ui/QuizResultModal';
import { GameScoreBoard } from '../../../../../../components/ui/GameScoreBoard';



export default function ColorAudioQuizPage() {

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selected, setSelected] = useState<string | null>(null);
  
  const allColors = useMemo(() => {
    return filterWordsByCategory(words, 'color');
  }, []); 

  const [colors, setColors] = useState([...allColors]);
  const [current, setCurrent] = useState<Word>(getRandomWord(colors));
  const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);

  const isGameOver = lives <= 0 || colors.length < 4;


  useEffect(() => {  
    
    if (isGameOver) return;
    
    const timeout = setTimeout(() => {
      
      playWord(current.word, "male");

      const wrong = colors
        .filter((c) => c.word !== current.word)
        .slice(0, 3);

      const shuffledOptions = shuffleArray([current, ...wrong]).map(
        (a) => a.word
      );

      setDisplayedOptions(shuffledOptions);
    }, 300); // 300ms delay to match flip card animation

    return () => clearTimeout(timeout);

  }, [current, colors, isGameOver]);


  const handleAnswer = (word: string) => {
    //Have to wait until selected is reset in nextQuestion() (to avoid double click bug)
    if (selected !== null) return;

    setSelected(word);

    const isCorrect = word === current.word;

    if (!isCorrect) {
      playWord('wrong', "effect");
    }


    // Always remove the current animal
    const updatedAnimals = colors.filter(
      (c) => c.word !== current.word
    );

    setTimeout(() => {
      setColors(updatedAnimals);

      if (isCorrect) {
        setScore((s) => s + 10);
      } else {
        setLives((l) => l - 1);
      }

      nextQuestion(updatedAnimals);
    }, 900);
  };

  const nextQuestion = (availableAnimals: Word[]) => {
    // to avoid flick effect when changing ✓ Correct! to ✗ Wrong!
    setTimeout(() => {
      setSelected(null);
      // Don't load another card if game is finished
      if (availableAnimals.length >= 4) {
        setCurrent(getRandomWord(availableAnimals));
      }
    }, 200);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setColors([...allColors]);
    setSelected(null);
    setCurrent(getRandomWord([...allColors]));
  }



  
  return (
    <div className="flex flex-col text-slate-900">

      {/* SCORE */}
      <GameScoreBoard score={score} lives={lives} marginBottom="mb-4" />

      <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col items-center">

        {lives <= 0 ? (
          // LOSE MESSAGE
          <QuizResultModal 
            success={false}
            title="Game Over"
            score={score}
            resetGame={resetGame} 
          />

        ) : colors?.length < 4 ? (
          // WIN MESSAGE
          <QuizResultModal 
            success={true}
            title="Game Over"
            score={score}
            resetGame={resetGame} 
          />

        ) : (
          <>
            {/* TITLE */}
            <Title 
              title="Animal" 
              subtitle="Audio Quiz" 
              description="Identify the word spoken. Don't lose your hearts!"
              marginBottom="mb-10"
            />
      
            {/* Listening Card */}
            <div className="w-full bg-white rounded-[3rem] p-12 shadow-xl shadow-slate-200/50 border border-slate-100 text-center mb-12">
              <div className="mb-6">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Listening Lab</span>
                <h1 className="text-3xl font-extrabold mt-2">What did you hear?</h1>
              </div>

              <button 
                onClick={() => {
                  if (isGameOver) return;
                  playWord(current.word, "male");
                }}
                className="w-24 h-24 bg-indigo-600 text-white rounded-full text-4xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center mx-auto pulse cursor-pointer">
                🔊
              </button>
              <p className="mt-6 text-slate-500 font-medium">Click the button to listen again</p>
            </div>
      
            {/* Options */}
            <QuizOptions 
              options={displayedOptions}
              word={current} 
              selected={selected} 
              handleAnswer={handleAnswer} 
            />            
          </>
        )}
      </main>

    </div>
  );
}