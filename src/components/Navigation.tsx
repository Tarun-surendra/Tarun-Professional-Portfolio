import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation({ isDarkMode, toggleDarkMode }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-[#f8f5f0]/90 dark:bg-[#0d0d0f]/90 backdrop-blur-xl border-b border-[#e8e0d5] dark:border-[#1e1e22]'
        : 'bg-transparent'
    }`}>
      <div className="container-max">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="font-display text-xl md:text-2xl text-slate-900 dark:text-[#f0ebe3] tracking-tight"
          >
            Tarun<span style={{ color: 'var(--accent-amber)' }}>.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'active-link text-[#c8873a]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-[#c8873a] transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="https://www.linkedin.com/in/tarun-surendra/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full btn-amber text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
            <button
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
          <div className="flex flex-col gap-1 pt-2 border-t border-[#e8e0d5] dark:border-[#1e1e22]">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#c8873a] bg-[rgba(200,135,58,0.08)]'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1a1a1e]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/in/tarun-surendra/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mx-4 flex items-center justify-center gap-2 px-4 py-3 rounded-full btn-amber text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
