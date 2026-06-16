import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function AnimalsPage() {
  
  return (
    <CategoryList categories={categories} domain="animals" className="mt-10" />
  );
}