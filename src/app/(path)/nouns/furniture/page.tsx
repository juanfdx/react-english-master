import { CategoryList } from '../../../../components/ui/CategoryList';
// data
import { furniture } from '../../../../data/nouns/furniture';



export default function FurniturePage() {
  
  return (
    <CategoryList categories={furniture} className="mt-10" />
  );
}