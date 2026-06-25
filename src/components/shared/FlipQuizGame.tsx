import { useEffect, useMemo, useState } from 'react';
import { filterWordsByTypeAndCategory, getRandomWord, playWord, shuffleArray } from '../../utils/functions';
import type { Word } from '../../interfaces/word';
import { words } from '../../data/words';
// components
import { GameScoreBoard } from '../ui/GameScoreBoard';
import { QuizResultModal } from '../ui/QuizResultModal';
import { Title } from '../ui/Title';
import { QuizFlipCard } from '../ui/QuizFlipCard';
import { QuizOptions } from '../ui/QuizOptions';


interface Props {
  title: string;
  description: string;
  type: string;
  category: string;
  variant?: 'word' | 'category';
}

export const FlipQuizGame = ({ title, type, category, description, variant }: Props) => {

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  
  const filteredWords = useMemo(() => {
    return filterWordsByTypeAndCategory(words, type, category);
  }, [type, category]); 

  const [selectedWords, setSelectedWords] = useState([...filteredWords]);
  const [current, setCurrent] = useState<Word>(getRandomWord(selectedWords));
  const [displayedOptions, setDisplayedOptions] = useState<Word[]>([]);

  // Bank of word answers
  // update options with a delay when `current` or `appliances` change
  useEffect(() => {   
    const timeout = setTimeout(() => {

      const shuffledWords = shuffleArray(selectedWords);

      const wrong = shuffledWords
        .filter((w) => w.word !== current.word)
        .slice(0, 3);

      const shuffledOptions = shuffleArray([current, ...wrong])

      setDisplayedOptions(shuffledOptions);
    }, 300); // 300ms delay to match flip card animation

    return () => clearTimeout(timeout);

  }, [current, selectedWords]);


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


    // Always remove the current word
    const updatedWords = selectedWords.filter(
      (w) => w.word !== current.word
    );

    setTimeout(() => {
      setSelectedWords(updatedWords);

      if (isCorrect) {
        setScore((s) => s + 10);
      } else {
        setLives((l) => l - 1);
      }

      nextQuestion(updatedWords);
    }, 900);
  };

  const nextQuestion = (availableWords: Word[]) => {
    setFlipped(false);
    // to avoid flick effect when changing ✓ Correct! to ✗ Wrong!
    setTimeout(() => {
      setSelected(null);
      // Don't load another card if game is finished
      if (availableWords.length >= 4) {
        setCurrent(getRandomWord(availableWords));
      }
    }, 200);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setSelectedWords([...filteredWords]);
    setFlipped(false);
    setSelected(null);
    setCurrent(getRandomWord([...filteredWords]));
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

        ) : selectedWords?.length < 4 ? (
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
              title={title} 
              subtitle="Flip Quiz" 
              description={description}
              marginBottom="mb-10"
            />
      
            {/* Flip Card */}
            <QuizFlipCard 
              word={current} 
              selected={selected} 
              flipped={flipped} 
              variant={variant} 
            />
      
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