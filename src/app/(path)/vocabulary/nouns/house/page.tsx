import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function HousePage() {
  
  return (
    <CategoryList categories={categories} domain="house" className="mt-10" />
  );
}