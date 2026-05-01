import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cake, Sun, Heart, Laptop, GlassWater, Gift, Music, Trophy, Plane, Camera,
  GraduationCap, Baby, Sparkles, Flame, Star, ArrowRight, Leaf, Zap
} from 'lucide-react';

const categories = ["All", "Birthday", "Wedding", "Party", "Professional", "Holiday", "Special"];

const templates = [
  { 
    id: 10, title: 'Scrapbook Birthday', category: 'Birthday', theme: 'scrapbook',
    defaultTitle: "Emma's Birthday Bash 🎉",
    description: 'Add two personal photos to a handcrafted polaroid collage — the most heartfelt birthday wish card.',
    icon: <Camera className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=800&q=80",
    isNew: false, isFeatured: true, rating: 5.0, uses: '20k'
  },
  { 
    id: 1, title: 'Neon Birthday', category: 'Birthday', theme: 'birthday',
    defaultTitle: "Alex's 25th Birthday 🎂",
    icon: <Cake className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 4.9, uses: '12k'
  },
  { 
    id: 2, title: 'Summer Bash', category: 'Party', theme: 'summer',
    defaultTitle: "Summer Pool Party 🌊",
    icon: <Sun className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 4.8, uses: '9k'
  },
  { 
    id: 3, title: 'Wedding Bliss', category: 'Wedding', theme: 'wedding',
    defaultTitle: "Sarah & James's Wedding 💍",
    icon: <Heart className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 5.0, uses: '18k'
  },
  { 
    id: 4, title: 'Tech Conference', category: 'Professional', theme: 'tech',
    defaultTitle: "Annual Dev Summit 2026",
    icon: <Laptop className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 4.7, uses: '6k'
  },
  { 
    id: 5, title: 'Cocktail Night', category: 'Party', theme: 'summer',
    defaultTitle: "Friday Night Cocktails 🍸",
    icon: <GlassWater className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 4.6, uses: '7k'
  },
  { 
    id: 6, title: 'Holiday Feast', category: 'Holiday', theme: 'birthday',
    defaultTitle: "Holiday Gathering 2026 🎄",
    icon: <Gift className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 4.8, uses: '11k'
  },
  { 
    id: 7, title: 'Live Concert', category: 'Party', theme: 'tech',
    defaultTitle: "Live Music Night 🎸",
    icon: <Music className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 4.7, uses: '8k'
  },
  { 
    id: 8, title: 'Award Ceremony', category: 'Professional', theme: 'tech',
    defaultTitle: "Excellence Awards 2026 🏆",
    icon: <Trophy className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 4.9, uses: '5k'
  },
  { 
    id: 9, title: 'Island Wedding', category: 'Wedding', theme: 'wedding',
    defaultTitle: "Emma & Noah – Island Wedding 🌺",
    icon: <Plane className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    isNew: false, rating: 4.9, uses: '14k'
  },
  { 
    id: 11, title: 'Graduation Day', category: 'Special', theme: 'gala',
    defaultTitle: "Class of 2026 Graduation 🎓",
    icon: <GraduationCap className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    isNew: true, rating: 4.9, uses: '3k'
  },
  { 
    id: 12, title: 'Baby Shower', category: 'Special', theme: 'garden',
    defaultTitle: "Baby Shower Celebration 🍼",
    icon: <Baby className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    isNew: true, rating: 5.0, uses: '4k'
  },
  { 
    id: 13, title: 'New Year\'s Gala', category: 'Holiday', theme: 'gala',
    defaultTitle: "New Year's Eve Gala 2026 ✨",
    icon: <Sparkles className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=800&q=80",
    isNew: true, rating: 4.8, uses: '2k'
  },
  { 
    id: 14, title: 'Garden Party', category: 'Party', theme: 'garden',
    defaultTitle: "Garden Summer Party 🌸",
    icon: <Leaf className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=800&q=80",
    isNew: true, rating: 4.7, uses: '2k'
  },
  { 
    id: 15, title: 'Retro Birthday', category: 'Birthday', theme: 'retro',
    defaultTitle: "Retro Neon Birthday 🎮",
    icon: <Zap className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    isNew: true, rating: 4.9, uses: '1k'
  },
  { 
    id: 16, title: 'After Party', category: 'Party', theme: 'retro',
    defaultTitle: "VIP After Party 🔥",
    icon: <Flame className="w-5 h-5 text-white"/>, 
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    isNew: true, rating: 4.8, uses: '1k'
  },
];

