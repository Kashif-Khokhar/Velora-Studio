import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Sparkles,
  Cake,
  Gift,
  Plus,
  Trash2,
  X,
  PartyPopper,
  User,
  CalendarDays
} from 'lucide-react';

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

const parseDateString = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  return {
    year: parseInt(parts[0], 10),
    month: parseInt(parts[1], 10) - 1, // 0-indexed month
    day: parseInt(parts[2], 10)
  };
};

const getBirthdayStatus = (dateStr) => {
  const parsed = parseDateString(dateStr);
  if (!parsed) return { daysLeft: 999, text: '' };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const currentYearBday = new Date(today.getFullYear(), parsed.month, parsed.day);
  
  if (currentYearBday.getTime() === today.getTime()) {
    return { daysLeft: 0, text: "Today! 🎉" };
  }
  
  let nextBday = currentYearBday;
  if (currentYearBday < today) {
    nextBday = new Date(today.getFullYear() + 1, parsed.month, parsed.day);
  }
  
  const diffTime = nextBday - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return { daysLeft: 1, text: "Tomorrow! 🎂" };
  }
  
  return { daysLeft: diffDays, text: `In ${diffDays} days` };
};

const getAgeOnBirthday = (dateStr) => {
  const parsed = parseDateString(dateStr);
  if (!parsed) return null;
  
  const today = new Date();
  const currentYear = today.getFullYear();
  
  const currentYearBday = new Date(currentYear, parsed.month, parsed.day);
  
  let targetYear = currentYear;
  if (currentYearBday < today && currentYearBday.getTime() !== today.getTime()) {
    targetYear = currentYear + 1;
  }
  
  return targetYear - parsed.year;
};

