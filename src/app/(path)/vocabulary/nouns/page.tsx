import { useMemo, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import type { Level } from '../../../../interfaces/levels';
// components
import { CategoryList } from '../../../../components/ui/CategoryList';
import { Filter } from '../../../../components/ui/Filter';
import { SearchInput } from '../../../../components/form/SearchInput';
// data
import { categories } from '../../../../data/categories';



export default function NounsPage() {

  const [statusFilter, setStatusFilter] = useState<Level>("all");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const filteredNouns = useMemo(() => {
    return categories.filter((noun) => {
      const matchesSearch =
        noun.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesFilter = 
        statusFilter === "all" || noun.level === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [debouncedSearch, statusFilter]);


  const handleFilterChange = (newLevel: Level) => {
    setStatusFilter(newLevel);
  };



  return (
    <section className='flex flex-col '>

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
    
      <CategoryList categories={filteredNouns} domain="nouns" />
  
    </section>
  );
}