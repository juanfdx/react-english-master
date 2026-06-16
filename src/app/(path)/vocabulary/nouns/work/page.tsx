import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function WorkPage() {
  
  return (
    <CategoryList categories={categories} domain="work" className="mt-10" />
  );
}