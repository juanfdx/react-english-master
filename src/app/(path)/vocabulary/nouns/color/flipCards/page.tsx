import { useMemo } from "react";
import { filterWordsByCategory, playWord, shuffleArray } from '../../../../../../utils/functions';
import { words } from '../../../../../../data/words';
// components
import FlipCard from '../../../../../../components/shared/FlipCard';



export default function ColorFlipCardsPage() {


  const allColors = useMemo(() => {
    return filterWordsByCategory(words, 'color');
  }, []); 

  const shuffledColors = useMemo(() => {
    return shuffleArray([...allColors]);
  }, [allColors]);

  
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
            The <span className="text-indigo-600">Color</span> Explorer
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Filter by habitat and flip to learn their names.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {shuffledColors.map((color) => (
            <FlipCard
              key={color.id}
              word={color}
              onDiscover={handleDiscover}
              variant="svg"
            />
          ))}
        </div>
        
      </main>
    </div>
  );
}