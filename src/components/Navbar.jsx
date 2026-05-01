import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/velora_brand_icon.svg';
import { PlusCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-orange-100 bg-gradient-to-r from-orange-50/80 via-white/80 to-rose-50/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 group">
          <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-200 transition-colors">
            <img src={logo} alt="Velora Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Velora</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-slate-600 font-medium">
          <Link to="/" className="hover:text-orange-600 transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/templates" className="hover:text-orange-600 transition-colors relative group">
            Templates
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/calendar" className="hover:text-orange-600 transition-colors relative group">
            Live Calendar
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="hover:text-orange-600 transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Action Button (Desktop) */}
        <div className="hidden md:block">
            <Link to="/editor">
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(234, 88, 12, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-rose-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-all"
            >
                <PlusCircle className="w-4 h-4" />
                Create Invite
            </motion.button>
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
            className="md:hidden p-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-orange-100 bg-white/98 backdrop-blur-2xl overflow-hidden shadow-2xl"
            >
                <div className="container mx-auto px-6 py-10 flex flex-col gap-6 font-bold text-xl text-slate-700 text-center">
                    <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-orange-600 transition-all hover:scale-105 active:scale-95">Home</Link>
                    <Link to="/templates" onClick={() => setIsOpen(false)} className="hover:text-orange-600 transition-all hover:scale-105 active:scale-95">Templates</Link>
                    <Link to="/calendar" onClick={() => setIsOpen(false)} className="hover:text-orange-600 transition-all hover:scale-105 active:scale-95">Live Calendar</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-orange-600 transition-all hover:scale-105 active:scale-95">About</Link>
                    
                    <div className="pt-6 border-t border-slate-100">
                         <Link to="/editor" onClick={() => setIsOpen(false)}>
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-orange-600 to-rose-600 text-white px-6 py-4 rounded-2xl font-black shadow-xl shadow-orange-500/20"
                            >
                                <PlusCircle className="w-6 h-6" />
                                Create Invite
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
