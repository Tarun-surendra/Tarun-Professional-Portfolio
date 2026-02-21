import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, Minimize2 } from 'lucide-react';

/*
 * ─── AI Chatbot Setup ─────────────────────────────────────────────────────────
 *  This chatbot uses the Anthropic Claude API via a CORS proxy or your own backend.
 *
 *  OPTION A – Quick setup with a backend proxy (recommended for production):
 *    1. Create a small Express/Node server that forwards requests to Anthropic API
 *    2. Set VITE_CHAT_API_URL in your .env to point to that server
 *
 *  OPTION B – Direct Anthropic API (development only, exposes API key in browser):
 *    1. Get your API key from https://console.anthropic.com
 *    2. Create a .env file in the project root:
 *         VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
 *    3. Set VITE_CHAT_MODE=direct in .env
 *
 *  OPTION C – Use the deployed Claude.ai artifact proxy (already configured below)
 * ──────────────────────────────────────────────────────────────────────────────
 */

const SYSTEM_PROMPT = `You are Tarun's AI assistant on his portfolio website. You represent Tarun Mothukuru, a Full Stack Developer based in Lowell, Massachusetts, USA.

Answer questions about Tarun in a friendly, professional tone. Keep answers concise (2-4 sentences max). If you don't know something specific, say "I don't have that detail — feel free to reach out to Tarun directly via the contact form!"

Here's what you know about Tarun:

PERSONAL:
- Name: Tarun Mothukuru (also known as Tarun Surendra Mothukuru)
- Location: Lowell, Massachusetts, USA
- Email: tarunsurendrmothukuru@gmail.com
- Phone: +1 (603) 288-2707
- LinkedIn: linkedin.com/in/tarun-surendra
- GitHub: github.com/Tarun-surendra
- Status: Available for full-time positions and freelance projects

EXPERIENCE (3+ years):
- HCL America, Inc — Full Stack Developer, Dallas, USA (April 2024 – Present)
  * Enterprise applications using Java, Spring Boot, Microservices, React, TypeScript
  * Worked with Fortune 500 global clients
- Infosys — Jr. Full Stack Developer, Chennai, India (June 2022 – Sep 2023)
  * Enterprise apps using Java, Spring MVC, Spring Boot, Hibernate, REST APIs

SKILLS:
- Languages: Java (95%), JavaScript ES6+ (90%), TypeScript (88%), SQL (85%), C# (75%)
- Backend: Spring Boot, Spring MVC, Spring Security, Hibernate/JPA, Microservices, RESTful APIs
- Frontend: React.js, Redux Toolkit, HTML5/CSS3, Tailwind CSS, Material UI, Bootstrap
- Cloud & DevOps: AWS (EC2, S3, RDS, Lambda), Docker, Kubernetes, Jenkins, GitHub Actions, Terraform
- Databases: PostgreSQL, MySQL, MongoDB, Redis
- Other: WebSocket, Kafka, RabbitMQ, JUnit, Mockito

PROJECTS:
1. E-Commerce Microservices Platform — Java, Spring Boot, React, PostgreSQL, Kafka, Docker
2. Real-Time Analytics Dashboard — React, TypeScript, Spring Boot, WebSocket, Chart.js
3. Cloud-Native Task Management API — Spring Boot, AWS S3, JWT auth, PostgreSQL, Jenkins
4. DevOps CI/CD Pipeline Automation — Jenkins, Kubernetes, Terraform, Prometheus, Grafana
5. Employee Management System — React, Spring Boot, MySQL, Spring Security
6. Inventory Management System — React, Spring Boot, PostgreSQL, Redis, RabbitMQ

STATS: 3+ years experience, 10+ projects delivered, 2 Fortune 500 clients, 15+ technologies

Be helpful, concise, and professional. You can suggest visitors use the Contact section to reach Tarun directly for detailed discussions.`;

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What's Tarun's tech stack?",
  "Is he available for hire?",
  "Tell me about his projects",
  "How can I contact him?",
];

async function callClaudeAPI(messages: Message[]): Promise<string> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;

  if (!apiKey) {
    // Fallback: smart rule-based responses when no API key is set
    return getFallbackResponse(messages[messages.length - 1].content);
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok) throw new Error('API error');
  const data = await response.json();
  return data.content[0].text;
}

function getFallbackResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know')) {
    return "Tarun specializes in Java, Spring Boot, and React/TypeScript for full-stack development. He's also proficient in AWS, Docker, Kubernetes, and databases like PostgreSQL and MongoDB. Check out the Skills section for the full breakdown!";
  }
  if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('work') || q.includes('opportunit')) {
    return "Yes! Tarun is actively available for full-time positions and freelance projects. He's based in Lowell, MA and open to both on-site and remote roles. Use the Contact section to reach out!";
  }
  if (q.includes('project') || q.includes('built') || q.includes('work')) {
    return "Tarun has built 10+ projects including an E-Commerce Microservices Platform, a Real-Time Analytics Dashboard, and a Cloud-Native Task Management API. Scroll to the Projects section to explore them all!";
  }
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('touch')) {
    return "You can reach Tarun at tarunsurendrmothukuru@gmail.com or call +1 (603) 288-2707. You can also connect on LinkedIn or use the Contact form at the bottom of this page!";
  }
  if (q.includes('experience') || q.includes('work') || q.includes('company') || q.includes('hcl') || q.includes('infosys')) {
    return "Tarun has 3+ years of experience. He currently works as a Full Stack Developer at HCL America in Dallas (April 2024–Present), and previously worked at Infosys in Chennai as a Jr. Full Stack Developer (2022–2023).";
  }
  if (q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('university')) {
    return "For details about Tarun's educational background, scroll down to the Education section on this page!";
  }
  if (q.includes('location') || q.includes('where') || q.includes('based')) {
    return "Tarun is based in Lowell, Massachusetts, USA. He's open to remote work as well as on-site opportunities.";
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('who are you')) {
    return "Hi there! 👋 I'm Tarun's AI assistant. I can answer questions about his skills, experience, projects, or how to get in touch. What would you like to know?";
  }

  return "Great question! I'm Tarun's AI assistant and can help with info about his skills, experience, projects, and availability. For anything specific, feel free to reach out directly via the Contact section below!";
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Tarun's AI assistant. Ask me anything about his skills, experience, projects, or availability!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await callClaudeAPI(updatedMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I had trouble connecting. Please try again or contact Tarun directly via the form below!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center group transition-all duration-300 hover:scale-110"
          style={{ background: 'linear-gradient(135deg, #c8873a, #e09a4f)' }}
          aria-label="Open AI Chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[360px] bg-white dark:bg-[#101013] rounded-2xl shadow-2xl border border-[#e8e0d5] dark:border-[#2a2a30] flex flex-col transition-all duration-300 ${
            isMinimized ? 'h-[60px]' : 'h-[520px]'
          }`}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-t-2xl flex-shrink-0 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #c8873a, #e09a4f)' }}
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Tarun's AI Assistant</p>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full inline-block" />
                Online · Instant replies
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={e => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5 text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: 'rgba(200,135,58,0.12)' }}>
                        <Bot className="w-4 h-4" style={{ color: '#c8873a' }} />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'text-white rounded-tr-sm'
                          : 'bg-[#f8f5f0] dark:bg-[#1a1a1f] text-slate-800 dark:text-slate-200 rounded-tl-sm'
                      }`}
                      style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #c8873a, #e09a4f)' } : {}}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <User className="w-4 h-4 text-slate-500" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'rgba(200,135,58,0.12)' }}>
                      <Bot className="w-4 h-4" style={{ color: '#c8873a' }} />
                    </div>
                    <div className="bg-[#f8f5f0] dark:bg-[#1a1a1f] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions (only show at start) */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#c8873a]/30 text-[#c8873a] hover:bg-[#c8873a]/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-[#e8e0d5] dark:border-[#2a2a30] flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Tarun..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#f8f5f0] dark:bg-[#16161a] border border-[#e8e0d5] dark:border-[#2a2a30] text-sm text-slate-900 dark:text-[#f0ebe3] placeholder:text-slate-400 focus:outline-none focus:border-[#c8873a] transition-colors"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c8873a, #e09a4f)' }}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
