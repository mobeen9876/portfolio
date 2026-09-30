import { useEffect, useRef, useState } from 'react'

const LOG_LINES = [
  'shipping React screens from Figma, pixel by pixel',
  'teaching a billing app to listen and talk back',
  'wiring Stripe, Whisper, and GPT into one stack',
  'turning a CRUD module into three CRUD modules',
]

function useTypingLoop(lines, typeSpeed = 38, holdMs = 1400, deleteSpeed = 22) {
  const [lineIndex, setLineIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const current = lines[lineIndex]
    let timeout
    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
      } else {
        timeout = setTimeout(() => setPhase('holding'), holdMs)
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), holdMs)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
      } else {
        setLineIndex((i) => (i + 1) % lines.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeout)
  }, [text, phase, lineIndex, lines, typeSpeed, holdMs, deleteSpeed])

  return text
}

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

function FadeIn({ children, className = '', delay = 0 }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3">{children}</p>
  )
}

function Divider() {
  return <div className="border-t border-white/5" />
}

/* ── NAV ─────────────────────────────────────────────────────── */
function NavBar() {
  const links = [
    ['About', '#about'],
    ['Experience', '#experience'],
    ['Work', '#work'],
    ['Skills', '#skills'],
    ['Contact', '#contact'],
  ]
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-ink/90 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-lg font-medium text-parchment tracking-tight">
          M. Mobeen
        </a>
        <nav className="hidden md:flex gap-8 font-sans text-sm text-muted">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-parchment transition-colors duration-200">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:m.mobeen2003.786@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="font-sans text-sm px-4 py-1.5 rounded-full border border-amber/50 text-amber hover:bg-amber hover:text-ink transition-colors duration-200"
        >
          Say hello
        </a>
      </div>
    </header>
  )
}

