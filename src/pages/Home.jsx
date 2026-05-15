import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Share2, Palette, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <div className="text-slate-900 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm mb-8"
            >
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-slate-800">The Future of Event Invitations</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 drop-shadow-sm leading-[1.1]">
              Invitations that <br className="hidden sm:block" /> 
              <span className="bg-gradient-to-r from-orange-600 to-rose-500 bg-clip-text text-transparent">Radiate Warmth.</span>
            </h1>
            
            <p className="text-xl text-slate-800 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Create stunning, animated invitations in seconds. Share seamlessly across any platform and track RSVPs in real-time.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link to="/templates">
                <motion.button 
                    whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0px 10px 30px rgba(234, 88, 12, 0.4)",
                        backgroundPosition: "100% 0%"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ backgroundSize: "200% 100%" }}
                    transition={{ duration: 0.3 }}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 via-rose-500 to-orange-600 text-white rounded-full font-bold text-lg flex items-center gap-2 shadow-xl shadow-orange-900/20 border border-transparent"
                >
                    Start Creating <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/templates">
                 <motion.button 
                    whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "#fff7ed", // orange-50
                        borderColor: "#fdba74" // orange-300
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg transition-all shadow-lg shadow-slate-200 border border-slate-100"
                >
                    View Templates
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Why Choose Velora?</h2>
                <p className="text-slate-700 font-medium">Everything you need to host the perfect event.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                <FeatureCard 
                    icon={<Palette className="w-8 h-8 text-orange-600" />}
                    title="Beautiful Templates"
                    description="Choose from hundreds of professionally designed animation-ready templates."
                    delay={0}
                />
                <FeatureCard 
                    icon={<Share2 className="w-8 h-8 text-rose-500" />}
                    title="Instant Sharing"
                    description="Share your invite via WhatsApp, iMessage, or Email with a single link."
                    delay={0.2}
                />
                <FeatureCard 
                    icon={<Smartphone className="w-8 h-8 text-amber-500" />}
                    title="Mobile First"
                    description="Designed to look stunning on every device, from phones to desktops."
                    delay={0.4}
                />
            </div>
            
            {/* Featured Templates Preview */}
            <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Featured Designs</h2>
                 <p className="text-slate-700 font-medium">Pick a style and make it yours.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <TemplatePreview 
                    title="Neon Birthday" 
                    category="Birthday" 
                    image="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=800&q=80"
                    delay={0}
                />
                <TemplatePreview 
                    title="Wedding Bliss" 
                    category="Wedding" 
                    image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                    delay={0.2}
                />
                <TemplatePreview 
                    title="Summer Bash" 
                    category="Party" 
                    image="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80"
                    delay={0.4}
                />
            </div>
            
            <div className="text-center mt-12">
                <Link to="/templates" className="inline-flex items-center gap-2 font-bold text-orange-600 hover:text-orange-700 hover:gap-3 transition-all">
                    View All Templates <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 border-t border-white/20">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-900">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-300/30"></div>

                <Step 
                    number="01" 
                    title="Choose a Template" 
                    desc="Browse our collection of stunning, animated templates for any occasion."
                />
                <Step 
                    number="02" 
                    title="Customize" 
                    desc="Add your event details, change colors, and make it truly yours in seconds."
                />
                <Step 
                    number="03" 
                    title="Share & Track" 
                    desc="Get a unique link to send to guests and watch the RSVPs roll in."
                />
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-900">Loved by Hosts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Testimonial 
                    name="Sarah J." 
                    role="Birthday Host"
                    text="The animations are incredible! Everyone was asking me which designer I hired."
                    delay={0}
                />
                 <Testimonial 
                    name="Michael R." 
                    role="Event Planner"
                    text="EvitePro has completely changed how I manage client invitations. Fast, beautiful, and easy."
                    delay={0.2}
                />
                 <Testimonial 
                    name="Emily T." 
                    role="Bride to Be"
                    text="We used this for our Save the Dates and it set the perfect tone for our wedding."
                    delay={0.4}
                />
            </div>
         </div>
      </section>

      {/* CTR Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-rose-900/40 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Start?</h2>
            <p className="text-xl text-slate-300 mb-10">Join thousands of hosts creating memorable experiences.</p>
             <Link to="/templates">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full font-bold text-xl shadow-2xl shadow-orange-900/30 hover:shadow-orange-600/40 transition-all border border-white/20"
                >
                    Create Your Invite Now
                </motion.button>
              </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
            <div className="bg-white/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
            <p className="text-slate-700 leading-relaxed font-medium">{description}</p>
        </motion.div>
    );
}

function Step({ number, title, desc }) {
    return (
        <div className="relative z-10 text-center bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center text-xl font-bold mx-auto mb-6 text-orange-600 shadow-lg shadow-orange-100">
                {number}
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
            <p className="text-slate-700 max-w-xs mx-auto font-medium">{desc}</p>
        </div>
    )
}

function TemplatePreview({ title, category, image, delay }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
        >
             <Link to="/editor">
                <img 
                    src={image} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 p-6 text-left w-full">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase text-white/90 mb-2 border border-white/10">
                        {category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">{title}</h3>
                </div>
            </Link>
        </motion.div>
    )
}

function Testimonial({ name, role, text, delay }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/50 shadow-sm"
        >
            <div className="flex gap-1 mb-4 text-amber-500">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
            </div>
            <p className="text-lg text-slate-800 italic mb-6">"{text}"</p>
            <div>
                <p className="font-bold text-slate-900">{name}</p>
                <p className="text-sm text-slate-600">{role}</p>
            </div>
        </motion.div>
    )
}
