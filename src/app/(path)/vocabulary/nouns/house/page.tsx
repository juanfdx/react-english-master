import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { houseCategories } from '../../../../../data/nouns/home';



export default function HousePage() {
  
  return (
    <CategoryList categories={houseCategories} className="mt-10" />
  );
}