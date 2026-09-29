import { useEffect, useMemo, useRef, useState } from 'react'
import { certs, education, profile, roles, skills, summary, ui, yearsOfExperience, type Lang, type Role } from './data/cv'

const MONTHS: Record<Lang, string[]> = {
  id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

const toIndex = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}
const nowIndex = () => {
  const d = new Date()
  return d.getFullYear() * 12 + d.getMonth()
}
const fmt = (ym: string, lang: Lang) => {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS[lang][m - 1]} ${y}`
}
const duration = (months: number, lang: Lang) => {
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = []
  if (y) parts.push(`${y} ${ui.yrs[lang]}`)
  if (m) parts.push(`${m} ${ui.mos[lang]}`)
  return parts.join(' ') || `1 ${ui.mos[lang]}`
}

const isBrowser = typeof window !== 'undefined'
const reducedMotion = () => isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>(() => (isBrowser && document.documentElement.lang === 'en' ? 'en' : 'id'))
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {}
  }, [lang])
  return [lang, setLang]
}

function useTheme(): [boolean, () => void] {
  const query = '(prefers-color-scheme: dark)'
  const read = () => {
    if (!isBrowser) return false
    const t = document.documentElement.dataset.theme
    return t ? t === 'dark' : window.matchMedia(query).matches
  }
  const [dark, setDark] = useState(read)
  const toggle = () => {
    const next = !dark
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    setDark(next)
  }
  return [dark, toggle]
}

// Publishes scroll position as CSS variables so the parallax itself stays in CSS.
function useScrollVars() {
  useEffect(() => {
    if (reducedMotion()) return
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - innerHeight
      const root = document.documentElement.style
      root.setProperty('--sy', String(Math.round(scrollY)))
      root.setProperty('--p', max > 0 ? String(Math.min(1, scrollY / max)) : '0')
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}

// Fades elements in as they enter the viewport. Content stays visible if this never runs.
function useReveal() {
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) return
    const root = document.documentElement
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    root.classList.add('reveal-on')
    return () => {
      io.disconnect()
      root.classList.remove('reveal-on')
    }
  }, [])
}

const jump = (id: string) => (e: React.MouseEvent) => {
  const el = document.getElementById(id)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

// Types out the role headline, deletes it, then moves on to the next one.
function TypedRole({ label }: { label: string }) {
  const words = profile.typedRoles
  const [text, setText] = useState(words[0])
  const st = useRef({ i: 0, n: words[0].length, del: true })
  useEffect(() => {
    if (reducedMotion()) return
    let t: number
    const tick = () => {
      const s = st.current
      const word = words[s.i]
      let delay = s.del ? 38 : 80
      if (!s.del) {
        s.n += 1
        if (s.n === word.length) {
          s.del = true
          delay = 1600
        }
      } else {
        s.n -= 1
        if (s.n === 0) {
          s.del = false
          s.i = (s.i + 1) % words.length
          delay = 350
        }
      }
      setText(word.slice(0, s.n))
      t = window.setTimeout(tick, delay)
    }
    t = window.setTimeout(tick, 2200)
    return () => clearTimeout(t)
  }, [words])
  return (
    <p className="eyebrow" aria-label={label}>
      <span className="prompt" aria-hidden="true">&gt;</span>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  )
}

const Cmt = ({ children }: { children: string }) => <span className="cmt">{`// ${children}`}</span>

// [glyph, left, top, parallax depth]
const glyphs: [string, string, string, string][] = [
  ['{ }', '6%', '14%', '0.22'],
  ['</>', '84%', '22%', '0.34'],
  ['=>', '72%', '62%', '0.14'],
  ['[ ]', '12%', '70%', '0.3'],
  ['&&', '90%', '86%', '0.2'],
  ['0x', '44%', '92%', '0.12'],
  [';', '30%', '38%', '0.4'],
]

function BackdropGlyphs() {
  return (
    <div className="glyphs" aria-hidden="true">
      {glyphs.map(([g, x, y, d]) => (
        <span key={g} style={{ left: x, top: y, ['--depth' as string]: d }}>
          {g}
        </span>
      ))}
    </div>
  )
}

