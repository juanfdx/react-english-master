import { Outlet } from 'react-router';
// Components
import { Header } from '../../components/shared/Header';
import { Footer } from '../../components/shared/Footer';
import { ScrollToTop } from '../../components/shared/ScrollToTop';



export default function SiteLayout() {
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 ">
      {/* HEADER */}
      <Header />
      <ScrollToTop />

      {/* MAIN */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  )
}