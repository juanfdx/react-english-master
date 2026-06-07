import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { workCategories } from '../../../../../data/nouns/office';



export default function WorkPage() {
  
  return (
    <CategoryList categories={workCategories} className="mt-10" />
  );
}