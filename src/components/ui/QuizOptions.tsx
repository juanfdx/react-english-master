import { useEffect, useRef, useState } from 'react';
import type { Word } from '../../interfaces/word';
// components
import { Icon } from './Icon';
import { FlashcardImage } from './FlashcardImage';


interface Props {
  variant?: 'text' | 'image';
  py?: string;
  options: Word[];
  word: Word;
  selected: string | null;
  handleAnswer: (answer: string) => void;
}


export const QuizOptions = ({ variant = 'text', py = 'py-4', options, word, selected, handleAnswer }: Props) => {
  
  // to control disable time when user can click on option button after new question is loaded
  const [canAnswer, setCanAnswer] = useState(true);
  const timeoutRef = useRef<number | null>(null);


  const handleCanAnswer = () => {
    setCanAnswer(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCanAnswer(true);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // classes
  const defaultClasses = canAnswer
  ? 'bg-white border-slate-100 hover:border-indigo-500 hover:text-indigo-600'
  : 'bg-white border-slate-100';

  const interactionClasses = canAnswer
    ? 'active:scale-95'
    : 'cursor-not-allowed';



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {options.map((opt) => {
        const isSelected = selected === opt.word;

        return (
          <button
            key={opt.id}
            onClick={() => {handleAnswer(opt.word); handleCanAnswer();}}
            disabled={!canAnswer || !!selected}
            className={`
              ${py} px-6 flex items-center justify-center rounded-2xl font-bold border-2 transition-all
              shadow-sm
              ${variant === 'image' ? 'min-h-33' : ''}
              ${interactionClasses}
              ${
                isSelected
                  ? opt.word === word.word
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                    : 'bg-rose-50 border-rose-500 text-rose-600 shake'
                  : defaultClasses
              }
            `}
          >
            {variant === 'text' 
              ? <span className="capitalize">{opt.word}</span>
                : opt.icon
                ? <span className="text-6xl">{opt.icon}</span>
                : opt.image
                ? <FlashcardImage src={opt.image} alt={opt.word} scale={opt.scale} />
                : opt?.svg 
                ? <Icon 
                    type={opt.category} 
                    className={`w-18 h-18 ${opt.svg}`} 
                    strokeColor={opt.word === 'white' ? 'black' : 'none'} 
                  />
              : <span className="text-6xl text-indigo-600">?</span>     
            }
          </button>
        );
      })}
    </div>
  )
}