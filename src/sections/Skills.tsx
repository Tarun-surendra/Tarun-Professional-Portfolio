import { useEffect, useRef, useState } from 'react';
import { Code2, Server, Database, Cloud, Wrench, LineChart, Layers, GitBranch, TestTube } from 'lucide-react';

const skillCategories = [
  {
    name: 'Languages', icon: Code2,
    skills: [
      { name: 'Java', level: 95 }, { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'TypeScript', level: 88 }, { name: 'SQL', level: 85 }, { name: 'C#', level: 75 },
    ],
  },
  {
    name: 'Backend', icon: Server,
    skills: [
      { name: 'Spring Boot', level: 95 }, { name: 'Spring MVC', level: 90 },
      { name: 'Spring Security', level: 88 }, { name: 'Hibernate/JPA', level: 85 },
      { name: 'Microservices', level: 90 }, { name: 'RESTful APIs', level: 95 },
    ],
  },
  {
    name: 'Frontend', icon: Layers,
    skills: [
      { name: 'React.js', level: 92 }, { name: 'Redux Toolkit', level: 85 },
      { name: 'HTML5 / CSS3', level: 95 }, { name: 'Tailwind CSS', level: 88 },
      { name: 'Material UI', level: 85 }, { name: 'Bootstrap', level: 80 },
    ],
  },
  {
    name: 'Cloud & DevOps', icon: Cloud,
    skills: [
      { name: 'AWS (EC2, S3, RDS)', level: 88 }, { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 85 }, { name: 'Jenkins', level: 82 },
      { name: 'GitHub Actions', level: 85 }, { name: 'Terraform', level: 70 },
    ],
  },
  {
    name: 'Databases', icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 90 }, { name: 'MySQL', level: 88 },
      { name: 'MongoDB', level: 85 }, { name: 'Redis', level: 78 },
      { name: 'Oracle', level: 82 }, { name: 'MSSQL', level: 80 },
    ],
  },
  {
    name: 'Messaging', icon: LineChart,
    skills: [
      { name: 'Apache Kafka', level: 85 }, { name: 'RabbitMQ', level: 80 },
    ],
  },
  {
    name: 'Testing', icon: TestTube,
    skills: [
      { name: 'JUnit', level: 88 }, { name: 'Mockito', level: 85 },
      { name: 'Postman', level: 90 }, { name: 'Swagger/OpenAPI', level: 85 },
    ],
  },
  {
    name: 'Version Control', icon: GitBranch,
    skills: [
      { name: 'Git / GitHub', level: 92 }, { name: 'GitLab', level: 85 },
      { name: 'Maven', level: 88 }, { name: 'Gradle', level: 80 },
    ],
  },
  {
    name: 'Monitoring', icon: Wrench,
    skills: [
      { name: 'ELK Stack', level: 82 }, { name: 'Prometheus', level: 80 },
      { name: 'Grafana', level: 80 }, { name: 'Jira', level: 90 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(level), delay * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-700 dark:text-slate-300">{name}</span>
        <span className="font-mono-custom text-xs text-[#c8873a]">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#f0ebe3] dark:bg-[#2a2a30] rounded-full overflow-hidden">
        <div className="skill-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="section-pad bg-white dark:bg-[#101013]">
      <div className="container-max">
        <div className="mb-16">
          <p className="reveal font-mono-custom text-xs tracking-widest uppercase text-[#c8873a] mb-3">Technical Skills</p>
          <h2 className="reveal stagger-1 font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-[#f0ebe3] leading-tight">
            My <em className="not-italic text-gradient">Expertise</em>
          </h2>
        </div>

        <div className="reveal stagger-2 grid lg:grid-cols-3 gap-8">
          {/* Category nav */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-1.5">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                    active === i
                      ? 'bg-[rgba(200,135,58,0.1)] text-[#c8873a] border border-[#c8873a]/25'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-[#f8f5f0] dark:hover:bg-[#1a1a1e]'
                  }`}
                >
                  <cat.icon className={`w-4 h-4 flex-shrink-0 ${active === i ? 'text-[#c8873a]' : 'text-slate-400'}`} />
                  <span className="font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skill display */}
          <div className="lg:col-span-2">
            <div className="bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                {(() => { const Icon = skillCategories[active].icon; return <div className="w-9 h-9 rounded-lg bg-[rgba(200,135,58,0.1)] flex items-center justify-center"><Icon className="w-4 h-4 text-[#c8873a]" /></div>; })()}
                <h3 className="font-display text-xl text-slate-900 dark:text-[#f0ebe3]">{skillCategories[active].name}</h3>
              </div>
              <div>
                {skillCategories[active].skills.map((skill, i) => (
                  <SkillBar key={`${active}-${skill.name}`} name={skill.name} level={skill.level} delay={i} />
                ))}
              </div>
            </div>

            {/* Tech cloud */}
            <div className="mt-8">
              <p className="font-mono-custom text-xs text-slate-400 uppercase tracking-widest mb-4">Full Stack</p>
              <div className="flex flex-wrap gap-2">
                {skillCategories.flatMap(c => c.skills).map((skill, i) => (
                  <span
                    key={`cloud-${i}`}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 cursor-default ${
                      skill.level >= 90
                        ? 'bg-[rgba(200,135,58,0.12)] text-[#c8873a] border border-[#c8873a]/25'
                        : 'bg-[#f8f5f0] dark:bg-[#1a1a1e] text-slate-600 dark:text-slate-400 border border-[#e8e0d5] dark:border-[#2a2a30]'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
