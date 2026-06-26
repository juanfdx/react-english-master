import { useEffect, useMemo, useState } from 'react';
import {
  filterWordsByTypeAndCategory,
  getRandomWord,
  playWord,
  shuffleArray
} from '../../utils/functions';

import type { Word } from '../../interfaces/word';
import { words } from '../../data/words';

// components
import { GameScoreBoard } from '../ui/GameScoreBoard';
import { QuizResultModal } from '../ui/QuizResultModal';
import { Title } from '../ui/Title';
import { QuizOptions } from '../ui/QuizOptions';

interface Props {
  title: string;
  type: string;
  category: string;
}

export const QuestionQuizGame = ({ title, type, category }: Props) => {

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selected, setSelected] = useState<string | null>(null);

  // ✅ only words WITH definition
  const filteredWords = useMemo(() => {
    return filterWordsByTypeAndCategory(words, type, category)
      .filter((w) => Boolean(w.definition));
  }, [type, category]);

  const [selectedWords, setSelectedWords] = useState<Word[]>(filteredWords);
  const [current, setCurrent] = useState<Word>(() => getRandomWord(filteredWords));
  const [displayedOptions, setDisplayedOptions] = useState<Word[]>([]);

  const isGameOver = lives <= 0 || selectedWords.length < 4;

  useEffect(() => {
    if (isGameOver) return;

    const timeout = setTimeout(() => {

      // 🔊 OPTION 1: play definition instead of word
      playWord(current.word, 'male', 'en', 'definitions');

      const shuffledWords = shuffleArray(selectedWords);

      const wrong = shuffledWords
        .filter((w) => w.word !== current.word)
        .slice(0, 3);

      const shuffledOptions = shuffleArray([current, ...wrong]);

      setDisplayedOptions(shuffledOptions);
    }, 300);

    return () => clearTimeout(timeout);

  }, [current, selectedWords, isGameOver]);

  const handleAnswer = (word: string) => {
    if (selected !== null) return;

    setSelected(word);

    const isCorrect = word === current.word;

    if (!isCorrect) 
      playWord('wrong', "effect");  
    else
      playWord(current.word, "male");
    
   

    const updatedWords = selectedWords.filter(
      (w) => w.word !== current.word
    );

    setTimeout(() => {
      setSelectedWords(updatedWords);

      if (isCorrect) setScore((s) => s + 10);
      else setLives((l) => l - 1);

      nextQuestion(updatedWords);
    }, 900);
  };

  const nextQuestion = (availableWords: Word[]) => {

    setTimeout(() => {
      setSelected(null);

      if (availableWords.length >= 4) {
        setCurrent(getRandomWord(availableWords));
      }

    }, 200);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setSelected(null);

    const fresh = filterWordsByTypeAndCategory(words, type, category)
      .filter((w) => Boolean(w.definition));

    setSelectedWords(fresh);
    setCurrent(getRandomWord(fresh));
  };


  
  return (
    <div className="flex flex-col text-slate-900">

      <GameScoreBoard score={score} lives={lives} marginBottom="mb-4" />

      <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col items-center">

        {lives <= 0 ? (
          <QuizResultModal
            success={false}
            title="Game Over"
            score={score}
            resetGame={resetGame}
          />
        ) : selectedWords.length < 4 ? (
          <QuizResultModal
            success={true}
            title="Game Completed"
            score={score}
            resetGame={resetGame}
          />
        ) : (
          <>
            <Title
              title={title}
              subtitle="Listening Quiz"
              description="Listen to the question and choose the correct answer."
              marginBottom="mb-10"
            />

            {/* LISTENING CARD */}
            <div className="w-full bg-white rounded-[3rem] p-12 shadow-xl shadow-slate-200/50 border border-slate-100 text-center mb-12">

              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Question
              </span>

              <h1 className="text-2xl font-extrabold mt-3">
                {current.definition}
              </h1>

              <button
                onClick={() => {
                  if (isGameOver) return;
                  playWord(current.word, 'male', 'en', 'definitions');
                }}
                className="w-24 h-24 bg-indigo-600 text-white rounded-full text-4xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center mx-auto pulse mt-5 cursor-pointer"
              >
                🔊
              </button>

              <p className="mt-6 text-slate-500 font-medium">
                Click the button to listen again
              </p>
            </div>

            {/* OPTIONS */}
            <QuizOptions
              variant="image"
              // py="py-6"
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
};