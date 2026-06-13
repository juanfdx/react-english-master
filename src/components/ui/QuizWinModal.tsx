import { useEffect } from 'react';
import { playWord } from '../../utils/functions';


interface Props {
  title: string
  errors: number
  resetGame: () => void
}

export const QuizWinModal = ({ title, errors, resetGame }: Props) => {

  useEffect(() => {
    playWord('success', 'effect');
  }, []);

  
  return (
    <div className="mt-10 sm:mt-14 text-center bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
     
      <div className="text-5xl mb-4">🏆</div>
      <h2 className="text-3xl font-black mb-2">{title}</h2>
      <p className="text-slate-500 mb-6">
        You finished with {errors} mistakes.
      </p>

      <button
        onClick={resetGame}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700"
      >
        Play Again
      </button>
    </div>
  )
}