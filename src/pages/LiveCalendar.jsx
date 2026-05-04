import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Sparkles } from 'lucide-react';

function NavButton({ onClick, icon }) {
    return (
        <button 
            onClick={onClick} 
            className="p-3 hover:bg-white rounded-full transition-all text-slate-500 hover:text-orange-600 hover:shadow-sm"
        >
            {icon}
        </button>
    )
}

export default function LiveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(viewDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const changeYear = (offset) => {
    setViewDate(new Date(viewDate.getFullYear() + offset, viewDate.getMonth(), 1));
  };

  const isToday = (day) => {
    return day === currentDate.getDate() && 
           viewDate.getMonth() === currentDate.getMonth() && 
           viewDate.getFullYear() === currentDate.getFullYear();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const date = new Date(searchInput);
    if (!isNaN(date.getTime())) {
      setViewDate(date);
    } else {
      const parts = searchInput.split(' ');
      if (parts.length === 1 && !isNaN(parts[0]) && parts[0].length === 4) {
         setViewDate(new Date(parseInt(parts[0]), viewDate.getMonth(), 1));
      } else {
          alert("Invalid date format. Try 'May 2026' or '2026'");
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-10 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        
            {/* Left Panel: Clock & Tools */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 w-full lg:max-w-md"
            >
                {/* Clock Card */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm mb-6">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-bold text-slate-800 tracking-wide uppercase">Local Time</span>
                    </div>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 tracking-tighter mb-2 tabular-nums">
                        {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </h1>
                    <p className="text-xl sm:text-2xl font-light text-slate-600">
                        {currentDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Search Tool */}
                <div className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-lg mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-500" /> Time Travel
                    </h3>
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                        <input 
                            type="text" 
                            placeholder="Jump to date (e.g., 2028)" 
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="flex-1 bg-white/60 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-sm"
                        />
                        <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md text-sm sm:text-base">
                            Go
                        </button>
                    </form>
                </div>

            </motion.div>

            {/* Right Panel: Calendar */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full lg:max-w-2xl bg-white/60 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 border border-white/60 shadow-2xl shadow-orange-900/10"
            >
                {/* Calendar Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg flex items-center justify-center">
                            <CalendarIcon size={24} className="text-orange-600" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span>{monthNames[viewDate.getMonth()]}</span>
                            <span className="text-slate-400 font-medium">{viewDate.getFullYear()}</span>
                        </div>
                    </h2>
                    <div className="flex bg-white/50 rounded-full p-1 border border-white/40 shadow-sm">
                        <NavButton onClick={() => changeYear(-1)} icon={<ChevronsLeft className="w-5 h-5" />} />
                        <NavButton onClick={() => changeMonth(-1)} icon={<ChevronLeft className="w-5 h-5" />} />
                        <NavButton onClick={() => changeMonth(1)} icon={<ChevronRight className="w-5 h-5" />} />
                        <NavButton onClick={() => changeYear(1)} icon={<ChevronsRight className="w-5 h-5" />} />
                    </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 mb-4 text-center">
                    {daysOfWeek.map(day => (
                        <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-3">
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: days }).map((_, i) => {
                        const day = i + 1;
                        const today = isToday(day);
                        return (
                            <motion.div 
                                key={day}
                                whileHover={{ scale: 1.1, translateY: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`
                                    aspect-square flex items-center justify-center rounded-2xl text-lg font-bold cursor-pointer transition-all border
                                    ${today 
                                        ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30 border-transparent' 
                                        : 'bg-white/40 border-white/50 text-slate-700 hover:bg-white hover:border-orange-200 hover:text-orange-600 hover:shadow-md'
                                    }
                                `}
                            >
                                {day}
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        
        </div>
      </div>
    </div>
  );
}


