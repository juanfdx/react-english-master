import { useState } from "react";
import type { Word } from '../../interfaces/word';

interface Props {
  animal: Word;
  onDiscover: (name: string) => void;
}


export default function FlipCard({ animal, onDiscover }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleClick = () => {
    if (flipped || locked) return;

    setFlipped(true);
    setLocked(true);
    onDiscover(animal.word);

    setTimeout(() => setFlipped(false), 1500);
    setTimeout(() => setLocked(false), 2000);
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
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white rounded-2xl shadow-md">
          {
            animal?.icon 
            ? <span className="text-6xl">{animal.icon}</span>
            : animal?.image 
            ? <img className="w-22" src={animal.image} alt={animal.word} />
            : <span className="text-6xl text-indigo-600">?</span>
          }
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-indigo-600 text-white rounded-2xl">
          <span className="text-xl font-bold uppercase">
            {animal.word}
          </span>
        </div>
      </div>
    </div>
  );
}