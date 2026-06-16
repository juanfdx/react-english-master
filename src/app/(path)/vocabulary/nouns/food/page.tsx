import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function FoodAndDrinksPage() {
  
  return (
    <CategoryList categories={categories} domain="food" className="mt-10" />
  );
}