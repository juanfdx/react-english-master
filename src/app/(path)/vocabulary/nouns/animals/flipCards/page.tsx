import { useMemo, useState } from "react";
import { filterWordsByCategory, playWord, shuffleArray } from '../../../../../../utils/functions';
import { type AnimalType } from '../../../../../../data/nouns/animals';
import { words } from '../../../../../../data/words';
// components
import FilterBar from '../../../../../../components/shared/FilterBar';
import FlipCard from '../../../../../../components/shared/FlipCard';



export default function FlipCardsPage() {

  const [filter, setFilter] = useState<AnimalType | "all">("all");

  const allAnimals = useMemo(() => {
    return filterWordsByCategory(words, 'animal');
  }, []); 

  const filteredAnimals = useMemo(() => {
    const animals = filter === "all"
      ? allAnimals
      : allAnimals.filter((a) => a.tags?.includes(filter));

    // Shuffle the array every time the filter changes
    return shuffleArray([...animals]); 
  }, [filter, allAnimals]);

   const handleDiscover = (word: string) => {
    // 🗣️ PRONUNCIATION
    playWord(word, "male");
  };



  return (
    <div className="text-slate-900 flex flex-col">

      {/* MAIN */}
      <main className="max-w-7xl mx-auto w-full py-12 flex flex-col items-center">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black">
            The <span className="text-indigo-600">Animal</span> Explorer
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Filter by habitat and flip to learn their names.
          </p>
        </div>

        <FilterBar current={filter} onChange={setFilter} />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {filteredAnimals.map((animal) => (
            <FlipCard
              key={animal.id}
              animal={animal}
              onDiscover={handleDiscover}
            />
          ))}
        </div>
        
      </main>
    </div>
  );
}