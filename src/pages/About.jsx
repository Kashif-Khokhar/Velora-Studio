import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Rocket, Heart, Code, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm mb-8">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span className="text-sm font-bold text-slate-800 tracking-wide uppercase">Our Story</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-slate-900 tracking-tight">
                    Crafting <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">Connections.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12 font-medium max-w-2xl mx-auto">
                    Velora isn't just about invitations. It's about setting the stage for moments that matter.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/40 backdrop-blur-xl p-10 rounded-3xl border border-white/50 shadow-xl shadow-orange-900/5 group"
            >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Rocket className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h3>
                <p className="text-slate-700 leading-relaxed font-medium text-lg">
                    To democratize professional design. We believe everyone deserves to announce their life's milestones with elegance and style, without needing a degree in design.
                </p>
            </motion.div>

            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/40 backdrop-blur-xl p-10 rounded-3xl border border-white/50 shadow-xl shadow-rose-900/5 group"
            >
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Code className="w-7 h-7 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">The Technology</h3>
                <p className="text-slate-700 leading-relaxed font-medium text-lg">
                   Powered by modern web tech—React, Tailwind, and Framer Motion. We prioritize speed, accessibility, and fluid animations to make every interaction feel magical.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Meet the Creator */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/50 to-white/20 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-8 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl shrink-0">
                    <img 
                        src="https://media.licdn.com/dms/image/D4D03AQF7q0iH5kX3yA/profile-displayphoto-shrink_800_800/0/1708453535952?e=1714003200&v=beta&t=example" 
                        alt="Kashif Ali Khokhar" 
                        className="w-full h-full object-cover"
                        // Fallback to a placeholder if the specific URL fails or is private
                        onError={(e) => {e.target.src = 'https://ui-avatars.com/api/?name=Kashif+Ali+Khokhar&background=ea580c&color=fff&size=256'}}
                    />
                </div>
                
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-2">Meet the Creator</h2>
                    <h3 className="text-4xl font-bold text-slate-900 mb-4">Kashif Ali Khokhar</h3>
                    <p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">
                        Passionate Full Stack Developer and UI/UX enthusiast. Building <span className="font-bold text-rose-600">Velora</span> to bridge the gap between complex design tools and simple, user-friendly experiences.
                    </p>
                    
                    <div className="flex gap-4 justify-center md:justify-start">
                        <SocialButton href="https://github.com/Kashif-Khokhar" icon={<Github className="w-5 h-5" />} label="GitHub" />
                        <SocialButton href="https://www.linkedin.com/in/kashif-ali-khokhar/" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                        <SocialButton href="https://x.com/Kashif_Khokhar1" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
                        <SocialButton href="mailto:kashifalikhokharofficial@gmail.com" icon={<Mail className="w-5 h-5" />} label="Email" />
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
}

function SocialButton({ href, icon, label }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-white hover:bg-slate-900 text-slate-700 hover:text-white rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center justify-center"
            aria-label={label}
        >
            {icon}
        </a>
    )
}
