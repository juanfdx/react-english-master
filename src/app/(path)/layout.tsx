import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ScrollToTop } from '../../components/shared/ScrollToTop';
import {  FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";


const vocabularyLinks = [
  {
    title: "Nouns",
    path: "vocabulary/nouns",
    icon: "🏷️",
  },
  {
    title: "Verbs",
    path: "vocabulary/verbs",
    icon: "🏃",
  },
  {
    title: "Adjectives",
    path: "vocabulary/adjectives",
    icon: "🎨",
  },
  {
    title: "Adverbs",
    path: "vocabulary/adverbs",
    icon: "⚡",
  },
  {
    title: "Prepositions",
    path: "vocabulary/prepositions",
    icon: "🧭",
  },
]

const grammarLinks = [
  { 
    title: "To Be", 
    path: "/grammar/to-be", 
    icon: "🟢" 
  },
  { 
    title: "Present Simple", 
    path: "/grammar/present-simple", 
    icon: "☀️" 
  },
];




export default function PathLayout() {

  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {width} = useWindowSize();

  if (width <= 1024 && isSidebarOpen) {
    setIsSidebarOpen(false);
  }

  // shows sidebar links depending on path
  const sidebarLinks = pathName === "vocabulary" 
    ? vocabularyLinks 
    : pathName === "grammar" 
    ? grammarLinks 
    : []

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);



  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-50 to-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="px-6 h-18 flex items-center justify-between">
          
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight"
          >
            English
            <span className="text-indigo-600">Mastery</span>
          </Link>

          {/* SIGN IN */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              to="/auth/login" 
              className="bg-slate-900 text-white text-sm px-4 py-1.5 sm:text-base sm:px-6 sm:py-2 rounded-full font-semibold hover:bg-slate-800 transition"
            >
              Sign In
            </Link>
            <button 
              className='md:hidden flex items-center cursor-pointer' 
              onClick={toggleMenu}
            >
              <IoMdMenu className='text-black w-8 h-8' />
            </button>
          </div>

        </div>
      </header>

      <ScrollToTop />

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex">
        
        {/* SIDEBAR */}
        <aside className={`hidden md:flex border-r border-slate-200 bg-white/70 backdrop-blur ${isSidebarOpen ? "w-72" : "w-27"}`}>
          <div className="w-full p-6">
            
            <div className="mb-8">
              <div className={`text-sm font-semibold uppercase tracking-wider text-slate-400 `}>
                {isSidebarOpen ? (
                  <div className="flex justify-between items-center mb-4">

                    <h2>{pathName}</h2>

                    <button className='cursor-pointer' onClick={toggleSidebar}>
                      <FaArrowLeftLong className='text-black w-5 h-5' />
                    </button>
                  </div>
                ) : (
                  <div className="invisible lg:visible flex justify-center items-center mb-4">
                    <button className='cursor-pointer' onClick={toggleSidebar}>
                      <FaArrowRightLong className='text-black w-5 h-5' />
                    </button>
                  </div>
                )}  
              </div>

              <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                          : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                      }
                    `
                    }
                  >
                    <span className="text-xl">{link.icon}</span>

                    <span className={`font-medium ${isSidebarOpen ? "block" : "hidden"}`}>
                      {link.title}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </div>
            
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 px-3 sm:px-6 pb-12">
          {isMenuOpen && (          
            <>
              <nav className='md:hidden flex flex-col items-center gap-3 py-3'>
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `
                      w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                          : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                      }
                    `
                    }
                  >
                    <span className="text-xl">{link.icon}</span>
    
                    <span className={`font-medium`}>
                      {link.title}
                    </span>
                  </NavLink>
                ))}
              </nav>
    
              <div className="md:hidden border-b border-slate-300 mt-2 mb-1"></div>
            
            </>
          )}

          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center gap-3">
          
          <p className="text-slate-500 text-sm text-center">
            © 2026 EnglishMastery. All rights reserved.
          </p>

        </div>
      </footer>
    </div>
  );
};