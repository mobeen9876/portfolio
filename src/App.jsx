import { useEffect, useState } from 'react'

const LOG_LINES = [
  'shipping React screens from Figma, pixel by pixel',
  'teaching a billing app to listen and talk back',
  'wiring Stripe, Whisper, and GPT into one stack',
  'turning a CRUD module into three CRUD modules',
]

function useTypingLoop(lines, typeSpeed = 38, holdMs = 1400, deleteSpeed = 22) {
  const [lineIndex, setLineIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing') // typing | holding | deleting

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

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-xs text-teal tracking-wide mb-4">{children}</p>
  )
}

function NavBar() {
  const links = [
    ['About', '#about'],
    ['Experience', '#experience'],
    ['Work', '#work'],
    ['Skills', '#skills'],
    ['Contact', '#contact'],
  ]
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-ink/80 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-lg text-parchment">
          M. Mobeen
        </a>
        <nav className="hidden md:flex gap-8 font-sans text-sm text-muted">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-parchment transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:m.mobeen2003.786@gmail.com"
          className="font-mono text-xs px-3 py-1.5 rounded border border-amber/40 text-amber hover:bg-amber hover:text-ink transition-colors"
        >
          say hello
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const typed = useTypingLoop(LOG_LINES)
  return (
    <section id="top" className="max-w-5xl mx-auto px-6 md:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3">
          <p className="hero-rise font-mono text-xs text-muted mb-6">
            based in Faisalabad, Pakistan
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
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="hero-rise-delay-2 font-sans text-xl text-muted mt-6 max-w-md">
            MERN Stack Developer building production interfaces and
            full-stack, AI-integrated apps.
          </p>

          <div className="hero-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:m.mobeen2003.786@gmail.com"
              className="font-sans text-sm px-5 py-2.5 rounded bg-amber text-ink font-medium hover:bg-parchment transition-colors"
            >
              Email me
            </a>
            <a
              href="#work"
              className="font-sans text-sm px-5 py-2.5 rounded border border-white/15 text-parchment hover:border-white/40 transition-colors"
            >
              See the work
            </a>
            <a
              href="https://github.com/mobeen9876"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm px-5 py-2.5 rounded border border-white/15 text-parchment hover:border-white/40 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-panel border border-white/5 rounded-lg p-5">
            <div className="flex gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <p className="font-mono text-sm text-teal">
              currently&nbsp;
              <span className="text-parchment">{typed}</span>
              <span className="caret text-amber">▍</span>
            </p>
            <dl className="mt-6 space-y-3 font-sans text-sm">
              <div className="flex justify-between border-t border-white/5 pt-3">
                <dt className="text-muted">Role</dt>
                <dd className="text-parchment">MERN Stack Developer</dd>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <dt className="text-muted">Company</dt>
                <dd className="text-parchment">TechTrack</dd>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <dt className="text-muted">Experience</dt>
                <dd className="text-parchment">1 year</dd>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <dt className="text-muted">Education</dt>
                <dd className="text-parchment">BSIT, GCUF — 2026</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-white/5">
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionLabel>about</SectionLabel>
          <h2 className="font-serif text-3xl text-parchment">
            From intern to shipping features on his own
          </h2>
        </div>
        <div className="md:col-span-3 font-sans text-muted leading-relaxed space-y-4 text-[17px]">
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
            multi-service SaaS platform are the two I'm proudest of. I'm
            finishing a BS in Information Technology at Government College
            University Faisalabad, graduating in 2026.
          </p>
        </div>
      </div>
    </section>
  )
}

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
    <section id="experience" className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-white/5">
      <SectionLabel>experience</SectionLabel>
      <h2 className="font-serif text-3xl text-parchment mb-12">Where the work happened</h2>

      <div className="relative pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
        <div className="space-y-14">
          {roles.map((role) => (
            <div key={role.title} className="relative">
              <span className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-amber" />
              <p className="font-mono text-xs text-teal mb-2">{role.period}</p>
              <h3 className="font-serif text-2xl text-parchment">{role.title}</h3>
              <p className="font-sans text-sm text-muted mb-4">{role.org}</p>
              <ul className="space-y-2">
                {role.points.map((point) => (
                  <li key={point} className="font-sans text-[16px] text-muted leading-relaxed flex gap-3">
                    <span className="text-amber mt-1.5 w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectPanel({ index, title, period, description, tags, link, linkLabel }) {
  const flip = index % 2 === 1
  return (
    <div className={`grid md:grid-cols-5 gap-8 py-14 border-t border-white/5 ${flip ? 'md:text-right' : ''}`}>
      <div className={`md:col-span-2 ${flip ? 'md:order-2' : ''}`}>
        <p className="font-mono text-xs text-teal mb-3">{period}</p>
        <h3 className="font-serif text-3xl text-parchment leading-tight">{title}</h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={`inline-block mt-5 font-sans text-sm px-4 py-2 rounded border border-white/15 text-parchment hover:border-amber hover:text-amber transition-colors`}
          >
            {linkLabel}
          </a>
        )}
      </div>
      <div className={`md:col-span-3 ${flip ? 'md:order-1' : ''}`}>
        <p className="font-sans text-[17px] text-muted leading-relaxed mb-5">{description}</p>
        <div className={`flex flex-wrap gap-2 ${flip ? 'md:justify-end' : ''}`}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-teal border border-teal/30 rounded px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
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
      link: 'https://github.com/mobeen9876/SaaS-Platform-Complete',
      linkLabel: 'View on GitHub',
    },
    {
      title: 'AI Voice Billing System',
      period: 'Personal project',
      description:
        'A voice-to-invoice billing app for a mobile accessories shop: speech gets transcribed with OpenAI Whisper and turned into a structured invoice with GPT. Includes inline invoice detail panels, pagination, and modal-based product management.',
      tags: ['MERN', 'OpenAI Whisper', 'OpenAI GPT', 'Vercel'],
      link: null,
      linkLabel: 'View project',
    },
  ]

  return (
    <section id="work" className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-white/5">
      <SectionLabel>selected work</SectionLabel>
      <h2 className="font-serif text-3xl text-parchment">Two projects worth a closer look</h2>
      <div>
        {projects.map((p, i) => (
          <ProjectPanel key={p.title} index={i} {...p} />
        ))}
      </div>
    </section>
  )
}

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
      name: 'Integrations & tools',
      items: ['Stripe', 'OpenAI Whisper', 'OpenAI GPT', 'Groq', 'Gemini', 'Pusher', 'Git / GitHub', 'Vercel'],
    },
  ]
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-white/5">
      <SectionLabel>skills</SectionLabel>
      <h2 className="font-serif text-3xl text-parchment mb-12">What I build with</h2>
      <div className="grid sm:grid-cols-3 gap-10">
        {groups.map((group) => (
          <div key={group.name}>
            <h3 className="font-sans text-sm font-medium text-amber mb-4">{group.name}</h3>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="font-sans text-[16px] text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <SectionLabel>education</SectionLabel>
          <h3 className="font-serif text-2xl text-parchment">BS Information Technology</h3>
          <p className="font-sans text-muted mt-2">Government College University, Faisalabad</p>
          <p className="font-mono text-xs text-teal mt-2">2022 — 2026</p>
        </div>
        <div>
          <SectionLabel>certification</SectionLabel>
          <h3 className="font-serif text-2xl text-parchment">
            Web and Mobile App Development
          </h3>
          <p className="font-sans text-muted mt-2">
            Saylani Mass Training Programme, Batch-8
          </p>
          <p className="font-mono text-xs text-teal mt-2">Nov 2024 — Aug 2025 · 10 months</p>
          <p className="font-mono text-xs text-muted mt-1">SMIT/2025/WMA/B8/308452</p>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer id="contact" className="max-w-5xl mx-auto px-6 md:px-10 py-24 border-t border-white/5">
      <SectionLabel>get in touch</SectionLabel>
      <h2 className="font-serif text-4xl md:text-5xl text-parchment max-w-xl leading-tight">
        Looking for a MERN developer in Faisalabad? Let's talk.
      </h2>
      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-sans text-[16px]">
        <a href="mailto:m.mobeen2003.786@gmail.com" className="text-parchment hover:text-amber transition-colors">
          m.mobeen2003.786@gmail.com
        </a>
        <a href="tel:+923280640754" className="text-parchment hover:text-amber transition-colors">
          +92 328 0640754
        </a>
        <a href="https://github.com/mobeen9876" target="_blank" rel="noreferrer" className="text-parchment hover:text-amber transition-colors">
          github.com/mobeen9876
        </a>
        <a href="#" className="text-parchment hover:text-amber transition-colors">
          linkedin.com/in/your-handle
        </a>
      </div>
      <p className="font-mono text-xs text-muted mt-16">Muhammad Mobeen — Faisalabad, Pakistan</p>
    </footer>
  )
}

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
