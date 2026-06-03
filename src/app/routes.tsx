import { createBrowserRouter } from 'react-router';
// Layouts
import SiteLayout  from './site/layout';
import PathLayout from './(path)/layout';
import FurnitureLayout from './(path)/nouns/furniture/layout';
// Pages
import HomePage from './site/home/page';
import VocabularyPage from './(path)/vocabulary/page';

import NounsPage from './(path)/nouns/page';
import FurniturePage from './(path)/nouns/furniture/page';
import OfficePage from './(path)/nouns/furniture/office/page';

import GrammarPage from './(path)/grammar/page';
// System
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';
import VerbsPage from './(path)/verbs/page';




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
        children: [
          {
            index: true,
            element: <NounsPage />,
          },
          {
            path: 'furniture', 
            element: <FurnitureLayout />,
            children: [
              {
                index: true,
                element: <FurniturePage />,
              },
              {
                path: 'office',
                element: <OfficePage />,
              },
            ]
          },
        ]
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