

interface Props {
  success: boolean
  title: string
  score: number
  resetGame: () => void
}


export const QuizResultModal = ({ success, title, score, resetGame }: Props) => {

  return (
    <div className="mt-10 sm:mt-14 text-center bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
     
      <div className="text-5xl mb-4">
        {success ? '🏆' : '🏜️'}
      </div>

      <h2 className="text-3xl font-black mb-2">{title}</h2>
      
      <p className="text-slate-500 mb-6">
        {success 
          ? `You finished with a score of ${score}.` 
          : `You ran out of lives! You achieved a score of ${score}.`
        }
      </p>

      <button
        onClick={resetGame}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700"
      >
        {success ? 'Play Again' : 'Try Again'}
      </button>
    </div>
  )
}