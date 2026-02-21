import { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

const education = [
  {
    degree: "Master's of Science in Computer Science",
    institution: 'University of Massachusetts Lowell',
    location: 'Lowell, USA',
    period: '2023 – 2025',
    status: 'Completed',
    description: 'Advanced studies in software engineering, algorithms, and distributed systems.',
    achievements: ["GPA: 3.8/4.0", "Graduate Research Assistant", "Dean's List"],
    courses: ['Advanced Algorithms', 'Distributed Systems', 'Machine Learning', 'Software Engineering'],
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Acharya Nagarjuna University',
    location: 'Andhra Pradesh, India',
    period: '2018 – 2022',
    status: 'Completed',
    description: 'Foundation in computer science principles, programming, and software development.',
    achievements: ['First Class with Distinction', 'Top 5% of graduating class', 'Technical Club Lead'],
    courses: ['Data Structures', 'Database Management', 'Operating Systems', 'Computer Networks'],
  },
];

const certifications = [
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
  { name: 'Oracle Certified Java Programmer', issuer: 'Oracle', year: '2023' },
  { name: 'Spring Professional Certification', issuer: 'VMware', year: '2023' },
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={ref} className="section-pad bg-white dark:bg-[#101013]">
      <div className="container-max">
        <div className="mb-16">
          <p className="reveal font-mono-custom text-xs tracking-widest uppercase text-[#c8873a] mb-3">Education</p>
          <h2 className="reveal stagger-1 font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-[#f0ebe3] leading-tight">
            Academic <em className="not-italic text-gradient">Background</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education cards */}
          <div className="lg:col-span-2 space-y-6">
            {education.map((edu, index) => (
              <div
                key={edu.degree}
                className="reveal bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] rounded-2xl p-6 md:p-8 card-lift"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(200,135,58,0.1)] flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-[#c8873a]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display text-lg text-slate-900 dark:text-[#f0ebe3]">{edu.degree}</h3>
                      <span className="px-2.5 py-0.5 text-xs font-mono-custom bg-emerald-50 dark:bg-emerald-900/15 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200/50 dark:border-emerald-800/30">
                        {edu.status}
                      </span>
                    </div>
                    <p className="text-[#c8873a] font-medium mb-2">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 mb-3 text-xs text-slate-500 dark:text-slate-500 font-mono-custom">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{edu.period}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{edu.location}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{edu.description}</p>

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">Achievements</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map(a => (
                          <span key={a} className="flex items-center gap-1 px-2.5 py-1 text-xs bg-white dark:bg-[#1e1e24] rounded-full border border-[#e8e0d5] dark:border-[#2a2a30] text-slate-600 dark:text-slate-400">
                            <Award className="w-3 h-3 text-[#c8873a]" />{a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">Coursework</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map(c => (
                          <span key={c} className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[rgba(200,135,58,0.06)] border border-[#c8873a]/15 text-[#c8873a] rounded-full">
                            <BookOpen className="w-3 h-3" />{c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="reveal stagger-2">
            <div className="sticky top-24">
              <h3 className="font-display text-xl text-slate-900 dark:text-[#f0ebe3] mb-5">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div
                    key={cert.name}
                    className="p-4 bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] rounded-xl card-lift"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(200,135,58,0.1)] flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-[#c8873a]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-[#f0ebe3] leading-tight mb-0.5">{cert.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">{cert.issuer}</p>
                        <p className="font-mono-custom text-xs text-[#c8873a] mt-1">{cert.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-[rgba(200,135,58,0.05)] border border-[#c8873a]/15 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-[#f0ebe3] text-sm mb-2">Continuous Learning</h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">Committed to emerging technologies and industry best practices.</p>
                <div className="flex flex-wrap gap-2">
                  {['Online Courses', 'Tech Conferences', 'Workshops'].map(item => (
                    <span key={item} className="px-2.5 py-1 text-xs bg-white dark:bg-[#1e1e24] text-slate-500 dark:text-slate-500 rounded-full border border-[#e8e0d5] dark:border-[#2a2a30]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
