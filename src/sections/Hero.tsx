import { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f5f0] dark:bg-[#0d0d0f]"
    >
      {/* Background: large typographic watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display text-[20vw] leading-none font-bold text-slate-900/[0.03] dark:text-white/[0.025] whitespace-nowrap"
        >
          DEVELOPER
        </span>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#c8873a]/20 to-transparent hidden md:block" />
      <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8873a]/10 to-transparent" />

      <div className="container-max relative z-10 pt-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">

          {/* Left — Text */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Status badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c8873a]/30 bg-[rgba(200,135,58,0.06)] text-[#c8873a] text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for opportunities
            </div>

            {/* Name */}
            <h1 className="reveal stagger-1 font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-slate-900 dark:text-[#f0ebe3] leading-[0.95] mb-6">
              Tarun{' '}
              <em className="not-italic text-gradient">Mothukuru</em>
            </h1>

            {/* Title */}
            <div className="reveal stagger-2 mb-6">
              <p className="font-mono-custom text-base md:text-lg text-[#c8873a] tracking-widest uppercase mb-2">
                Full Stack Developer
              </p>
              <p className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500 dark:text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                Lowell, MA · 3+ years experience
              </p>
            </div>

            {/* Description */}
            <p className="reveal stagger-3 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Results-driven engineer designing scalable enterprise applications for{' '}
              <span className="text-slate-900 dark:text-[#f0ebe3] font-medium">global clients</span>.
              Expert in Java, Spring Boot, React, and cloud-native solutions.
            </p>

            {/* CTA */}
            <div className="reveal stagger-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-amber px-8 py-3.5 rounded-full font-medium text-sm tracking-wide"
              >
                Get In Touch
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded-full font-medium text-sm tracking-wide border border-slate-300 dark:border-[#2a2a30] text-slate-700 dark:text-slate-300 hover:border-[#c8873a] dark:hover:border-[#c8873a] transition-colors"
              >
                View My Work
              </button>
            </div>

            {/* Social */}
            <div className="reveal stagger-5 flex items-center justify-center lg:justify-start gap-4">
              {[
                { href: 'https://www.linkedin.com/in/tarun-surendra/', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com/Tarun-surendra', icon: Github, label: 'GitHub' },
                { href: 'mailto:tarunsurendrmothukuru@gmail.com', icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#2a2a30] flex items-center justify-center text-slate-500 dark:text-slate-500 hover:border-[#c8873a] hover:text-[#c8873a] dark:hover:border-[#c8873a] dark:hover:text-[#c8873a] transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Profile */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="reveal stagger-2 relative">
              {/* Rotating rings */}
              <div className="absolute inset-0 -m-6 rounded-full border border-dashed border-[#c8873a]/25 animate-spin-slow" />
              <div className="absolute inset-0 -m-12 rounded-full border border-[#c8873a]/12 animate-spin-slow-reverse" />

              {/* Image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-[#1a1a1e] shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Tarun Mothukuru"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c8873a]/20 to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-3 -left-6 px-4 py-2.5 bg-white dark:bg-[#1a1a1e] rounded-xl shadow-lg border border-[#e8e0d5] dark:border-[#2a2a30] animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-[#c8873a] font-display text-lg">3+</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Years Exp.</span>
                </div>
              </div>
              <div className="absolute -top-3 -right-6 px-4 py-2.5 bg-white dark:bg-[#1a1a1e] rounded-xl shadow-lg border border-[#e8e0d5] dark:border-[#2a2a30] animate-float-slow">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Open to Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-[#c8873a] transition-colors"
          >
            <span className="font-mono-custom text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
