import { createBrowserRouter, Navigate } from 'react-router';
// Layouts
import SiteLayout  from './site/layout';
import PathLayout from './(path)/layout';
import FurnitureLayout from './(path)/nouns/furniture/layout';
import AnimalsLayout from './(path)/nouns/animals/layout';
// Pages
import HomePage from './site/home/page';

import NounsPage from './(path)/nouns/page';
import FurniturePage from './(path)/nouns/furniture/page';
import OfficePage from './(path)/nouns/furniture/office/page';
import KitchenPage from './(path)/nouns/furniture/kitchen/page';
import BedroomPage from './(path)/nouns/furniture/bedroom/page';
import LivingRoomPage from './(path)/nouns/furniture/livingRoom/page';
import BathroomPage from './(path)/nouns/furniture/bathroom/page';
import LaundryRoomPage from './(path)/nouns/furniture/laundryRoom/page';
import BackyardPage from './(path)/nouns/furniture/backyard/page';
// Animals
import AnimalsPage from './(path)/nouns/animals/page';
import FlipCardsPage from './(path)/nouns/animals/flipCards/page';

// System
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';
import VerbsPage from './(path)/vocabulary/verbs/page';
import QuizCardPage from './(path)/nouns/animals/quizCard/page';




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
                path: 'home-furniture', 
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