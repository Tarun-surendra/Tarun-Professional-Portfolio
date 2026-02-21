import { useEffect, useRef } from 'react';
import { Code2, Database, Cloud, Rocket, Award, Users } from 'lucide-react';

const highlights = [
  { icon: Code2, title: 'Full Stack Development', desc: 'End-to-end apps with modern tech stacks' },
  { icon: Database, title: 'Database Optimization', desc: 'SQL, NoSQL, and performance tuning expert' },
  { icon: Cloud, title: 'Cloud & DevOps', desc: 'AWS, Docker, Kubernetes, CI/CD pipelines' },
  { icon: Rocket, title: 'Agile Delivery', desc: 'Scrum methodology with rapid iteration' },
];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '2', label: 'Fortune 500 Clients' },
  { value: '15+', label: 'Technologies' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="section-pad bg-white dark:bg-[#101013]">
      <div className="container-max">
        {/* Header */}
        <div className="mb-16">
          <p className="reveal font-mono-custom text-xs tracking-widest uppercase text-[#c8873a] mb-3">About Me</p>
          <h2 className="reveal stagger-1 font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-[#f0ebe3] leading-tight max-w-2xl">
            Professional <em className="not-italic text-gradient">Summary</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal stagger-1 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              <p className="text-lg">
                I'm a <strong className="text-slate-900 dark:text-[#f0ebe3] font-semibold">results-driven Full Stack Developer</strong> with over
                3 years designing, developing, and deploying scalable enterprise applications
                for global clients including <span className="text-[#c8873a] font-medium">HCL America</span> and{' '}
                <span className="text-[#c8873a] font-medium">Infosys</span>.
              </p>
              <p>
                My expertise spans the entire stack — robust backend services with <strong className="text-slate-800 dark:text-slate-200">Java and Spring Boot</strong> to
                intuitive interfaces with <strong className="text-slate-800 dark:text-slate-200">React and TypeScript</strong>. I have hands-on
                experience with cloud-native applications on <strong className="text-slate-800 dark:text-slate-200">AWS</strong>, microservices,
                and DevOps practices.
              </p>
              <p>
                I thrive in <strong className="text-slate-800 dark:text-slate-200">Agile/Scrum environments</strong>, collaborating with
                cross-functional teams to deliver secure, high-performance applications that drive real business value.
              </p>
            </div>

            <div className="reveal stagger-2 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200/50 dark:border-emerald-800/30">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">25% User Engagement Boost</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(200,135,58,0.08)] border border-[#c8873a]/20">
                <Users className="w-4 h-4 text-[#c8873a]" />
                <span className="text-sm font-medium text-[#c8873a]">Cross-functional Team Lead</span>
              </div>
            </div>
          </div>

          {/* Right — Cards */}
          <div className="reveal stagger-3 grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <div
                key={item.title}
                className="group p-5 rounded-2xl bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] card-lift hover:border-[#c8873a]/30"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(200,135,58,0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-[#c8873a]" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-[#f0ebe3] mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="reveal stagger-4 mt-16 grid grid-cols-2 md:grid-cols-4 gap-1 border border-[#e8e0d5] dark:border-[#2a2a30] rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-8 text-center ${i !== stats.length - 1 ? 'border-r border-[#e8e0d5] dark:border-[#2a2a30]' : ''}`}
            >
              <div className="font-display text-4xl md:text-5xl text-[#c8873a] mb-2">{stat.value}</div>
              <div className="text-xs font-mono-custom tracking-wide text-slate-500 dark:text-slate-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
