import type { Word } from '../../interfaces/word'
// components
import { Icon } from './Icon';
import { FlashcardImage } from './FlashcardImage';

interface Props {
  word: Word
  selected: string | null
  flipped: boolean
  variant?: 'word' | 'category';
}


export const QuizFlipCard = ({ word, selected, flipped, variant = 'word' }: Props) => {

  return (
    <div className="perspective w-64 h-64 mb-10">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        
        {/* FRONT */} 
        {variant === 'word' && (
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white rounded-2xl shadow-md">
            {
              word?.icon 
              ? <span className="text-6xl">{word.icon}</span>
              : word?.image 
              ? <FlashcardImage src={word.image} alt={word.word} category={word.category} />
              : word?.svg 
              ? <Icon type={word.word} className={`w-18 h-18 ${word.svg}`}  />
              : <span className="text-6xl text-indigo-600">?</span>
            }
          </div>
        )}
        {variant === 'category' && (
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white rounded-2xl shadow-md">
            <Icon 
              type={word.category} 
              className={`w-18 h-18 ${word.svg}`} 
              strokeColor={word.word === 'white' ? 'black' : 'none'}
            />
          </div>
        )}

        {/* BACK */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-600 rounded-3xl shadow-xl flex items-center justify-center text-white text-2xl font-bold">
          {selected === word.word ? "✓ Correct!" : "✗ Wrong!"}
        </div>
      </div>
    </div>
  )
}