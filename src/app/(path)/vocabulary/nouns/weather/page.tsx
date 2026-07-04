import { CategoryList } from '../../../../../components/ui/CategoryList';
// data
import { categories } from '../../../../../data/categories';



export default function WeatherPage() {
  
  return (
    <CategoryList categories={categories} domain="weather" className="mt-10" />
  );
}