import { Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/tarun-surendra/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Tarun-surendra', label: 'GitHub' },
  { icon: Mail, href: 'mailto:tarunsurendrmothukuru@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 dark:bg-[#07070a] text-white border-t border-[#1e1e24]">
      <div className="container-max py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
              className="font-display text-2xl text-white hover:text-[#c8873a] transition-colors inline-block mb-4"
            >
              Tarun<span className="text-[#c8873a]">.</span>
            </a>
            <p className="text-slate-400 mb-6 max-w-sm text-sm leading-relaxed">
              Full Stack Developer with 3+ years building scalable enterprise
              applications. Passionate about creating solutions that drive business value.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#c8873a] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono-custom text-xs uppercase tracking-widest text-slate-500 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm text-slate-400 hover:text-[#c8873a] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono-custom text-xs uppercase tracking-widest text-slate-500 mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:tarunsurendrmothukuru@gmail.com" className="text-sm text-slate-400 hover:text-[#c8873a] transition-colors break-all">
                  tarunsurendrmothukuru@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+16032882707" className="text-sm text-slate-400 hover:text-[#c8873a] transition-colors">
                  +1 (603) 288-2707
                </a>
              </li>
              <li className="text-sm text-slate-500">Lowell, Massachusetts, USA</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-mono-custom">
            © {new Date().getFullYear()} Tarun Mothukuru. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#c8873a] fill-[#c8873a]" /> using React & Tailwind
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#c8873a] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
