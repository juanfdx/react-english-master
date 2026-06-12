import type { Word } from '../../interfaces/word';
import { Icon } from './Icon';


interface Props {
  variant?: 'text' | 'image';
  options: Word[];
  word: Word;
  selected: string | null;
  handleAnswer: (answer: string) => void;
}


export const QuizOptions = ({ variant = 'text', options, word, selected, handleAnswer }: Props) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
      {options.map((opt) => {
        const isSelected = selected === opt.word;

        return (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt.word)}
            disabled={!!selected}
            className={`
              py-4 px-6 flex items-center justify-center rounded-2xl font-bold border-2 transition-all
              shadow-sm active:scale-95
              ${
                isSelected
                  ? opt.word === word.word
                    ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                    : "bg-rose-50 border-rose-500 text-rose-600 shake"
                  : "bg-white border-slate-100 hover:border-indigo-500 hover:text-indigo-600"
              }
            `}
          >
            {variant === 'text' 
              ? <span className="capitalize">{opt.word}</span>
                : opt.icon
                ? <span className="text-[46px]">{opt.icon}</span>
                : opt.image
                ? <img className="w-20 h-20" src={opt.image} alt={opt.word} />
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