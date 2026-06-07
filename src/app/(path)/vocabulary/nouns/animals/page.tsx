import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { animalsCategories } from '../../../../../data/nouns/animals';



export default function AnimalsPage() {
  
  return (
    <CategoryList categories={animalsCategories} className="mt-10" />
  );
}