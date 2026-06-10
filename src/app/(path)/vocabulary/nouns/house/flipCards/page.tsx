import { useMemo, useState } from "react";
import { filterWordsByCategory, playWord, shuffleArray } from '../../../../../../utils/functions';
import { words } from '../../../../../../data/words';
// components
import FilterBar from '../../../../../../components/shared/FilterBar';
import FlipCard from '../../../../../../components/shared/FlipCard';



export default function ApplianceFlipCardsPage() {

  const [filter, setFilter] = useState("all");

  const allAppliances = useMemo(() => {
    return filterWordsByCategory(words, 'appliance');
  }, []); 

  const filteredAppliances = useMemo(() => {
    const animals = filter === "all"
      ? allAppliances
      : allAppliances.filter((a) => a.tags?.includes(filter));

    // Shuffle the array every time the filter changes
    return shuffleArray([...animals]); 
  }, [filter, allAppliances]);

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
            The <span className="text-indigo-600">Appliance</span> Explorer
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Filter by category and flip to learn their names.
          </p>
        </div>

        <FilterBar words={allAppliances} current={filter} onChange={setFilter} />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {filteredAppliances.map((appliance) => (
            <FlipCard
              key={appliance.id}
              word={appliance}
              onDiscover={handleDiscover}
            />
          ))}
        </div>
        
      </main>
    </div>
  );
}