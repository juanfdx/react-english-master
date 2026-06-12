import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { houseCategories } from '../../../../../data/nouns/house';



export default function HousePage() {
  
  return (
    <CategoryList categories={houseCategories} className="mt-10" />
  );
}