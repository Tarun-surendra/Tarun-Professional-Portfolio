import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

/*
 * ─── EmailJS Setup Instructions ───────────────────────────────────────────────
 *  1. Go to https://www.emailjs.com and create a free account
 *  2. Create an Email Service (Gmail, Outlook, etc.) → copy the Service ID
 *  3. Create an Email Template with these variables:
 *       {{from_name}}  {{from_email}}  {{subject}}  {{message}}  {{to_name}}
 *  4. Copy the Template ID
 *  5. Go to Account → API Keys → copy your Public Key
 *  6. Replace the three values below with your own
 * ──────────────────────────────────────────────────────────────────────────────
 */
const EMAILJS_SERVICE_ID = 'service_p3mlp7r';
const EMAILJS_TEMPLATE_ID = 'template_2c8gy9r';
const EMAILJS_PUBLIC_KEY = 'TuYe2AiPZ8eU48H77';

const contactInfo = [
  { icon: Mail,     label: 'Email',     value: 'tarunsurendrmothukuru@gmail.com', href: 'mailto:tarunsurendrmothukuru@gmail.com', accent: '#c8873a' },
  { icon: Phone,    label: 'Phone',     value: '+1 (603) 288-2707',              href: 'tel:+16032882707',                       accent: '#10b981' },
  { icon: MapPin,   label: 'Location',  value: 'Lowell, Massachusetts, USA',     href: '#',                                       accent: '#3b82f6' },
  { icon: Linkedin, label: 'LinkedIn',  value: 'linkedin.com/in/tarun-surendra', href: 'https://www.linkedin.com/in/tarun-surendra/', accent: '#0077b5' },
  { icon: Github,   label: 'GitHub',    value: 'github.com/Tarun-surendra',     href: 'https://github.com/Tarun-surendra',       accent: '#6b7280' },
];

type FormState = { name: string; email: string; subject: string; message: string };
type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Load EmailJS SDK dynamically
  useEffect(() => {
    if (!(window as any).emailjs) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = () => (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
      document.head.appendChild(script);
    } else {
      (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const emailjs = (window as any).emailjs;
      if (!emailjs) throw new Error('EmailJS not loaded');

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_name: 'Tarun',
          reply_to: form.email,
        }
      );

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" ref={ref} className="section-pad bg-[#f8f5f0] dark:bg-[#0d0d0f]">
      <div className="container-max">
        {/* Header */}
        <div className="mb-16">
          <p className="reveal font-mono-custom text-xs tracking-widest uppercase text-[#c8873a] mb-3">Get In Touch</p>
          <h2 className="reveal stagger-1 font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-[#f0ebe3] leading-tight">
            Let's <em className="not-italic text-gradient">Connect</em>
          </h2>
          <p className="reveal stagger-2 text-slate-600 dark:text-slate-400 max-w-xl mt-4">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl">
          {/* Contact Info */}
          <div className="reveal stagger-1 lg:col-span-2">
            <div className="bg-white dark:bg-[#101013] border border-[#e8e0d5] dark:border-[#2a2a30] rounded-2xl p-6 md:p-8 h-full">
              <h3 className="font-display text-xl text-slate-900 dark:text-[#f0ebe3] mb-6">Contact Information</h3>

              <div className="space-y-3">
                {contactInfo.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 p-3.5 rounded-xl bg-[#f8f5f0] dark:bg-[#16161a] hover:border hover:border-[#c8873a]/20 border border-transparent transition-all duration-200"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: `${item.accent}18`, color: item.accent }}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono-custom">{item.label}</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Available for opportunities</span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">Open to full-time positions and freelance projects.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal stagger-2 lg:col-span-3">
            <div className="bg-white dark:bg-[#101013] border border-[#e8e0d5] dark:border-[#2a2a30] rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-xl text-slate-900 dark:text-[#f0ebe3] mb-6">Send a Message</h3>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="font-display text-xl text-slate-900 dark:text-[#f0ebe3] mb-2">Message Sent!</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Thank you for reaching out. I'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/20 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 font-mono-custom uppercase tracking-wider" htmlFor="name">
                        Your Name
                      </label>
                      <input
                        id="name" name="name" type="text" required
                        placeholder="John Doe"
                        value={form.name} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] text-sm text-slate-900 dark:text-[#f0ebe3] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#c8873a] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 font-mono-custom uppercase tracking-wider" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        id="email" name="email" type="email" required
                        placeholder="john@example.com"
                        value={form.email} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] text-sm text-slate-900 dark:text-[#f0ebe3] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#c8873a] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 font-mono-custom uppercase tracking-wider" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      id="subject" name="subject" type="text" required
                      placeholder="Project Inquiry / Job Opportunity"
                      value={form.subject} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] text-sm text-slate-900 dark:text-[#f0ebe3] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#c8873a] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 font-mono-custom uppercase tracking-wider" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] text-sm text-slate-900 dark:text-[#f0ebe3] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#c8873a] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl btn-amber text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
