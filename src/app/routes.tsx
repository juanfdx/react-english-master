import { createBrowserRouter, Navigate } from 'react-router';
// LAYOUTS
import SiteLayout  from './site/layout';
import PathLayout from './(path)/layout';
import HouseLayout from './(path)/vocabulary/nouns/house/layout';
import WorkLayout from './(path)/vocabulary/nouns/work/layout';
import AnimalsLayout from './(path)/vocabulary/nouns/animals/layout';
import ColorsLayout from './(path)/vocabulary/nouns/color/layout';

// PAGES
import HomePage from './site/home/page';
// NOUNS
import NounsPage from './(path)/vocabulary/nouns/page';
// House
import HousePage from './(path)/vocabulary/nouns/house/page';
import KitchenPage from './(path)/vocabulary/nouns/house/kitchen/page';
import BedroomPage from './(path)/vocabulary/nouns/house/bedroom/page';
import LivingRoomPage from './(path)/vocabulary/nouns/house/livingRoom/page';
import BathroomPage from './(path)/vocabulary/nouns/house/bathroom/page';
import LaundryRoomPage from './(path)/vocabulary/nouns/house/laundryRoom/page';
import BackyardPage from './(path)/vocabulary/nouns/house/backyard/page';
import ApplianceFlipCardsPage from './(path)/vocabulary/nouns/house/flipCards/page';
import ApplianceQuizCardPage from './(path)/vocabulary/nouns/house/quizCard/page';
import ApplianceAudioQuizPage from './(path)/vocabulary/nouns/house/AudioQuiz/page';
// Work
import WorkPage from './(path)/vocabulary/nouns/work/page';
import OfficePage from './(path)/vocabulary/nouns/work/office/page';
// Animals
import AnimalsPage from './(path)/vocabulary/nouns/animals/page';
import AnimalFlipCardsPage from './(path)/vocabulary/nouns/animals/flipCards/page';
import AnimalQuizCardPage from './(path)/vocabulary/nouns/animals/quizCard/page';
import AnimalAudioQuizPage from './(path)/vocabulary/nouns/animals/AudioQuiz/page';
// Colors
import ColorsPage from './(path)/vocabulary/nouns/color/page';
import ColorFlipCardsPage from './(path)/vocabulary/nouns/color/flipCards/page';
import ColorQuizCardPage from './(path)/vocabulary/nouns/color/quizCard/page';
import ColorAudioQuizPage from './(path)/vocabulary/nouns/color/AudioQuiz/page';
// SYSTEM
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
                path: 'house', 
                element: <HouseLayout />,
                children: [
                  {
                    index: true,
                    element: <HousePage />,
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
                  {
                    path: 'flip-cards',
                    element: <ApplianceFlipCardsPage />,
                  },
                  {
                    path: 'quiz-card',
                    element: <ApplianceQuizCardPage />,
                  },
                  {
                    path: 'audio-quiz',
                    element: <ApplianceAudioQuizPage />,
                  },
                ]
              },
              {
                path: 'work-jobs', 
                element: <WorkLayout />,
                children: [
                  {
                    index: true,
                    element: <WorkPage />,
                  },
                  {
                    path: 'office',
                    element: <OfficePage />,
                  }
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
                    element: <AnimalFlipCardsPage />,
                  },
                  {
                    path: 'quiz-card',
                    element: <AnimalQuizCardPage />,
                  },
                  {
                    path: 'audio-quiz',
                    element: <AnimalAudioQuizPage />,
                  },
                ]
              },
              {
                path: 'colors', 
                element: <ColorsLayout />,
                children: [
                  {
                    index: true,
                    element: <ColorsPage />,
                  },
                  {
                    path: 'flip-cards',
                    element: <ColorFlipCardsPage />,
                  },
                  {
                    path: 'quiz-card',
                    element: <ColorQuizCardPage />,
                  },
                  {
                    path: 'audio-quiz',
                    element: <ColorAudioQuizPage />,
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