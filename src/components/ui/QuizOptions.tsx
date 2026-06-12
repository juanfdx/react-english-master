import type { Word } from '../../interfaces/word';


interface Props {
  options: string[];
  word: Word;
  selected: string | null;
  handleAnswer: (answer: string) => void;
}


export const QuizOptions = ({ options, word, selected, handleAnswer }: Props) => {
console.log(options);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
      {options.map((opt) => {
        const isSelected = selected === opt;

        return (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            disabled={!!selected}
            className={`
              py-4 px-6 rounded-2xl font-bold border-2 transition-all
              shadow-sm active:scale-95
              ${
                isSelected
                  ? opt === word.word
                    ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                    : "bg-rose-50 border-rose-500 text-rose-600 shake"
                  : "bg-white border-slate-100 hover:border-indigo-500 hover:text-indigo-600"
              }
            `}
          >
            {opt}
          </button>
        );
      })}
    </div>
  )
}