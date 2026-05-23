import { useState, useEffect, useRef } from "react";
import "./App.css";
import Work from "./components/Work";
import Posts from "./components/Posts";

// ── Types ─────────────────────────────────────────────────────────────────────

interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url: string }> };
}

interface Project {
  index: string;
  title: string;
  tags: string[];
  desc: string;
  metric: string;
  year: string;
  link?: string;
}

interface SkillGroup {
  group: string;
  items: string[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Product Registration Platform",
    tags: ["PHP", "MySQL", "REST API", "Multi-tenant"],
    desc: "Built a scalable product registration platform from scratch enabling multiple brands to operate within a single unified system, with dynamic email preview generation.",
    metric: "Multi-brand scale",
    year: "2023",
  },
  {
    index: "02",
    title: "eCommerce Site Catalog",
    tags: ["WordPress", "WooCommerce", "JavaScript", "WCAG"],
    desc: "Owned full development and feature work for dozens of responsive eCommerce sites, serving as primary dev for a high-traffic client brand with full accessibility compliance.",
    metric: "Dozens of sites",
    year: "2024–2026",
  },
  {
    index: "03",
    title: "Plugin Version Monitor",
    tags: ["WordPress API", "Internal Tooling", "PHP"],
    desc: "Developed internal tooling using WordPress APIs to monitor plugin versions across multiple environments — reducing maintenance overhead and preventing rework.",
    metric: "Multi-env coverage",
    year: "2025",
  },
  {
    index: "04",
    title: "REST API Design & Integration",
    tags: ["REST API", "AJAX", "JSON", "PHP"],
    desc: "Designed and extended REST API endpoints supporting CRUD operations and complex workflows. Integrated frontend interfaces with async JavaScript across multi-tenant apps.",
    metric: "High-traffic APIs",
    year: "2022–2024",
  },
];

const SKILLS: SkillGroup[] = [
  { group: "Frontend",       items: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "Tailwind", "AJAX"] },
  { group: "Backend",        items: ["PHP", "MySQL", "REST API", "JSON", "WordPress", "WooCommerce", "Gutenberg"] },
  { group: "DevOps & Tools", items: ["Docker", "CI/CD", "Git", "Bitbucket Pipelines", "AWS"] },
  { group: "Practices",      items: ["Accessibility (WCAG)", "Multi-tenant Architecture", "API Design", "AI-assisted dev"] },
];

const EXPERIENCE = [
  { role: "Software Engineer", co: "Beyond The Brand Media", period: "2024–2026" },
  { role: "Software Engineer", co: "Promosis",               period: "2022–2024" },
  { role: "Software Engineer", co: "NL Softworks",           period: "2021–2022" },
];

const STATS = [
  { n: "4+",   label: "Years of experience"   },
  { n: "3",    label: "Companies"             },
  { n: "WCAG", label: "Accessibility standard" },
  { n: "CI/CD",label: "Deployment practice"   },
];

const WP_API_URL = "https://johnmackeydesigns.com/wp-json/wp/v2/posts?_embed&per_page=3";

// ── Hook: IntersectionObserver ────────────────────────────────────────────────

function useInView(threshold = 0.12): [React.RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null!);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── SlideWord ─────────────────────────────────────────────────────────────────

function SlideWord({ word, visible, delay }: { word: string; visible: boolean; delay: number }) {
  return (
    <span className="slide-word">
      <span
        className={`slide-word__inner ${visible ? "slide-word__inner--visible" : "slide-word__inner--hidden"}`}
        style={{ transitionDelay: `${delay}s` }}
      >
        {word}
      </span>
    </span>
  );
}

// ── Typewriter ────────────────────────────────────────────────────────────────

