// Components
import type { Level } from '../../interfaces/levels';
import { FilterButton } from './FilterButton';


type Props = {
  level: Level
  setLevel: (level: Level) => void
}

export const Filter = ({ level, setLevel }: Props) => {


  return (
    <div className="max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

        <FilterButton level={level} setLevel={setLevel} />

      </div>
    </div>
  )
}