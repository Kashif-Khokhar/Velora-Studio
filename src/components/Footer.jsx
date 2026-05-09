import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/velora_brand_icon.svg';

export default function Footer() {
    return (
      <footer className="relative mt-20 border-t border-white/20 pt-16 pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/80 backdrop-blur-md -z-10"></div>
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                
                {/* Brand Section */}
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                        <img src={logo} alt="Velora Logo" className="w-8 h-8 object-contain" />
                        Velora
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Crafting moments that matter, one invitation at a time. The future of event planning is here.
                    </p>
                    <div className="flex gap-3">
                        <SocialLink href="https://github.com/Kashif-Khokhar" icon={<Github className="w-4 h-4" />} label="GitHub" hoverClass="hover:bg-[#181717] hover:text-white" />
                        <SocialLink href="https://www.linkedin.com/in/kashif-ali-khokhar/" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" hoverClass="hover:bg-[#0077B5] hover:text-white" />
                        <SocialLink href="https://x.com/Kashif_Khokhar1" icon={<Twitter className="w-4 h-4" />} label="Twitter" hoverClass="hover:bg-[#1DA1F2] hover:text-white" />
                    </div>
                </div>

                {/* Product Links */}
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Product</h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                        <li><Link to="/templates" className="hover:text-orange-600 transition-colors">Templates</Link></li>
                        <li><Link to="/features" className="hover:text-orange-600 transition-colors">Features</Link></li>
                        <li><Link to="/pricing" className="hover:text-orange-600 transition-colors">Pricing</Link></li>
                        <li><Link to="/editor" className="hover:text-orange-600 transition-colors">Editor</Link></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Company</h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                        <li><Link to="/about" className="hover:text-orange-600 transition-colors">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-orange-600 transition-colors">Careers</Link></li>
                        <li><Link to="/blog" className="hover:text-orange-600 transition-colors">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-orange-600 transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                        <li><Link to="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link></li>
                        <li><Link to="/cookies" className="hover:text-orange-600 transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-200/60 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Velora. All rights reserved.
                </p>
                <p className="text-slate-500 text-sm flex items-center gap-1 mt-2 md:mt-0">
                    Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by <a href="https://linkedin.com/in/kashif-ali-khokhar/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">Kashif Ali Khokhar</a>
                </p>
            </div>
        </div>
      </footer>
    );
  }

function SocialLink({ href, icon, label, hoverClass }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-2.5 bg-white/60 text-slate-600 rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-white/50 ${hoverClass || 'hover:bg-white hover:text-orange-600'}`}
            aria-label={label}
        >
            {icon}
        </a>
    );
}