function Typewriter({ strings, visible }: { strings: string[]; visible: boolean }) {
  const [display, setDisplay]   = useState("");
  const [idx, setIdx]           = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted]   = useState(false);

  useEffect(() => {
    if (visible && !started) {
      const t = setTimeout(() => setStarted(true), 1400);
      return () => clearTimeout(t);
    }
  }, [visible, started]);

  useEffect(() => {
    if (!started) return;
    const current = strings[idx];
    let delay = deleting ? 45 : 80;
    if (!deleting && charIdx === current.length) delay = 2200;
    if (deleting  && charIdx === 0)              delay = 400;

    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setIdx(i => (i + 1) % strings.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [started, charIdx, deleting, idx, strings]);

  return (
    <span>
      {display}
      <span className="hero__caret" />
    </span>
  );
}

// ── HeroParticles ─────────────────────────────────────────────────────────────

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const dots = Array.from({ length: 38 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o:  Math.random() * 0.35 + 0.05,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,107,74,${d.o})`;
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(26,107,74,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth   = 0.5;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" />;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrollY, setScrollY]               = useState(0);
  const [heroVisible, setHeroVisible]       = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [posts, setPosts]                   = useState<WPPost[]>([]);
  const [postsLoading, setPostsLoading]     = useState(true);
  const [postsError, setPostsError]         = useState(false);

  const [worksRef,   worksVisible]   = useInView();
  const [aboutRef,   aboutVisible]   = useInView();
  const [skillsRef,  skillsVisible]  = useInView();
  const [blogRef,    blogVisible]    = useInView();
  const [contactRef, contactVisible] = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    fetch(WP_API_URL)
      .then(r => { if (!r.ok) throw new Error("WP fetch failed"); return r.json(); })
      .then((data: WPPost[]) => { setPosts(data); setPostsLoading(false); })
      .catch(() => { setPostsError(true); setPostsLoading(false); });
  }, []);

  return (
    <div className="portfolio-root">

      {/* ── Nav ── */}
      <nav className={`nav ${scrollY > 60 ? "nav--scrolled" : ""}`}>
        <span className="nav__logo">John Mackey</span>
        <ul className="nav__links">
          {["Work", "About", "Skills", "Writing", "Contact"].map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div
          className="hero__dot-grid"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <HeroParticles />
        <div className="hero__vignette" />

        <div className="hero__content">
          <p className={`hero__eyebrow ${heroVisible ? "hero__eyebrow--visible" : ""}`}>
            Software Engineer · Salem, Massachusetts
          </p>

          <h1 className="hero__name">
            <SlideWord word="John"    visible={heroVisible} delay={0.10} />
            {" "}
            <SlideWord word="Mackey"  visible={heroVisible} delay={0.28} />
            <br />
            <span className="hero__name-sub">
              <SlideWord word="builds"  visible={heroVisible} delay={0.46} />
              {" "}
              <span className="hero__name-sub-accent">
                <SlideWord word="for"   visible={heroVisible} delay={0.56} />
              </span>
              {" "}
              <SlideWord word="the web." visible={heroVisible} delay={0.66} />
            </span>
          </h1>

          <div className={`hero__typewriter-row ${heroVisible ? "hero__typewriter-row--visible" : ""}`}>
            <div className="hero__typewriter-line" />
            <p className="hero__typewriter-text">
              <Typewriter
                strings={[
                  "Frontend performance & accessibility.",
                  "Scalable multi-tenant platforms.",
                  "Clean, maintainable code.",
                  "WordPress & API integration.",
                ]}
                visible={heroVisible}
              />
            </p>
          </div>

          <p className={`hero__bio ${heroVisible ? "hero__bio--visible" : ""}`}>
            4+ years building responsive eCommerce sites and scalable web applications.
            Strong emphasis on frontend performance, accessibility, and user experience.
          </p>

          <div className={`hero__cta-row ${heroVisible ? "hero__cta-row--visible" : ""}`}>
            <a href="#work"    className="btn btn--primary">View Work</a>
            <a href="#contact" className="btn btn--secondary">Get in Touch</a>
          </div>
        </div>

        <div className={`hero__scroll-hint ${scrollY > 60 ? "hero__scroll-hint--hidden" : "hero__scroll-hint--visible"}`}>
          <span className="hero__scroll-label">scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── Work ── */}
      <section
        className="section section--border-top"
        id="work"
        ref={worksRef as React.RefObject<HTMLElement>}
      >
        <div className="section__eyebrow">
          <div className="section__eyebrow-line" />
          <span>Selected Work</span>
        </div>

        {PROJECTS.map((p, i) => (
          <Work key={p.index} p={p} i={i} hoveredProject={hoveredProject} setHoveredProject={setHoveredProject} worksVisible={worksVisible} />
        ))}
      </section>

      {/* ── About ── */}
      <section
        className="section section--alt"
        id="about"
        ref={aboutRef as React.RefObject<HTMLElement>}
      >
        <div className="section__eyebrow">
          <div className="section__eyebrow-line" />
          <span>About</span>
        </div>

        <div className="about__grid">
          <div className={`about__col ${aboutVisible ? "about__col--visible" : ""}`}>
            <h2 className="about__heading">
              Frontend-focused,<br />
              <em>performance-obsessed.</em>
            </h2>
            <p className="about__text">
              I'm a software engineer with 4+ years of experience building and maintaining
              scalable web applications and high-traffic sites. My work spans full-stack
              development, accessibility remediation, API design, and multi-tenant architectures.
            </p>
            <p className="about__text">
              I take ownership of client-facing systems from scoping to delivery — working
              closely with clients and designers to build solutions that are reliable, performant,
              and genuinely useful.
            </p>
            <p className="about__text">
              When I'm not building, you'll find me writing about the web at{" "}
              <a href="https://johnmackeydesigns.com" className="about__link">
                johnmackeydesigns.com
              </a>.
            </p>
          </div>

          <div className={`about__col about__col--delay ${aboutVisible ? "about__col--visible" : ""}`}>
            <div className="about__stats">
              {STATS.map(st => (
                <div key={st.label} className="stat-card">
                  <div className="stat-card__number">{st.n}</div>
                  <div className="stat-card__label">{st.label}</div>
                </div>
              ))}
            </div>

            <div className="experience-card">
              <p className="experience-card__label">Experience</p>
              {EXPERIENCE.map(job => (
                <div key={job.co} className="experience-card__row">
                  <div>
                    <span className="experience-card__company">{job.co}</span>
                    <span className="experience-card__role">· {job.role}</span>
                  </div>
                  <span className="experience-card__period">{job.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        className="section"
        id="skills"
        ref={skillsRef as React.RefObject<HTMLElement>}
      >
        <div className="section__eyebrow">
          <div className="section__eyebrow-line" />
          <span>Skills</span>
        </div>

        <div className="skills__grid">
          {SKILLS.map((grp, gi) => (
            <div
              key={grp.group}
              className={`skills__group ${skillsVisible ? "skills__group--visible" : ""}`}
              style={{ transitionDelay: `${gi * 0.1}s` }}
            >
              <p className="skills__group-label">{grp.group}</p>
              <div className="skills__pills">
                {grp.items.map((item, ii) => (
                  <span
                    key={item}
                    className={`skill-pill ${skillsVisible ? "skill-pill--visible" : ""}`}
                    style={{ transitionDelay: `${gi * 0.1 + ii * 0.04}s` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Writing ── */}
      <section
        className="section section--alt section--border-top"
        id="writing"
        ref={blogRef as React.RefObject<HTMLElement>}
      >
        <div className="section__eyebrow">
          <div className="section__eyebrow-line" />
          <span>Writing</span>
          <a href="https://johnmackeydesigns.com" className="section__eyebrow-link">
            View all →
          </a>
        </div>

        {postsLoading && (
          <div className="blog__skeletons">
            {[0, 1, 2].map(i => <div key={i} className="blog__skeleton" />)}
          </div>
        )}

        {postsError && (
          <div className="blog__error">
            <p className="blog__error-text">
              Couldn't load posts right now.{" "}
              <a href="https://johnmackeydesigns.com" className="blog__error-link">
                Visit the blog directly →
              </a>
            </p>
          </div>
        )}

        {!postsLoading && !postsError && posts.length === 0 && (
          <p className="blog__empty">No posts found yet.</p>
        )}

        {!postsLoading && !postsError && posts.length > 0 && (
          <Posts posts={posts} blogVisible={blogVisible} />
        )}
      </section>

      {/* ── Contact ── */}
      <section
        className="section section--center"
        id="contact"
        ref={contactRef as React.RefObject<HTMLElement>}
      >
        <div className="contact__inner">
          <h2 className={`contact__heading ${contactVisible ? "contact__heading--visible" : ""}`}>
            Let's work <em>together.</em>
          </h2>
          <p className={`contact__sub ${contactVisible ? "contact__sub--visible" : ""}`}>
            Open to new opportunities — full-time roles, contracts, and interesting collaborations.
          </p>
          <div className={`contact__links ${contactVisible ? "contact__links--visible" : ""}`}>
            {[
              { label: "Email",          href: "mailto:xjmackey@gmail.com" },
              { label: "LinkedIn",       href: "https://www.linkedin.com/in/xjmackey/" },
              { label: "GitHub",         href: "https://github.com/jahonay" },
              { label: "Portfolio site", href: "https://johnmackeydesigns.com" },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                {l.label}
              </a>
            ))}
          </div>
          <p className="contact__email-note">
            or reach me at{" "}
            <a href="mailto:xjmackey@gmail.com" className="contact__email-link">
              xjmackey@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer__logo">John Mackey</span>
        <span className="footer__meta">617-947-8614 · Salem, MA</span>
        <span className="footer__meta">© 2026</span>
      </footer>

    </div>
  );
}