function CodeCard() {
  const lines: React.ReactNode[] = [
    <>
      <i className="k">const</i> <i className="v">thony</i> = {'{'}
    </>,
    <>
      {'  '}role: <i className="s">"Software Engineer"</i>,
    </>,
    <>
      {'  '}since: <i className="n">{profile.careerStart.slice(0, 4)}</i>,
    </>,
    <>
      {'  '}focus: [<i className="s">"backend"</i>, <i className="s">"web"</i>, <i className="s">"mobile"</i>],
    </>,
    <>
      {'  '}stack: [<i className="s">"PHP"</i>, <i className="s">"C#"</i>, <i className="s">"JS"</i>, <i className="s">"Kotlin"</i>],
    </>,
    <>
      {'  '}mentors: <i className="n">true</i>,
    </>,
    <>
      {'  '}exploring: <i className="s">"AI"</i>,
    </>,
    <>
      {'  '}openTo: <i className="s">"{ui.openTo.en}"</i>,
    </>,
    <>{'};'}</>,
  ]
  return (
    <div className="codecard" aria-hidden="true">
      <div className="codecard-bar">
        <b />
        <b />
        <b />
        <span>thony.ts</span>
      </div>
      <pre>
        {lines.map((l, i) => (
          <div key={i} className="cl" style={{ animationDelay: `${0.5 + i * 0.16}s` }}>
            <span className="ln">{i + 1}</span>
            {l}
          </div>
        ))}
      </pre>
    </div>
  )
}

function Header({ lang, setLang, dark, toggleTheme }: {
  lang: Lang
  setLang: (l: Lang) => void
  dark: boolean
  toggleTheme: () => void
}) {
  const links = [
    ['about', ui.navAbout],
    ['career', ui.navCareer],
    ['skills', ui.navSkills],
    ['background', ui.navBackground],
    ['contact', ui.navContact],
  ] as const
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a className="brand" href="#top" onClick={jump('top')} aria-label={profile.name}>
          <span className="brand-mark" aria-hidden="true">TH</span>
          <span className="brand-name">Thony Hermawan</span>
        </a>
        <nav className="nav" aria-label="Main">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={jump(id)}>
              {label[lang]}
            </a>
          ))}
        </nav>
        <div className="controls">
          <div className="seg" role="group" aria-label={ui.langLabel[lang]}>
            {(['id', 'en'] as Lang[]).map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={ui.themeLabel[lang]} aria-pressed={dark}>
            {dark ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ lang }: { lang: Lang }) {
  const months = nowIndex() - toIndex(profile.careerStart)
  const current = roles.find((r) => r.end === null)!
  return (
    <section id="top" className="hero wrap">
      <div className="hero-main">
        <TypedRole label={ui.roleLine[lang]} />
        <h1 className="hero-name">
          <span className="px-a">Thony</span> <span className="px-b">Hermawan</span>
        </h1>
        <p className="hero-lead">{ui.heroLead[lang]}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact" onClick={jump('contact')}>
            {ui.ctaContact[lang]}
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
            {ui.ctaPrint[lang]}
          </button>
        </div>
      </div>
      <div className="hero-side">
        <CodeCard />
      </div>
      <dl className="status">
        <div>
          <dt>{ui.statusNow[lang]}</dt>
          <dd>
            <span className="pulse" aria-hidden="true" />
            {current.title[lang]}, {current.company}
          </dd>
        </div>
        <div>
          <dt>{ui.statusSince[lang]}</dt>
          <dd>
            {fmt(profile.careerStart, lang)} <span className="dim">· {duration(months, lang)}</span>
          </dd>
        </div>
      </dl>
    </section>
  )
}

function About({ lang }: { lang: Lang }) {
  return (
    <section id="about" className="section wrap two-col">
      <div className="title-block">
        <Cmt>about.md</Cmt>
        <h2 className="section-title">{ui.aboutTitle[lang]}</h2>
      </div>
      <div className="prose reveal">
        {summary(yearsOfExperience()).map((p, i) => (
          <p key={i}>{p[lang]}</p>
        ))}
      </div>
    </section>
  )
}

