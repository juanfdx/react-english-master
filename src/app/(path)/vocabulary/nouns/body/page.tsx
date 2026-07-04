import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function HealthAndBodyPage() {
  
  return (
    <CategoryList categories={categories} domain="body" className="mt-10" />
  );
}