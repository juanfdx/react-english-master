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



export default function ApplianceQuizCardPage() {

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  
  const allAppliances = useMemo(() => {
    return filterWordsByCategory(words, 'appliance');
  }, []); 

  const [appliances, setAppliances] = useState([...allAppliances]);
  const [current, setCurrent] = useState<Word>(getRandomWord(appliances));
  const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);

  // Bank of word answers
  // update options with a delay when `current` or `appliances` change
  useEffect(() => {   
    const timeout = setTimeout(() => {
      const wrong = appliances
        .filter((a) => a.word !== current.word)
        .slice(0, 3);

      const shuffledOptions = shuffleArray([current, ...wrong]).map(
        (a) => a.word
      );

      setDisplayedOptions(shuffledOptions);
    }, 300); // 300ms delay to match flip card animation

    return () => clearTimeout(timeout);

  }, [current, appliances]);


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


    // Always remove the current animal
    const updatedAnimals = appliances.filter(
      (a) => a.word !== current.word
    );

    setTimeout(() => {
      setAppliances(updatedAnimals);

      if (isCorrect) {
        setScore((s) => s + 10);
      } else {
        setLives((l) => l - 1);
      }

      nextQuestion(updatedAnimals);
    }, 900);
  };

  const nextQuestion = (availableAnimals: Word[]) => {
    setFlipped(false);
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
    setAppliances([...allAppliances]);
    setFlipped(false);
    setSelected(null);
    setCurrent(getRandomWord([...allAppliances]));
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

        ) : appliances?.length < 4 ? (
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
              title="Appliance" 
              subtitle="Flip Quiz" 
              description="Identify the animal shown in the card. Don't lose your hearts!"
              marginBottom="mb-10"
            />
      
            {/* Flip Card */}
            <QuizFlipCard word={current} selected={selected} flipped={flipped} />
      
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