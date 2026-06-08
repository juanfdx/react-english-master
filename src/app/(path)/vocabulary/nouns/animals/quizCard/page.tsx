import { useMemo, useState } from "react";
import { filterWordsByCategory, getRandomWord, playWord, shuffleArray } from '../../../../../../utils/functions';
import type { Word } from '../../../../../../interfaces/word';
// data
import { words } from '../../../../../../data/words';
// components
import { QuizFlipCard } from '../../../../../../components/ui/QuizFlipCard';
import { QuizOptions } from '../../../../../../components/ui/QuizOptions';
import { Title } from '../../../../../../components/ui/Title';
import { GameScoreBoard } from '../../../../../../components/ui/GameScoreBoard';
import { QuizLoseModal } from '../../../../../../components/ui/QuizLoseModal';



export default function QuizCardPage() {

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  
  const allAnimals = useMemo(() => {
    return filterWordsByCategory(words, 'animal');
  }, []); 

  const [current, setCurrent] = useState<Word>(getRandomWord(allAnimals));

  // Bank of word answers
  const options = useMemo(() => {
    const wrong = allAnimals
      .filter((a) => a.word !== current.word)
      .slice(0, 3);

    return shuffleArray([current, ...wrong]).map((a) => a.word);
  }, [current, allAnimals]);


  const handleAnswer = (word: string) => {
    setSelected(word);
    setFlipped(true);

    const isCorrect = word === current.word;

    if (isCorrect) {
      // 🗣️ PRONUNCIATION
      playWord(word, "male");
    }else {
      playWord('wrong', "effect");
    }

    setTimeout(() => {
      if (isCorrect) {
        setScore((s) => s + 10);

      } else {
        setLives((l) => l - 1);
      }

      nextQuestion();
    }, 900);
  };

  const nextQuestion = () => {
    setFlipped(false);
    // to avoid flick effect when changing ✓ Correct! to ✗ Wrong!
    setTimeout(() => {
      setSelected(null);
      setCurrent(getRandomWord(allAnimals));
    }, 200);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
  }



  
  return (
    <div className="flex flex-col text-slate-900">

      {/* SCORE */}
      <GameScoreBoard score={score} lives={lives} marginBottom="mb-4" />

      <main className="flex-1 max-w-7xl mx-auto flex flex-col items-center">

        {lives <= 0 ? (
          // LOSE MESSAGE
          <QuizLoseModal 
            title="Game Over"
            score={score}
            resetGame={resetGame} 
          />

        ) : (
          <>
            {/* TITLE */}
            <Title 
              title="Animal" 
              subtitle="Mastery Quiz" 
              description="Identify the animal shown in the card. Don't lose your hearts!"
              marginBottom="mb-10"
            />
      
            {/* Flip Card */}
            <QuizFlipCard word={current} selected={selected} flipped={flipped} />
      
            {/* Options */}
            <QuizOptions 
              options={options} 
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