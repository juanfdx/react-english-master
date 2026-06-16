import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function ClothesPage() {
  
  return (
    <CategoryList categories={categories} domain="clothes" className="mt-10" />
  );
}