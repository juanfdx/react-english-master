

type Props = {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  placeholder?: string
}


export const SearchInput = ({ search, setSearch,  placeholder }: Props) => {

  return ( 
    <input
      type="text"
      name="search"
      placeholder={`${placeholder ? placeholder : "🔍 Search"}...`}
      value={search}
      autoComplete='off'
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      className="w-full xl:max-w-60 px-5 py-2 rounded-full bg-white border border-indigo-400 hover:ring-1 transition font-medium text-slate-500 outline-hidden focus:outline-none focus:ring-1  focus:border-indigo-600"
    />
  )
}