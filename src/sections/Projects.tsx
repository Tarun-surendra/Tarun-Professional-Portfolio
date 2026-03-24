import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Layers, Server, Database, Cloud, ShoppingCart, Activity } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Microservices Platform',
    description: 'Full-stack e-commerce platform with microservices architecture, Stripe payment processing, and real-time order tracking.',
    category: 'Full Stack',
    technologies: ['Java', 'Spring Boot', 'Spring Cloud', 'React', 'Redux', 'PostgreSQL', 'Kafka', 'Docker'],
    features: ['Service discovery (Eureka)', 'API Gateway', 'Event-driven via Kafka', 'JWT auth'],
    github: 'https://github.com/Tarun-surendra',
    demo: 'https://github.com/Tarun-surendra',
    icon: ShoppingCart,
    accent: '#c8873a',
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'Business metrics dashboard with WebSocket live updates, Chart.js visualizations, and role-based views.',
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'Redux Toolkit', 'Material UI', 'Spring Boot', 'WebSocket'],
    features: ['Real-time Chart.js visuals', 'WebSocket live updates', 'Role-based views', 'PDF/Excel export'],
    github: 'https://github.com/Tarun-surendra',
    demo: 'https://github.com/Tarun-surendra',
    icon: Activity,
    accent: '#8b5cf6',
  },
  {
    title: 'Cloud-Native Task Management API',
    description: 'RESTful task API with JWT auth, AWS S3 uploads, email notifications, and full Swagger docs. CI/CD on AWS.',
    category: 'Backend',
    technologies: ['Spring Boot', 'Spring Security', 'JPA/Hibernate', 'PostgreSQL', 'AWS S3', 'Jenkins'],
    features: ['JWT authentication', 'File upload to S3', 'Email notifications', 'Swagger docs'],
    github: 'https://github.com/Tarun-surendra',
    demo: 'https://github.com/Tarun-surendra',
    icon: Server,
    accent: '#10b981',
  },
  {
    title: 'DevOps CI/CD Pipeline Automation',
    description: 'Automated CI/CD pipelines with Terraform IaC, Kubernetes orchestration, and full monitoring stack.',
    category: 'DevOps',
    technologies: ['Jenkins', 'GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana'],
    features: ['IaC with Terraform', 'K8s orchestration', 'Prometheus + Grafana', 'Automated tests'],
    github: 'https://github.com/Tarun-surendra',
    demo: 'https://github.com/Tarun-surendra',
    icon: Cloud,
    accent: '#f59e0b',
  },
  {
    title: 'Employee Management System',
    description: 'Full HR operations platform with attendance tracking, leave management, and performance reviews.',
    category: 'Full Stack',
    technologies: ['React', 'Spring Boot', 'MySQL', 'Spring Security', 'Hibernate', 'Bootstrap'],
    features: ['RBAC access control', 'Attendance & leave', 'Performance reviews', 'JUnit tested'],
    github: 'https://github.com/Tarun-surendra',
    demo: 'https://github.com/Tarun-surendra',
    icon: Layers,
    accent: '#06b6d4',
  },
  {
    title: 'Inventory Management System',
    description: 'Real-time inventory tracking with RabbitMQ alerts, Redis caching, and comprehensive reporting.',
    category: 'Full Stack',
    technologies: ['React', 'Redux', 'Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'],
    features: ['Real-time tracking', 'Low-stock alerts', 'Redis caching', 'Docker containerized'],
    github: 'https://github.com/Tarun-surendra',
    demo: 'https://github.com/Tarun-surendra',
    icon: Database,
    accent: '#ec4899',
  },
];

export default function Projects() {
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
    <section id="projects" ref={ref} className="section-pad bg-[#f8f5f0] dark:bg-[#0d0d0f]">
      <div className="container-max">
        <div className="mb-16">
          <p className="reveal font-mono-custom text-xs tracking-widest uppercase text-[#c8873a] mb-3">Portfolio</p>
          <h2 className="reveal stagger-1 font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-[#f0ebe3] leading-tight">
            Featured <em className="not-italic text-gradient">Projects</em>
          </h2>
          <p className="reveal stagger-2 text-slate-600 dark:text-slate-400 max-w-xl mt-4">
            A showcase of technical expertise and problem-solving capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="reveal group bg-white dark:bg-[#101013] border border-[#e8e0d5] dark:border-[#2a2a30] rounded-2xl overflow-hidden card-lift"
              style={{ transitionDelay: `${index * 0.07}s` }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: project.accent }} />

              <div className="p-6">
                {/* Icon + category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${project.accent}18` }}>
                    <project.icon className="w-5 h-5" style={{ color: project.accent }} />
                  </div>
                  <span className="font-mono-custom text-xs px-2.5 py-1 rounded-full bg-[#f8f5f0] dark:bg-[#1a1a1e] text-slate-500 dark:text-slate-500 border border-[#e8e0d5] dark:border-[#2a2a30]">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display text-lg text-slate-900 dark:text-[#f0ebe3] mb-2 group-hover:text-[#c8873a] transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-500 mb-4 leading-relaxed line-clamp-2">{project.description}</p>

                {/* Features */}
                <ul className="space-y-1 mb-4">
                  {project.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2 py-0.5 text-xs font-mono-custom bg-[#f8f5f0] dark:bg-[#1a1a1e] text-slate-500 dark:text-slate-500 rounded border border-[#e8e0d5] dark:border-[#2a2a30]">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 text-xs font-mono-custom rounded" style={{ color: project.accent, background: `${project.accent}15` }}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                    style={{ background: project.accent }}>
                    <ExternalLink className="w-3.5 h-3.5" /> Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border border-[#e8e0d5] dark:border-[#2a2a30] text-slate-600 dark:text-slate-400 hover:border-[#c8873a] transition-colors">
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal stagger-5 text-center mt-12">
          <a
            href="https://github.com/Tarun-surendra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#e8e0d5] dark:border-[#2a2a30] text-sm font-medium text-slate-600 dark:text-slate-400 hover:border-[#c8873a] hover:text-[#c8873a] transition-all"
          >
            <Github className="w-4 h-4" /> View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
