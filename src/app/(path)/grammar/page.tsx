import { useMemo, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import type { Level } from '../../../interfaces/levels';
// components
import { CategoryList } from '../../../components/ui/CategoryList';
import { Filter } from '../../../components/ui/Filter';
import { SearchInput } from '../../../components/form/SearchInput';
// data
import { grammarCategories } from '../../../data/grammar';



export default function GrammarPage() {

  const [statusFilter, setStatusFilter] = useState<Level>("all");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);
  
  const filteredGrammar = useMemo(() => {
    return grammarCategories.filter((grammar) => {
      const matchesSearch =
        grammar.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesFilter = 
        statusFilter === "all" || grammar.level === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [debouncedSearch, statusFilter]);

  const handleFilterChange = (newLevel: Level) => {
    setStatusFilter(newLevel);
  };



  return (
    <section className='flex flex-col'>

      <h1 className='text-3xl font-bold'>Grammar</h1>

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 pt-10 pb-12">
        {/* FILTER */}
        <Filter level={statusFilter} setLevel={handleFilterChange} />

        {/* SEARCH */}
        <SearchInput 
          search={search} 
          setSearch={setSearch} 
          placeholder="🔍 Search" 
        />
      </div>
    
      <CategoryList categories={filteredGrammar} />
  
    </section>
  );
}