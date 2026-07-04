import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function TransportPage() {
  
  return (
    <CategoryList categories={categories} domain="transport" className="mt-10" />
  );
}