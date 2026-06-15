import type { Word } from '../../interfaces/word';
import { capitalizeAllWords } from '../../utils/strings';


interface Props {
  words: Word[];
  current: string | "all";
  onChange: (value: string | "all") => void;
}

const tagEmojis: Record<string, string> = {
  water: "🌊",
  land: "⛰️",
  fly: "☁️",
  insects: "🦋",
};



export default function FilterBar({ words, current, onChange }: Props) {

  const setOfTags = new Set(words.flatMap(word => word.tags ?? []));
  const filterButtons = [ "all", ...setOfTags].map(tag => ({
     label: `${tagEmojis[tag] ?? ""} ${capitalizeAllWords(tag)}`, 
     value: tag 
  }));

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {filterButtons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => onChange(btn.value)}
          className={`
            px-6 py-2 rounded-full border font-semibold transition-all
            ${current === btn.value
              ? "bg-indigo-600 text-white border-indigo-700 shadow-lg"
              : "bg-white border-slate-200 hover:border-indigo-300"
            }
          `}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}