/* ── HERO ────────────────────────────────────────────────────── */
function Hero() {
  const typed = useTypingLoop(LOG_LINES)
  return (
    <section id="top" className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-10 md:pt-20 md:pb-12">
      <div className="grid md:grid-cols-5 gap-10 items-center">

        {/* Left — text */}
        <div className="md:col-span-3 space-y-6">
          <p className="hero-rise font-mono text-xs text-muted tracking-widest uppercase">
            Based in Faisalabad, Pakistan
          </p>

          <h1 className="hero-rise-delay-1 font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-parchment">
            Muhammad
            <br />
            <span className="relative inline-block">
              Mobeen
              <svg
                viewBox="0 0 300 18"
                className="absolute left-0 -bottom-2 w-full h-4"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 12 C 60 4, 140 16, 200 8 S 280 4, 298 10"
                  fill="none"
                  stroke="#E8A33D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="hero-rise-delay-2 font-sans text-lg text-muted leading-relaxed max-w-md">
            MERN Stack Developer building production interfaces and full-stack, AI-integrated apps.
          </p>

          <div className="hero-rise-delay-2 flex flex-wrap gap-3 pt-2">
            <a
              href="mailto:m.mobeen2003.786@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm px-5 py-2.5 rounded-full bg-amber text-ink font-semibold hover:bg-parchment transition-colors duration-200"
            >
              Email me
            </a>
            <a
              href="/Muhammad_Mobeen_CV.pdf"
              download="Muhammad_Mobeen_CV.pdf"
              className="font-sans text-sm px-5 py-2.5 rounded-full border border-white/20 text-parchment hover:border-white/50 hover:bg-white/5 transition-colors duration-200"
            >
              Download CV
            </a>
            <a
              href="#work"
              className="font-sans text-sm px-5 py-2.5 rounded-full border border-white/20 text-parchment hover:border-white/50 hover:bg-white/5 transition-colors duration-200"
            >
              See the work
            </a>
            <a
              href="https://github.com/mobeen9876"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm px-5 py-2.5 rounded-full border border-white/20 text-parchment hover:border-white/50 hover:bg-white/5 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Right — card */}
        <div className="hero-rise-delay-2 md:col-span-2">
          <div className="bg-panel border border-white/8 rounded-2xl p-5 shadow-xl shadow-black/30">
            <div className="flex items-center gap-1.5 mb-5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <p className="font-mono text-sm text-teal">
              currently&nbsp;
              <span className="text-parchment">{typed}</span>
              <span className="caret text-amber">▍</span>
            </p>
            <dl className="mt-5 space-y-0 font-sans text-sm divide-y divide-white/5">
              {[
                ['Role', 'MERN Stack Developer'],
                ['Company', 'TechTrack'],
                ['Experience', '1 year'],
                ['Education', 'BSIT, GCUF — 2026'],
              ].map(([dt, dd]) => (
                <div key={dt} className="flex justify-between py-3">
                  <dt className="text-muted">{dt}</dt>
                  <dd className="text-parchment font-medium">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── ABOUT ───────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 md:px-10 py-16 border-t border-white/5">
      <div className="grid md:grid-cols-5 gap-12 items-start">

        {/* Left */}
        <FadeIn className="md:col-span-2 flex flex-col gap-6">
          <div>
            <SectionLabel>about</SectionLabel>
            <h2 className="font-serif text-3xl text-parchment leading-snug">
              From intern to shipping features on his own
            </h2>
          </div>
          <img
            src="/Mobeen_LinkedIn_Photo.jpg"
            alt="Muhammad Mobeen"
            className="w-44 h-44 rounded-2xl object-cover object-top border border-white/10 shadow-lg shadow-black/40"
          />
        </FadeIn>

        {/* Right */}
        <FadeIn className="md:col-span-3" delay={100}>
          <div className="space-y-5 font-sans text-[17px] text-muted leading-[1.8]">
            <p>
              I'm a MERN stack developer based in Faisalabad, currently building
              production features at TechTrack — I joined as an intern and grew
              into a full-time developer role on the same team.
            </p>
            <p>
              Most of my day-to-day is frontend: turning Figma designs into
              React interfaces with a shared component library, then wiring
              them up to real data. I'm just as comfortable dropping into
              Node.js and MongoDB when a feature needs a new endpoint.
            </p>
            <p>
              Outside of work, I build full-stack side projects that pair
              everyday problems with AI — a voice-to-invoice billing tool and a
              multi-service SaaS platform are the two I'm proudest of. I hold a
              BS in Information Technology from GCUF, class of 2026.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}

/* ── EXPERIENCE ──────────────────────────────────────────────── */
function Experience() {
  const roles = [
    {
      period: 'Mar 2026 — Present',
      title: 'MERN Stack Developer',
      org: 'TechTrack, Faisalabad',
      points: [
        'Build production React interfaces from Figma designs using a shared component library.',
        'Built a Job Management CRUD module for an admin panel, then extended the same pattern to Payment History and Support Ticket modules.',
        'Contributed to a CV-building SaaS product ahead of a CodeCanyon resubmission — navigation fixes, a pricing redesign, and a rebuilt contact page.',
      ],
    },
    {
      period: 'Sep 2025 — Feb 2026',
      title: 'Software Engineering Intern',
      org: 'TechTrack, Faisalabad',
      points: [
        'Onboarded onto live MERN codebases and shipped first production UI changes under senior guidance.',
        'Learned Git/GitHub and npm-based team workflows, and built the React fundamentals everything above is built on.',
      ],
    },
  ]

  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 md:px-10 py-16 border-t border-white/5">
      <FadeIn>
        <SectionLabel>experience</SectionLabel>
        <h2 className="font-serif text-3xl text-parchment mb-12">Where the work happened</h2>
      </FadeIn>

      <div className="relative pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
        <div className="space-y-12">
          {roles.map((role, i) => (
            <FadeIn key={role.title} delay={i * 120}>
              <div className="relative">
                <span className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-amber ring-4 ring-ink" />
                <p className="font-mono text-xs text-teal mb-1 tracking-wide">{role.period}</p>
                <h3 className="font-serif text-2xl text-parchment">{role.title}</h3>
                <p className="font-sans text-sm text-muted mb-4 mt-0.5">{role.org}</p>
                <ul className="space-y-2.5">
                  {role.points.map((point) => (
                    <li key={point} className="font-sans text-[15.5px] text-muted leading-relaxed flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PROJECTS ────────────────────────────────────────────────── */
function ProjectPanel({ index, title, period, description, tags, link, linkLabel }) {
  return (
    <FadeIn delay={index * 100}>
      <div className="py-10 border-t border-white/5">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <p className="font-mono text-xs text-teal mb-2 tracking-wide">{period}</p>
            <h3 className="font-serif text-2xl text-parchment leading-snug">{title}</h3>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-5 font-sans text-sm px-4 py-2 rounded-full border border-amber/40 text-amber hover:bg-amber hover:text-ink transition-colors duration-200"
              >
                {linkLabel}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
            )}
          </div>
          <div className="md:col-span-3">
            <p className="font-sans text-[16.5px] text-muted leading-[1.8] mb-5">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-teal bg-teal/5 border border-teal/20 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

function Projects() {
  const projects = [
    {
      title: 'Multi-Service AI SaaS Platform',
      period: 'Final year project — Nov 2025 to Aug 2026',
      description:
        'A full-stack SaaS platform with role-based access control, Stripe payments, real-time updates through Pusher, and AI features powered by Groq and Gemini. Documented across six chapters in GCUF format, with architecture diagrams — the evaluation panel called it impressive at defence.',
      tags: ['Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'Stripe', 'Pusher', 'Groq', 'Gemini'],
      link: 'https://saa-s-platform-z28j.vercel.app',
      linkLabel: 'View Live',
    },
  ]

  return (
    <section id="work" className="max-w-5xl mx-auto px-6 md:px-10 py-16 border-t border-white/5">
      <FadeIn>
        <SectionLabel>selected work</SectionLabel>
        <h2 className="font-serif text-3xl text-parchment">Projects worth a closer look</h2>
      </FadeIn>
      <div>
        {projects.map((p, i) => (
          <ProjectPanel key={p.title} index={i} {...p} />
        ))}
      </div>
    </section>
  )
}

/* ── SKILLS ──────────────────────────────────────────────────── */
function Skills() {
  const groups = [
    {
      name: 'Frontend',
      items: ['React 18', 'JavaScript (ES6+)', 'Bootstrap 5', 'Vite', 'HTML5', 'CSS3'],
    },
    {
      name: 'Backend',
      items: ['Node.js', 'Express.js', 'MongoDB', 'REST API design'],
    },
    {
      name: 'Integrations & Tools',
      items: ['Stripe', 'OpenAI Whisper', 'OpenAI GPT', 'Groq', 'Gemini', 'Pusher', 'Git / GitHub', 'Vercel'],
    },
  ]
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 md:px-10 py-16 border-t border-white/5">
      <FadeIn>
        <SectionLabel>skills</SectionLabel>
        <h2 className="font-serif text-3xl text-parchment mb-10">What I build with</h2>
      </FadeIn>
      <div className="grid sm:grid-cols-3 gap-8">
        {groups.map((group, i) => (
          <FadeIn key={group.name} delay={i * 80}>
            <div className="bg-panel border border-white/5 rounded-xl p-5">
              <h3 className="font-sans text-xs font-semibold text-amber uppercase tracking-widest mb-4">{group.name}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-sans text-sm text-muted bg-white/4 border border-white/8 rounded-full px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ── EDUCATION ───────────────────────────────────────────────── */
function Education() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 border-t border-white/5">
      <FadeIn>
        <SectionLabel>education & certification</SectionLabel>
        <h2 className="font-serif text-3xl text-parchment mb-10">Background</h2>
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-6">
        <FadeIn delay={80}>
          <div className="bg-panel border border-white/5 rounded-xl p-6 h-full">
            <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3">Education</p>
            <h3 className="font-serif text-xl text-parchment">BS Information Technology</h3>
            <p className="font-sans text-sm text-muted mt-1">Government College University, Faisalabad</p>
            <p className="font-mono text-xs text-teal mt-3">2022 — 2026</p>
          </div>
        </FadeIn>
        <FadeIn delay={160}>
          <div className="bg-panel border border-white/5 rounded-xl p-6 h-full">
            <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3">Certification</p>
            <h3 className="font-serif text-xl text-parchment">Web & Mobile App Development</h3>
            <p className="font-sans text-sm text-muted mt-1">Saylani Mass Training Programme, Batch-8</p>
            <p className="font-mono text-xs text-teal mt-3">Nov 2024 — Aug 2025 · 10 months</p>
            <p className="font-mono text-xs text-muted mt-1">SMIT/2025/WMA/B8/308452</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ── CONTACT ─────────────────────────────────────────────────── */
function Contact() {
  const links = [
    {
      label: 'm.mobeen2003.786@gmail.com',
      href: 'mailto:m.mobeen2003.786@gmail.com',
      target: '_blank',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      ),
    },
    {
      label: '+92 328 0640754',
      href: 'tel:+923280640754',
      target: '_self',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      ),
    },
    {
      label: 'github.com/mobeen9876',
      href: 'https://github.com/mobeen9876',
      target: '_blank',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
      ),
    },
    {
      label: 'linkedin.com/in/muhammad-mobeen',
      href: 'https://www.linkedin.com/in/muhammad-mobeen-192196323',
      target: '_blank',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      ),
    },
  ]

  return (
    <footer id="contact" className="max-w-5xl mx-auto px-6 md:px-10 py-16 border-t border-white/5">
      <FadeIn>
        <SectionLabel>get in touch</SectionLabel>
        <h2 className="font-serif text-4xl md:text-5xl text-parchment max-w-xl leading-tight">
          Looking for a MERN developer in Faisalabad? Let's talk.
        </h2>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-10 grid sm:grid-cols-2 gap-3">
          {links.map(({ label, href, target, icon }) => (
            <a
              key={href}
              href={href}
              target={target}
              rel="noreferrer"
              className="flex items-center gap-3 bg-panel border border-white/5 rounded-xl px-5 py-4 text-muted hover:text-parchment hover:border-white/15 transition-colors duration-200 group"
            >
              <span className="text-amber group-hover:text-parchment transition-colors">{icon}</span>
              <span className="font-sans text-sm">{label}</span>
            </a>
          ))}
        </div>
        <p className="font-mono text-xs text-muted/50 mt-14 text-center">
          Muhammad Mobeen — Faisalabad, Pakistan
        </p>
      </FadeIn>
    </footer>
  )
}

/* ── APP ─────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <NavBar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </div>
  )
}
