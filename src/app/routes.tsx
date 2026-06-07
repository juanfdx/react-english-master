import { createBrowserRouter, Navigate } from 'react-router';
// Layouts
import SiteLayout  from './site/layout';
import PathLayout from './(path)/layout';
import FurnitureLayout from './(path)/vocabulary/nouns/furniture/layout';
import AnimalsLayout from './(path)/vocabulary/nouns/animals/layout';
// Pages
import HomePage from './site/home/page';

import NounsPage from './(path)/vocabulary/nouns/page';
import FurniturePage from './(path)/vocabulary/nouns/furniture/page';
import OfficePage from './(path)/vocabulary/nouns/furniture/office/page';
import KitchenPage from './(path)/vocabulary/nouns/furniture/kitchen/page';
import BedroomPage from './(path)/vocabulary/nouns/furniture/bedroom/page';
import LivingRoomPage from './(path)/vocabulary/nouns/furniture/livingRoom/page';
import BathroomPage from './(path)/vocabulary/nouns/furniture/bathroom/page';
import LaundryRoomPage from './(path)/vocabulary/nouns/furniture/laundryRoom/page';
import BackyardPage from './(path)/vocabulary/nouns/furniture/backyard/page';
// Animals
import AnimalsPage from './(path)/vocabulary/nouns/animals/page';
import FlipCardsPage from './(path)/vocabulary/nouns/animals/flipCards/page';
import QuizCardPage from './(path)/vocabulary/nouns/animals/quizCard/page';

// System
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';
import VerbsPage from './(path)/vocabulary/verbs/page';




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
        children: [
          {
            index: true,
            element: <Navigate to="nouns" replace />,
          },
          {
            path: 'nouns', 
            children: [
              {
                index: true,
                element: <NounsPage />,
              },
              {
                path: 'home', 
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
                  {
                    path: 'kitchen',
                    element: <KitchenPage />,
                  },
                  {
                    path: 'bedroom',
                    element: <BedroomPage />,
                  },
                  {
                    path: 'living-room',
                    element: <LivingRoomPage />,
                  },
                  {
                    path: 'bathroom',
                    element: <BathroomPage />,
                  },
                  {
                    path: 'laundry-room',
                    element: <LaundryRoomPage />,
                  },
                  {
                    path: 'backyard',
                    element: <BackyardPage />,
                  },
                ]
              },
              {
                path: 'animals', 
                element: <AnimalsLayout />,
                children: [
                  {
                    index: true,
                    element: <AnimalsPage />,
                  },
                  {
                    path: 'flip-cards',
                    element: <FlipCardsPage />,
                  },
                  {
                    path: 'quiz-card',
                    element: <QuizCardPage />,
                  },
                ]
              }
            ]
          },
          {
            path: 'verbs', 
            element: <VerbsPage />,
          },
        ]
      },
      {
        path: 'grammar',
        children: [
          {
            index: true,
            element: <Navigate to="to-be" replace />,
          },{
            path: 'to-be',
            element: <div>To Be</div>,
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
])