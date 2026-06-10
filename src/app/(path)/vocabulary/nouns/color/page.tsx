import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { colorCategories } from '../../../../../data/nouns/colors';



export default function ColorsPage() {
  
  return (
    <CategoryList categories={colorCategories} className="mt-10" />
  );
}