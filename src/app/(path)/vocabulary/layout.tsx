import { Outlet } from 'react-router';
import { CategoryList } from '../../../components/ui/CategoryList';
import type { Category } from '../../../interfaces/category';
import { Breadcrumbs } from '../../../components/shared/Breadcrumbs';

const lessonLinks: Category[] = [
  {
    id: '1',
    name: 'Nouns',
    icon: '🏷️',
    href: '/vocabulary/nouns',
    category: 'nouns',
    level: 'beginner',
  },
  {
    id: '2',
    name: 'Verbs',
    icon: '🏠',
    href: '/vocabulary/verbs',
    category: 'verbs',
    level: 'beginner',
  },
];


export default function VocabularyLayout() {

    return (
      <section className='flex flex-col '>
      <Breadcrumbs className="mt-4" />
        <CategoryList categories={lessonLinks} />
    <Outlet />
      </section>
    );
}