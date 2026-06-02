import { words } from '../../data/word';



export default function WordList() {

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {words.map((w) => (
        <div
          key={w.id}
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            p-5
            shadow-sm
            hover:shadow-md
            transition
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 capitalize">
              {w.word}
            </h2>

            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
              {w.level}
            </span>
          </div>

          <p className="text-slate-600 mt-2">
            {w.meaning}
          </p>

          <p className="text-slate-500 italic mt-2">
            “{w.example}”
          </p>
        </div>
      ))}
    </div>
  );
}