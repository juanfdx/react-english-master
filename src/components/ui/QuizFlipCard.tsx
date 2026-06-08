import type { Word } from '../../interfaces/word'

interface Props {
  word: Word
  selected: string | null
  flipped: boolean
}


export const QuizFlipCard = ({ word, selected, flipped }: Props) => {

  return (
    <div className="perspective w-64 h-64 mb-10">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl flex items-center justify-center text-8xl">
        {
          word?.icon 
          ? <span className="text-6xl">{word.icon}</span>
          : word?.image 
          ? <img className="w-22" src={word.image} alt={word.word} />
          : <span className="text-6xl text-indigo-600">?</span>
        }
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-600 rounded-3xl shadow-xl flex items-center justify-center text-white text-2xl font-bold">
          {selected === word.word ? "✓ Correct!" : "✗ Wrong!"}
        </div>
      </div>
    </div>
  )
}