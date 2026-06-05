import { useMemo, useState } from "react";
import { formatToSlug, playWord, shuffleArray } from '../../../../../utils/functions';
import { animalData, type AnimalType } from '../../../../../data/nouns/animals';
import FilterBar from '../../../../../components/shared/FilterBar';
import FlipCard from '../../../../../components/shared/FlipCard';



export default function FlipCardsPage() {

  const [filter, setFilter] = useState<AnimalType | "all">("all");

  const filteredAnimals = useMemo(() => {
    const animals = filter === "all"
      ? animalData
      : animalData.filter((a) => a.type === filter);

    // Shuffle the array every time the filter changes
    return shuffleArray(animals); 
  }, [filter]);

   const handleDiscover = (name: string) => {
    const word = formatToSlug(name);
    // 🗣️ PRONUNCIATION
    playWord(word, "nouns", "male");
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
              key={animal.name}
              animal={animal}
              onDiscover={handleDiscover}
            />
          ))}
        </div>
        
      </main>
    </div>
  );
}