// Career Gantt: one row per role, positioned by real dates.
function Timeline({ lang }: { lang: Lang }) {
  const start = toIndex('2015-11')
  const end = nowIndex() + 1
  const span = end - start
  const firstYear = 2016
  const lastYear = Math.floor((end - 1) / 12)
  const ticks = []
  for (let y = firstYear; y <= lastYear; y += 1) ticks.push(y)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const ordered = [...roles].reverse()

  return (
    <section className="section wrap" aria-labelledby="timeline-title">
      <div className="section-head">
        <div className="title-block">
          <Cmt>timeline.log</Cmt>
          <h2 id="timeline-title" className="section-title">{ui.timelineTitle[lang]}</h2>
        </div>
        <p className="hint">{ui.timelineHint[lang]}</p>
      </div>
      <div className={`gantt${ready ? ' is-ready' : ''}`}>
        <div className="gantt-axis" aria-hidden="true">
          {ticks.map((y) => (
            <span key={y} style={{ left: `${((y * 12 - start) / span) * 100}%` }}>
              {y}
            </span>
          ))}
        </div>
        <ul className="gantt-rows">
          {ordered.map((r, i) => {
            const s = toIndex(r.start)
            const e = r.end ? toIndex(r.end) + 1 : end
            const left = ((s - start) / span) * 100
            const width = ((e - s) / span) * 100
            const label = `${r.title[lang]}, ${r.company}: ${fmt(r.start, lang)} – ${r.end ? fmt(r.end, lang) : ui.now[lang]}`
            return (
              <li key={r.id} className="gantt-row">
                <a
                  href={`#role-${r.id}`}
                  onClick={jump(`role-${r.id}`)}
                  className={`bar${r.end === null ? ' is-current' : ''}${width > 22 ? ' label-in' : ''}`}
                  style={{ left: `${left}%`, width: `${width}%`, transitionDelay: `${i * 90}ms` }}
                  aria-label={label}
                  title={label}
                >
                  <span className="bar-label">{r.company.replace('PT ', '')}</span>
                </a>
              </li>
            )
          })}
        </ul>
        <div className="gantt-grid" aria-hidden="true">
          {ticks.map((y) => (
            <i key={y} style={{ left: `${((y * 12 - start) / span) * 100}%` }} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoleEntry({ role, lang }: { role: Role; lang: Lang }) {
  const s = toIndex(role.start)
  const e = role.end ? toIndex(role.end) : nowIndex()
  return (
    <li id={`role-${role.id}`} className={`reveal role${role.end === null ? ' is-current' : ''}`}>
      <div className="role-meta">
        <span className="role-dates">
          {fmt(role.start, lang)} – {role.end ? fmt(role.end, lang) : ui.now[lang]}
        </span>
        <span className="role-dur">{duration(e - s + 1, lang)}</span>
      </div>
      <div className="role-body">
        <h3>{role.title[lang]}</h3>
        <p className="role-company">
          {role.company} <span className="dim">· {role.place}</span>
        </p>
        <ul className="bullets">
          {role.bullets.map((b, i) => (
            <li key={i}>{b[lang]}</li>
          ))}
        </ul>
        {role.stack && (
          <ul className="chips chips-sm" aria-label="Stack">
            {role.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

function Career({ lang }: { lang: Lang }) {
  return (
    <section id="career" className="section wrap two-col">
      <div className="title-block">
        <Cmt>experience.log</Cmt>
        <h2 className="section-title">{ui.careerTitle[lang]}</h2>
      </div>
      <ol className="roles">
        {roles.map((r) => (
          <RoleEntry key={r.id} role={r} lang={lang} />
        ))}
      </ol>
    </section>
  )
}

function Skills({ lang }: { lang: Lang }) {
  return (
    <section id="skills" className="section wrap two-col">
      <div className="title-block">
        <Cmt>skills[]</Cmt>
        <h2 className="section-title">{ui.skillsTitle[lang]}</h2>
      </div>
      <div className="skill-groups">
        {skills.map((g) => (
          <div key={g.label.en} className="skill-group reveal">
            <h3>{g.label[lang]}</h3>
            <ul className="chips">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Background({ lang }: { lang: Lang }) {
  return (
    <section id="background" className="section wrap two-col">
      <div className="title-block">
        <Cmt>education.json</Cmt>
        <h2 className="section-title">{ui.eduTitle[lang]}</h2>
      </div>
      <div className="bg-grid">
        <div className="card reveal">
          <p className="card-kicker">
            {ui.graduated[lang]} {education.year} · {ui.gpa[lang]} {education.gpa}
          </p>
          <h3>{education.degree[lang]}</h3>
          <p>{education.major[lang]}</p>
          <p className="dim">{education.school}</p>
        </div>
        <div className="card reveal">
          <p className="card-kicker">{ui.certTitle[lang]}</p>
          <ul className="cert-list">
            {certs.map((c) => (
              <li key={c.en}>{c[lang]}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact({ lang }: { lang: Lang }) {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <Cmt>contact()</Cmt>
        <h2 className="contact-title">{ui.contactTitle[lang]}</h2>
        <p className="contact-body">{ui.contactBody[lang]}</p>
        <a className="mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <p className="contact-meta">
          {profile.location} ·{' '}
          <a href={profile.github} rel="noopener">
            GitHub
          </a>
        </p>
      </div>
    </section>
  )
}

export default function App() {
  const [lang, setLang] = useLang()
  const [dark, toggleTheme] = useTheme()
  const year = useMemo(() => new Date().getFullYear(), [])
  useScrollVars()
  useReveal()
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <BackdropGlyphs />
      <a className="skip" href="#about">{ui.skipLink[lang]}</a>
      <Header lang={lang} setLang={setLang} dark={dark} toggleTheme={toggleTheme} />
      <main>
        <Hero lang={lang} />
        <Timeline lang={lang} />
        <About lang={lang} />
        <Career lang={lang} />
        <Skills lang={lang} />
        <Background lang={lang} />
      </main>
      <Contact lang={lang} />
      <footer className="footer wrap">
        © {year} {profile.name}
      </footer>
    </>
  )
}