const categoryCount = (cat) => {
  if (cat === 'All') return templates.length;
  return templates.filter(t => t.category === cat).length;
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      <span className="text-[11px] font-bold text-white/90">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'linear-gradient(180deg, #fff7f0 0%, #ffffff 40%)' }}>
      
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-bold text-orange-700">{templates.length} Premium Templates</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-5 text-slate-900 tracking-tight leading-[1.1]">
            Find Your{' '}
            <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              Perfect Design.
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Start with a professionally crafted template and make it yours in seconds.
          </p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`
                px-3 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-[13px] sm:text-sm transition-all flex items-center gap-2
                ${activeCategory === cat 
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-lg shadow-orange-500/25' 
                  : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-700 shadow-sm border border-slate-100'
                }
              `}
            >
              {cat}
              <span className={`
                text-[10px] px-1.5 py-0.5 rounded-full font-black
                ${activeCategory === cat ? 'bg-white/30 text-white' : 'bg-slate-100 text-slate-500'}
              `}>
                {categoryCount(cat)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="container mx-auto px-6">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredTemplates.map((template, i) => (
              <motion.div 
                layout
                key={template.id} 
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                onHoverStart={() => setHoveredId(template.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={template.isFeatured ? 'md:col-span-2 xl:col-span-2' : ''}
              >
                <Link to={`/editor?theme=${template.theme}&title=${encodeURIComponent(template.defaultTitle)}`} className="block group">
                  <div className={`relative bg-slate-900 rounded-3xl overflow-hidden group-hover:-translate-y-2 transition-all duration-400 ${template.isFeatured ? 'aspect-[4/3] sm:aspect-[16/9]' : 'aspect-[3/4]'}`}
                    style={template.isFeatured ? { boxShadow: '0 0 0 2px #f97316, 0 25px 50px rgba(249,115,22,0.3)' } : { boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                    
                    {/* Background Image */}
                    <img 
                      src={template.image} 
                      alt={template.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-600"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-400" />

                    {/* Featured shimmer border */}
                    {template.isFeatured && (
                      <div className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, transparent 50%, rgba(249,115,22,0.15) 100%)' }} />
                    )}
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-start z-20">
                      <div className="flex items-center gap-2">
                        {/* Icon Badge */}
                        <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/25 shadow-lg">
                          {template.icon}
                        </div>
                        {/* Category Tag */}
                        <span className="px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase text-white/90 border border-white/10">
                          {template.category}
                        </span>
                      </div>
                      {/* Featured / NEW badge */}
                      {template.isFeatured ? (
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-3 py-1.5 rounded-full text-[11px] font-black text-white tracking-wider"
                          style={{ background: 'linear-gradient(135deg, #f97316, #e11d48)', boxShadow: '0 4px 16px rgba(249,115,22,0.5)' }}
                        >
                          ⭐ FEATURED
                        </motion.div>
                      ) : template.isNew ? (
                        <motion.div 
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="px-2.5 py-1 rounded-full text-[10px] font-black text-white tracking-wider"
                          style={{ background: 'linear-gradient(135deg, #f97316, #e11d48)', boxShadow: '0 4px 12px rgba(249,115,22,0.4)' }}
                        >
                          ✦ NEW
                        </motion.div>
                      ) : null}
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20">
                      <h3 className={`font-black text-white mb-1 leading-tight ${template.isFeatured ? 'text-xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
                        {template.title}
                      </h3>
                      {template.isFeatured && template.description && (
                        <p className="text-white/70 text-xs sm:text-sm font-medium mb-2 max-w-md line-clamp-2 sm:line-clamp-none">{template.description}</p>
                      )}
                      
                      {/* Stats row */}
                      <div className="flex items-center justify-between">
                        <StarRating rating={template.rating} />
                        <span className="text-[11px] text-white/60 font-medium">{template.uses} uses</span>
                      </div>

                      {/* CTA */}
                      <div className={`flex items-center gap-1.5 mt-3 font-bold text-orange-400 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 ${template.isFeatured ? 'text-base' : 'text-sm'}`}>
                        <span>{template.isFeatured ? 'Create Birthday Wish Card' : 'Customize Template'}</span>
                        <ArrowRight className={template.isFeatured ? 'w-5 h-5' : 'w-4 h-4'} />
                      </div>
                    </div>

                    {/* Hover glow border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-500/40 transition-all duration-400 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No templates found for this category.</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="container mx-auto px-6 mt-20 text-center">
        <div className="inline-block px-8 py-6 rounded-2xl bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-100">
          <p className="text-slate-600 font-medium mb-3">Can't find what you're looking for?</p>
          <Link to="/editor" className="inline-flex items-center gap-2 font-bold text-orange-600 hover:text-orange-700 transition-colors hover:gap-3">
            Start from scratch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
