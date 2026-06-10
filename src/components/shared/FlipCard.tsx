import { useState } from "react";
import type { Word } from '../../interfaces/word';
import { Icon } from '../ui/Icon';

interface Props {
  word: Word;
  onDiscover: (name: string) => void;
  variant?: 'word' | 'category';
}


export default function FlipCard({ word, onDiscover, variant = 'word' }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleClick = () => {
    if (flipped || locked) return;

    setFlipped(true);
    setLocked(true);
    onDiscover(word.word);

    setTimeout(() => setFlipped(false), 1000);
    setTimeout(() => setLocked(false), 1500);
  };


  return (
    <div className="perspective h-48 w-full">
      <div
        onClick={handleClick}
        className={`
          relative w-full h-full cursor-pointer
          transition-transform duration-500 transform-style-preserve-3d
          ${flipped ? "rotate-y-180" : ""}
          ${locked ? "pointer-events-none" : ""}
        `}
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* FRONT */} 
        {variant === 'word' && (
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white rounded-2xl shadow-md">
            {
              word?.icon 
              ? <span className="text-6xl">{word.icon}</span>
              : word?.image 
              ? <img className="w-22 h-22" src={word.image} alt={word.word} />
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

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-indigo-600 text-white rounded-2xl">
          <p className="text-xl text-center font-bold uppercase px-4">
            {word.word}
          </p>
        </div>
      </div>
    </div>
  );
}