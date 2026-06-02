import { Link } from 'react-router'



export const Footer = () => {

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-bold text-white mb-6">
            English<span className="text-indigo-600">Mastery</span>
          </div>
          <p className="max-w-xs">Empowering global citizens through language excellence since 2024.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><a href="#" className="hover:text-white transition">Refunds</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-sm text-center">
        © 2026 LinguistFlow. All rights reserved.
      </div>
    </footer>
  )
}