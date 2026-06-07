import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { homeCategories } from '../../../../../data/nouns/home';



export default function FurniturePage() {
  
  return (
    <CategoryList categories={homeCategories} className="mt-10" />
  );
}