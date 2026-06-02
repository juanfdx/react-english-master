import { useMemo, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import type { Level } from '../../../interfaces/levels';
// components
import { CategoryList } from '../../../components/ui/CategoryList';
import { Filter } from '../../../components/ui/Filter';
import { SearchInput } from '../../../components/form/SearchInput';
// data
import { verbCategories } from '../../../data/verbs';



export default function VerbsPage() {

  const [statusFilter, setStatusFilter] = useState<Level>("all");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const filteredVerbs = useMemo(() => {
    return verbCategories.filter((verb) => {
      const matchesSearch =
        verb.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesFilter = 
        statusFilter === "all" || verb.level === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [debouncedSearch, statusFilter]);


  const handleFilterChange = (newLevel: Level) => {
    setStatusFilter(newLevel);
  };



  return (
    <section className='flex flex-col'>

      <h1 className='text-3xl font-bold'>Verbs</h1>

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
    
      <CategoryList categories={filteredVerbs} />
  
    </section>
  );
}