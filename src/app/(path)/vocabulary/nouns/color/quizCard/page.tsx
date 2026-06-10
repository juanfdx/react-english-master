import { useEffect, useMemo, useState } from "react";
import { filterWordsByCategory, getRandomWord, playWord, shuffleArray } from '../../../../../../utils/functions';
import type { Word } from '../../../../../../interfaces/word';
// data
import { words } from '../../../../../../data/words';
// components
import { QuizFlipCard } from '../../../../../../components/ui/QuizFlipCard';
import { QuizOptions } from '../../../../../../components/ui/QuizOptions';
import { Title } from '../../../../../../components/ui/Title';
import { GameScoreBoard } from '../../../../../../components/ui/GameScoreBoard';
import { QuizResultModal } from '../../../../../../components/ui/QuizResultModal';



export default function ColorQuizCardPage() {

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  
  const allColors = useMemo(() => {
    return filterWordsByCategory(words, 'color');
  }, []); 

  const [colors, setColors] = useState([...allColors]);
  const [current, setCurrent] = useState<Word>(getRandomWord(colors));
  const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);

  // Bank of word answers
  // update options with a delay when `current` or `colors` change
  useEffect(() => {   
    const timeout = setTimeout(() => {
      const wrong = colors
        .filter((c) => c.word !== current.word)
        .slice(0, 3);

      const shuffledOptions = shuffleArray([current, ...wrong]).map(
        (c) => c.word
      );

      setDisplayedOptions(shuffledOptions);
    }, 300); // 300ms delay to match flip card animation

    return () => clearTimeout(timeout);

  }, [current, colors]);


  const handleAnswer = (word: string) => {
    //Have to wait until selected is reset in nextQuestion() (to avoid double click bug)
    if (selected !== null) return;

    setSelected(word);
    setFlipped(true);

    const isCorrect = word === current.word;

    if (isCorrect) {
      // 🗣️ PRONUNCIATION
      playWord(word, "male");
    }else {
      playWord('wrong', "effect");
    }


    // Always remove the current color
    const updatedColors = colors.filter(
      (c) => c.word !== current.word
    );

    setTimeout(() => {
      setColors(updatedColors);

      if (isCorrect) {
        setScore((s) => s + 10);
      } else {
        setLives((l) => l - 1);
      }

      nextQuestion(updatedColors);
    }, 900);
  };

  const nextQuestion = (availableColors: Word[]) => {
    setFlipped(false);
    // to avoid flick effect when changing ✓ Correct! to ✗ Wrong!
    setTimeout(() => {
      setSelected(null);
      // Don't load another card if game is finished
      if (availableColors.length >= 4) {
        setCurrent(getRandomWord(availableColors));
      }
    }, 200);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setColors([...allColors]);
    setFlipped(false);
    setSelected(null);
    setCurrent(getRandomWord([...allColors]));
  }



  
  return (
    <div className="flex flex-col text-slate-900">

      {/* SCORE */}
      <GameScoreBoard score={score} lives={lives} marginBottom="mb-4" />

      <main className="flex-1 max-w-7xl mx-auto flex flex-col items-center">

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
              title="Color" 
              subtitle="Flip Quiz" 
              description="Identify the color shown in the card. Don't lose your hearts!"
              marginBottom="mb-10"
            />
      
            {/* Flip Card */}
            <QuizFlipCard word={current} selected={selected} flipped={flipped} variant="category" />
      
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