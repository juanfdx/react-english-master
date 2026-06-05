import { Link, NavLink } from 'react-router'



export const Header = () => {

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-slate-200">
      <nav className="px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight"
        >
          English
          <span className="text-indigo-600">Mastery</span>
        </Link>

        {/* NAV */}
        <div className="hidden md:flex space-x-8 font-medium text-slate-600">
          <NavLink to="/path/vocabulary" className={({ isActive }) => isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'hover:text-indigo-600 transition'}>
            Vocabulary
          </NavLink>
          <NavLink to="/path/grammar" className={({ isActive }) => isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'hover:text-indigo-600 transition'}>
            Grammar
          </NavLink>
          <NavLink to="/path/nouns" className={({ isActive }) => isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'hover:text-indigo-600 transition'}>
            Nouns
          </NavLink>
          <NavLink to="/path/verbs" className={({ isActive }) => isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'hover:text-indigo-600 transition'}>
            Verbs
          </NavLink>
        </div>

        {/* SIGN IN */}
        <Link to="/auth/login" className="bg-slate-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-800 transition">
          Sign In
        </Link>
      </nav>
    </header>
  )
}