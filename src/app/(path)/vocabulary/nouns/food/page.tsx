import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { foodDrinksCategories } from '../../../../../data/nouns/foodDrinks';



export default function FoodAndDrinksPage() {
  
  return (
    <CategoryList categories={foodDrinksCategories} className="mt-10" />
  );
}