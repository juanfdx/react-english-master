import { useMemo, useState } from 'react';
import { filterWordsByTypeAndCategory, playWord, shuffleArray } from '../../utils/functions';
import { words } from '../../data/words';
// components
import FilterBar from './FilterBar';
import FlipCard from '../ui/FlipCard';
import { Title } from '../ui/Title';


interface Props {
  title: string;
  subtitle: string;
  description?: string;
  type: string;
  category: string;
  variant?: 'word' | 'category'; // category for colors
  excludeTag?: string;
}

export const FlipCardExplorer = ({ title, subtitle, description, type, category, variant = 'word', excludeTag = "none" }: Props) => {

  const [filter, setFilter] = useState("all");

  const allWords = useMemo(() => {
    return filterWordsByTypeAndCategory(words, type, category)
      .filter(word => !word.tags?.includes(excludeTag));
  }, [type, category, excludeTag]); 

  const shuffledWords = useMemo(() => {
    const filteredWords = filter === "all"
      ? allWords
      : allWords.filter((w) => w.tags?.includes(filter) ?? false);

    // Shuffle the array every time the filter changes
    return shuffleArray([...filteredWords]); 
  }, [filter, allWords]);

  // Check if any words have filters (tags property is not empty)
  const hasFilters = allWords.some(
    word => word.tags?.length
  );

   const handleDiscover = (word: string) => {
    // 🗣️ PRONUNCIATION
    playWord(word, "male");
  };



  return (
    <div className="text-slate-900 flex flex-col">

      {/* MAIN */}
      <main className="max-w-7xl mx-auto w-full py-12 flex flex-col items-center">

        {/* TITLE */}     
        <Title 
          title={title} 
          subtitle={subtitle} 
          description={description} 
          marginBottom="mb-10"
        />

        { hasFilters && (
          <FilterBar current={filter} onChange={setFilter} words={allWords} />
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {shuffledWords.map((word) => (
            <FlipCard
              key={word.id}
              word={word}
              onDiscover={handleDiscover}
              variant={variant}
            />
          ))}
        </div>
        
      </main>
    </div>
  );
}