import type { AnimalType } from '../../data/nouns/animals';


interface Props {
  current: AnimalType | "all";
  onChange: (value: AnimalType | "all") => void;
}

const buttons: { label: string; value: AnimalType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "⛰️ Land", value: "land" },
  { label: "🌊 Water", value: "water" },
  { label: "☁️ Flying", value: "fly" }
];


export default function FilterBar({ current, onChange }: Props) {

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {buttons.map((btn) => (
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