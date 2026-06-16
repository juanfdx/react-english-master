import { Link } from 'react-router';
import type { Category } from '../../interfaces/category';

interface Props {
  categories: Category[];
  domain: string
  className?: string
}


export const CategoryList = ({ categories, domain, className }: Props) => {

  const filteredCategories = categories.filter((category) => category.domain === domain);

  
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}>
      {filteredCategories.map((category) => (
        <Link
          key={category.id}
          to={category.href}
          className="
            group
            bg-white
            border border-slate-200
            rounded-3xl
            p-6
            flex flex-col items-center
            justify-center
            text-center
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <span className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
            {category.icon}
          </span>

          <span className="font-semibold text-slate-800 group-hover:text-indigo-600">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}