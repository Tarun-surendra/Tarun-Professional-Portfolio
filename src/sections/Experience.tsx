import { useEffect, useRef } from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    company: 'HCL America, Inc',
    role: 'Full Stack Developer',
    location: 'Dallas, USA',
    period: 'April 2024 – Present',
    description: 'Leading full-stack development for enterprise applications serving global clients.',
    achievements: [
      'Designed scalable full-stack apps using Java, Spring Boot, Microservices, React, and TypeScript',
      'Improved user engagement by 25% and reduced API response time by 30%',
      'Built secure RESTful APIs with Spring Security, OAuth2, and JWT authentication',
      'Implemented async processing using Kafka and RabbitMQ for real-time data streaming',
      'Deployed with Docker and Kubernetes (EKS) on AWS with CI/CD pipelines',
      'Set up logging and monitoring using ELK Stack and Prometheus/Grafana',
    ],
    skills: ['Java', 'Spring Boot', 'Microservices', 'React', 'TypeScript', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB'],
    current: true,
  },
  {
    company: 'Infosys',
    role: 'Jr. Full Stack Developer',
    location: 'Chennai, India',
    period: 'June 2022 – Sep 2023',
    description: 'Developed enterprise applications and microservices for diverse client projects.',
    achievements: [
      'Built enterprise apps using Java, Spring MVC, Spring Boot, Hibernate, and REST APIs',
      'Created dynamic front-end components with React, JavaScript ES6+, HTML5, and CSS3',
      'Designed microservices architecture with service-to-service communication',
      'Wrote unit and integration tests using JUnit and Mockito, reducing production defects',
      'Automated build and deployment using Maven, Jenkins, and GitLab CI/CD',
      'Implemented auto-scaling strategies on AWS EC2, S3, and RDS',
    ],
    skills: ['Java', 'Spring Boot', 'Hibernate', 'React', 'JavaScript', 'REST APIs', 'MySQL', 'Oracle', 'AWS', 'Jenkins'],
    current: false,
  },
];

export default function Experience() {
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
    <section id="experience" ref={ref} className="section-pad bg-[#f8f5f0] dark:bg-[#0d0d0f]">
      <div className="container-max">
        {/* Header */}
        <div className="mb-16">
          <p className="reveal font-mono-custom text-xs tracking-widest uppercase text-[#c8873a] mb-3">Work Experience</p>
          <h2 className="reveal stagger-1 font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-[#f0ebe3] leading-tight">
            Professional <em className="not-italic text-gradient">Journey</em>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12">
          <div className="timeline-line" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className="reveal"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 w-4 h-4 rounded-full border-2 border-[#c8873a] bg-[#f8f5f0] dark:bg-[#0d0d0f] -translate-x-[7px]"
                  style={{ top: index === 0 ? '0' : undefined }}
                />

                <div className="bg-white dark:bg-[#101013] border border-[#e8e0d5] dark:border-[#2a2a30] rounded-2xl p-6 md:p-8 card-lift">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display text-xl md:text-2xl text-slate-900 dark:text-[#f0ebe3]">{exp.company}</h3>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 text-xs font-mono-custom bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200/50 dark:border-emerald-800/30">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-[#c8873a] font-medium">{exp.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-xs text-slate-500 dark:text-slate-500 font-mono-custom">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.period}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">{exp.description}</p>

                  {/* Achievements */}
                  <div className="space-y-2 mb-6">
                    {exp.achievements.slice(0, 4).map((ach, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#c8873a] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-mono-custom bg-[#f8f5f0] dark:bg-[#1a1a1e] text-slate-600 dark:text-slate-400 rounded-full border border-[#e8e0d5] dark:border-[#2a2a30]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
