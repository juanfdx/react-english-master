import { levels, type Level } from '../../interfaces/levels'


type Props = {
  level: Level,
  setLevel: (level: Level) => void
}

export const FilterButton = ({ level, setLevel }: Props) => {
  return (
    <>
      {levels.map((lv) => (
        <button 
          key={lv}
          className={`
            px-5 py-2 rounded-full border font-medium
            ${lv === level ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-white  border-slate-200 hover:border-indigo-400 transition"}
          `}
          onClick={() => setLevel(lv)}
        >
          {lv === "all" ? "All Levels" : lv}
        </button>
      ))}
    </>
  )
}