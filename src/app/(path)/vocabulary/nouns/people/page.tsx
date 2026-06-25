import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function PeoplePage() {
  
  return (
    <CategoryList categories={categories} domain="people" className="mt-10" />
  );
}