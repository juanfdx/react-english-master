import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { ScrollToTop } from '../../components/shared/ScrollToTop';
import {  FaArrowLeftLong } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { useWindowSize } from '../../hooks/useWindowSize';

const lessonLinks = [
  {
    title: "Vocabulary",
    path: "/vocabulary",
    icon: "📚",
  },
  {
    title: "Grammar",
    path: "/grammar",
    icon: "✍️",
  },
  {
    title: "Nouns",
    path: "/nouns",
    icon: "🏷️",
  },
  {
    title: "Verbs",
    path: "/verbs",
    icon: "🏃",
  },
];


export default function PathLayout() {

  const [isOpen, setIsOpen] = useState(true);

  const {width} = useWindowSize();

  if (width <= 1024 && isOpen) {
    setIsOpen(false);
  }

  const toggleSidebar = () => setIsOpen(!isOpen);


  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-50 to-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight"
          >
            English
            <span className="text-indigo-600">Mastery</span>
          </Link>

          {/* SIGN IN */}
          <Link to="/auth/login" className="bg-slate-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-800 transition">
            Sign In
          </Link>

        </div>
      </header>

      <ScrollToTop />

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex">
        
        {/* SIDEBAR */}
        <aside className={`hidden md:flex border-r border-slate-200 bg-white/70 backdrop-blur ${isOpen ? "w-72" : "w-27"}`}>
          <div className="w-full p-6">
            
            <div className="mb-8">
              <div className={`text-sm font-semibold uppercase tracking-wider text-slate-400 `}>
                {isOpen ? (
                  <div className="flex justify-between items-center mb-4">
                    <h2>Learning Paths</h2>
                    <button className='cursor-pointer' onClick={toggleSidebar}>
                      <FaArrowLeftLong className='text-black w-4 h-4' />
                    </button>
                  </div>
                ) : (
                  <button className='flex items-center px-3 mb-1 lg:cursor-pointer' onClick={toggleSidebar}>
                    <IoMdMenu className='text-slate-400 lg:text-black w-8 h-8' />
                  </button>
                )}  
              </div>

              <nav className="space-y-2">
                {lessonLinks.map((link) => (
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

                    <span className={`font-medium ${isOpen ? "block" : "hidden"}`}>
                      {link.title}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </div>
            
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 px-6 pb-12">
          <nav className='md:hidden flex flex-col items-center gap-3 py-3'>
            {lessonLinks.map((link) => (
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

          <div className="md:hidden border-b border-slate-300 mt-6 mb-3"></div>

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