export default function LiveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState('');

  // Birthdays State & LocalStorage persistence
  const [birthdays, setBirthdays] = useState(() => {
    const stored = localStorage.getItem('velora_birthdays');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse birthdays from localStorage:', e);
      }
    }
    // Default birthdays seeded for immediate wow factor!
    const defaults = [
      { id: '1', name: 'Kashif Khokhar', date: '2002-05-20' }, // Today!
      { id: '2', name: 'Arham Khan', date: '1999-05-25' },    // Very soon
      { id: '3', name: 'Sarah Malik', date: '2001-10-12' },
      { id: '4', name: 'John Doe', date: '1995-12-05' }
    ];
    localStorage.setItem('velora_birthdays', JSON.stringify(defaults));
    return defaults;
  });

  const [newBirthdayName, setNewBirthdayName] = useState('');
  const [newBirthdayDate, setNewBirthdayDate] = useState('');
  const [showAddFormInline, setShowAddFormInline] = useState(false);

  // Modal State
  const [selectedDateBirthdays, setSelectedDateBirthdays] = useState(null);
  const [showModalAddForm, setShowModalAddForm] = useState(false);
  const [modalBirthdayName, setModalBirthdayName] = useState('');
  const [modalBirthdayDate, setModalBirthdayDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Save to localStorage whenever birthdays state changes
  useEffect(() => {
    localStorage.setItem('velora_birthdays', JSON.stringify(birthdays));
  }, [birthdays]);

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

  const handleAddBirthday = (e) => {
    e.preventDefault();
    if (!newBirthdayName.trim() || !newBirthdayDate) return;
    
    const newBday = {
      id: Date.now().toString(),
      name: newBirthdayName.trim(),
      date: newBirthdayDate
    };
    
    setBirthdays(prev => [...prev, newBday]);
    setNewBirthdayName('');
    setNewBirthdayDate('');
    setShowAddFormInline(false);
  };

  const handleModalAddBirthday = (e) => {
    e.preventDefault();
    if (!modalBirthdayName.trim() || !modalBirthdayDate) return;
    
    const newBday = {
      id: Date.now().toString(),
      name: modalBirthdayName.trim(),
      date: modalBirthdayDate
    };
    
    const updatedBirthdays = [...birthdays, newBday];
    setBirthdays(updatedBirthdays);
    
    // Update active modal view if date matches the selected month & day
    const parsed = parseDateString(modalBirthdayDate);
    if (parsed && parsed.day === selectedDateBirthdays.day && parsed.month === selectedDateBirthdays.month) {
      setSelectedDateBirthdays(prev => ({
        ...prev,
        list: [...prev.list, newBday]
      }));
    }
    
    setModalBirthdayName('');
    setShowModalAddForm(false);
  };

  const handleDeleteBirthday = (id) => {
    setBirthdays(prev => prev.filter(b => b.id !== id));
    if (selectedDateBirthdays) {
      setSelectedDateBirthdays(prev => ({
        ...prev,
        list: prev.list.filter(b => b.id !== id)
      }));
    }
  };

  const handleDayClick = (day) => {
    const dateString = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayBirthdays = birthdays.filter(b => {
      const parsed = parseDateString(b.date);
      return parsed && parsed.day === day && parsed.month === viewDate.getMonth();
    });
    
    setSelectedDateBirthdays({
      day,
      month: viewDate.getMonth(),
      year: viewDate.getFullYear(),
      dateString,
      list: dayBirthdays
    });
    
    // Set default date for the modal add form to the clicked day
    setModalBirthdayDate(dateString);
    setModalBirthdayName('');
    setShowModalAddForm(false);
  };

  // Sort birthdays by upcoming days remaining
  const sortedBirthdays = [...birthdays].sort((a, b) => {
    const statusA = getBirthdayStatus(a.date);
    const statusB = getBirthdayStatus(b.date);
    return statusA.daysLeft - statusB.daysLeft;
  });

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

                {/* Friends' Birthdays Card */}
                <div className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-lg mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Cake className="w-5 h-5 text-pink-500 animate-pulse" /> Friends' Birthdays
                        </h3>
                        <button 
                            onClick={() => setShowAddFormInline(!showAddFormInline)}
                            className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-full transition-all"
                        >
                            {showAddFormInline ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            {showAddFormInline ? 'Cancel' : 'Add New'}
                        </button>
                    </div>

                    {/* Add Birthday Form */}
                    <AnimatePresence>
                    {showAddFormInline && (
                        <motion.form 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 bg-white/50 p-4 rounded-2xl border border-white/60 shadow-inner overflow-hidden"
                            onSubmit={handleAddBirthday}
                        >
                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">Friend's Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Kashif" 
                                            required
                                            value={newBirthdayName}
                                            onChange={(e) => setNewBirthdayName(e.target.value)}
                                            className="w-full bg-white/80 border border-slate-200 rounded-xl p-2 pl-9 text-slate-800 focus:outline-none focus:border-orange-500 text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">Birth Date</label>
                                    <div className="relative">
                                        <CalendarDays className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="date" 
                                            required
                                            value={newBirthdayDate}
                                            onChange={(e) => setNewBirthdayDate(e.target.value)}
                                            className="w-full bg-white/80 border border-slate-200 rounded-xl p-2 pl-9 text-slate-800 focus:outline-none focus:border-orange-500 text-sm"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white p-2.5 rounded-xl font-bold transition-all shadow-md text-sm mt-1">
                                    Save Birthday 🎂
                                </button>
                            </div>
                        </motion.form>
                    )}
                    </AnimatePresence>

                    {/* Birthdays List */}
                    <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
                        {sortedBirthdays.length === 0 ? (
                            <p className="text-sm text-slate-500 text-center py-4">No birthdays added yet. Click 'Add New' to start!</p>
                        ) : (
                            <AnimatePresence>
                            {sortedBirthdays.map(b => {
                                const status = getBirthdayStatus(b.date);
                                const age = getAgeOnBirthday(b.date);
                                const parsed = parseDateString(b.date);
                                const isBdayToday = status.daysLeft === 0;

                                return (
                                    <motion.div 
                                        key={b.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                                            isBdayToday 
                                            ? 'bg-gradient-to-br from-pink-50 to-orange-50 border-pink-200 shadow-md ring-2 ring-pink-500/20' 
                                            : 'bg-white/60 border-white/80 hover:bg-white hover:border-pink-200 hover:shadow-sm'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                                isBdayToday 
                                                ? 'bg-gradient-to-tr from-pink-500 to-orange-500 text-white shadow-sm' 
                                                : 'bg-pink-100 text-pink-600'
                                            }`}>
                                                {isBdayToday ? '🎉' : (b.name[0] || '🎂').toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                                                    {b.name}
                                                    {age !== null && <span className="text-xs font-semibold text-slate-500">({age} yrs)</span>}
                                                </div>
                                                <div className="text-[11px] text-slate-400 font-bold">
                                                    {parsed ? `${monthNames[parsed.month]} ${parsed.day}` : ''}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full ${
                                                isBdayToday 
                                                ? 'bg-pink-500 text-white animate-pulse' 
                                                : status.daysLeft === 1
                                                ? 'bg-orange-100 text-orange-600'
                                                : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {status.text}
                                            </span>
                                            <button 
                                                onClick={() => handleDeleteBirthday(b.id)}
                                                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                                                title="Delete Birthday"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                            </AnimatePresence>
                        )}
                    </div>
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
                        const dayBirthdays = birthdays.filter(b => {
                          const parsed = parseDateString(b.date);
                          return parsed && parsed.day === day && parsed.month === viewDate.getMonth();
                        });
                        const hasBirthday = dayBirthdays.length > 0;
                        
                        return (
                            <motion.div 
                                key={day}
                                whileHover={{ scale: 1.1, translateY: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDayClick(day)}
                                className={`
                                    aspect-square flex items-center justify-center rounded-2xl text-lg font-bold cursor-pointer transition-all border relative
                                    ${today 
                                        ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30 border-transparent' 
                                        : hasBirthday
                                        ? 'bg-gradient-to-br from-pink-50 to-rose-100/50 border-pink-200 text-pink-700 shadow-sm shadow-pink-500/5 hover:from-white hover:to-pink-50 hover:border-pink-300 hover:text-pink-600 hover:shadow-md'
                                        : 'bg-white/40 border-white/50 text-slate-700 hover:bg-white hover:border-orange-200 hover:text-orange-600 hover:shadow-md'
                                    }
                                `}
                            >
                                <div className="relative w-full h-full flex flex-col items-center justify-center">
                                    <span className={hasBirthday ? 'mb-2' : ''}>{day}</span>
                                    {hasBirthday && (
                                        <div className="absolute bottom-2 flex justify-center items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping absolute" />
                                            <Cake className="w-4 h-4 text-pink-500" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        
        </div>
      </div>

      {/* Celebration Modal / Dialog */}
      <AnimatePresence>
      {selectedDateBirthdays && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
              <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white shadow-2xl relative"
              >
                  {/* Close button */}
                  <button 
                      onClick={() => {
                          setSelectedDateBirthdays(null);
                          setShowModalAddForm(false);
                      }}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                  >
                      <X className="w-5 h-5" />
                  </button>

                  {/* Date Header */}
                  <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-pink-100 rounded-2xl text-pink-600">
                          <PartyPopper className="w-6 h-6 animate-bounce" />
                      </div>
                      <div>
                          <h4 className="text-xl font-black text-slate-900">
                              {monthNames[selectedDateBirthdays.month]} {selectedDateBirthdays.day}, {selectedDateBirthdays.year}
                          </h4>
                          <p className="text-sm font-semibold text-pink-500">
                              {selectedDateBirthdays.list.length > 0 
                                  ? `🎉 ${selectedDateBirthdays.list.length} Birthday${selectedDateBirthdays.list.length > 1 ? 's' : ''}!` 
                                  : 'No birthdays scheduled for this date'}
                          </p>
                      </div>
                  </div>

                  {/* List of Birthdays */}
                  {selectedDateBirthdays.list.length > 0 && (
                      <div className="flex flex-col gap-3 mb-6 max-h-48 overflow-y-auto pr-1">
                          {selectedDateBirthdays.list.map(b => {
                              const age = getAgeOnBirthday(b.date);
                              return (
                                  <div key={b.id} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-100">
                                      <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 text-white flex items-center justify-center font-bold text-lg">
                                              🍰
                                          </div>
                                          <div>
                                              <div className="font-extrabold text-slate-800 text-base">{b.name}</div>
                                              <div className="text-xs font-semibold text-slate-500">
                                                  {age ? `Turning ${age} years old! 🎈` : 'Celebrating another year of greatness! 🎁'}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  )}

                  {/* Modal Quick Add Form */}
                  {showModalAddForm ? (
                      <motion.form 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onSubmit={handleModalAddBirthday}
                          className="bg-white/60 p-4 rounded-2xl border border-slate-100 shadow-inner mb-2"
                      >
                          <h5 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Add Friend's Birthday</h5>
                          <div className="flex flex-col gap-3">
                              <div>
                                  <label className="text-xs font-bold text-slate-500 block mb-1">Friend's Name</label>
                                  <div className="relative">
                                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                      <input 
                                          type="text" 
                                          placeholder="e.g. Kashif" 
                                          required
                                          value={modalBirthdayName}
                                          onChange={(e) => setModalBirthdayName(e.target.value)}
                                          className="w-full bg-white border border-slate-200 rounded-xl p-2 pl-9 text-slate-800 focus:outline-none focus:border-orange-500 text-sm"
                                      />
                                  </div>
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-slate-500 block mb-1">Birth Date</label>
                                  <div className="relative">
                                      <CalendarDays className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                      <input 
                                          type="date" 
                                          required
                                          value={modalBirthdayDate}
                                          onChange={(e) => setModalBirthdayDate(e.target.value)}
                                          className="w-full bg-white border border-slate-200 rounded-xl p-2 pl-9 text-slate-800 focus:outline-none focus:border-orange-500 text-sm"
                                      />
                                  </div>
                              </div>
                              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white p-2.5 rounded-xl font-bold transition-all shadow-md text-sm mt-1">
                                  Save Birthday 🎂
                              </button>
                          </div>
                      </motion.form>
                  ) : (
                      <button 
                          onClick={() => setShowModalAddForm(true)}
                          className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                          <Plus className="w-5 h-5" /> Add Birthday for this Date
                      </button>
                  )}
              </motion.div>
          </div>
      )}
      </AnimatePresence>
    </div>
  );
}
