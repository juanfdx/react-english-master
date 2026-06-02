import { createBrowserRouter } from 'react-router';
// Layouts
import SiteLayout  from './site/layout';
import PathLayout from './path/layout';
// Pages
import HomePage from './site/home/page';
import VocabularyPage from './path/vocabulary/page';
import NounsPage from './path/nouns/page';
// System
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';
import GrammarPage from './path/grammar/page';
import VerbsPage from './path/verbs/page';




export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />, 
    errorElement: <ErrorPage />, 
    children: [
      {
        index: true, 
        element: <HomePage />,  
      },   
    ]
  },
  {
    path: '/path',
    element: <PathLayout />, 
    errorElement: <ErrorPage />, 
    children: [
      {
        path: 'vocabulary', 
        element: <VocabularyPage />,
      },
      {
        path: 'grammar', 
        element: <GrammarPage />,
      },
      {
        path: 'nouns', 
        element: <NounsPage />,
      },
      {
        path: 'verbs', 
        element: <VerbsPage />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
])