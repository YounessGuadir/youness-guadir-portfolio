import { useEffect, useRef, useState, type CSSProperties } from "react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const navItems = [
  { number: "01", label: "Profil", href: "#about" },
  { number: "02", label: "Parcours", href: "#experience" },
  { number: "03", label: "Projets", href: "#projects" },
  { number: "04", label: "Expertise", href: "#skills" },
];

const experiences = [
  {
    period: "03 — 05 / 2025",
    role: "Développeur Web Full Stack",
    company: "Barid Al-Maghrib",
    description:
      "Courrier multi-acteurs · rôles · JWT.",
    stack: ["Laravel", "React.js", "MySQL", "JWT"],
  },
  {
    period: "09 — 10 / 2025",
    role: "Développeur Back-end & Sécurité",
    company: "ISI CODE",
    description:
      "Formation sécurisée · SSO · OAuth2.",
    stack: ["Spring Boot", "Spring Security", "OAuth2", "JWT"],
  },
  {
    period: "10 / 2025 — 01 / 2026",
    role: "Développeur Full Stack .NET",
    company: "Neosys / NeotechSolutions",
    description:
      "Plateforme métier · documents · Keycloak.",
    stack: ["ASP.NET Core", "SQL Server", "Keycloak", "Azure DevOps"],
  },
  {
    period: "03 — 05 / 2026",
    role: "Cybersécurité Offensive",
    company: "Ministère de la Transition Énergétique",
    description:
      "Security labs · OWASP Top 10.",
    stack: ["Kali Linux", "Burp Suite", "OWASP", "TryHackMe"],
  },
];

const projects = [
  {
    id: "01",
    name: "CV Generator",
    label: "Architecture métier",
    summary:
      "CV dynamique, génération PDF et architecture métier propre.",
    stack: ["ASP.NET Core", "DDD", "CQRS", "Keycloak", "SQL Server"],
    visual: "document",
  },
  {
    id: "02",
    name: "SkyBook",
    label: "Expérience Full Stack",
    summary:
      "Recherche, réservation et administration de vols.",
    stack: ["Laravel", "React", "Kafka", "Tailwind CSS"],
    visual: "flight",
  },
  {
    id: "03",
    name: "Client Microservices",
    label: "Systèmes distribués",
    summary:
      "API .NET, Angular et communication asynchrone.",
    stack: ["ASP.NET Core", "Angular", "RabbitMQ", "Docker"],
    visual: "system",
  },
];

const skillGroups = [
  {
    number: "A",
    title: "Engineering",
    items: ["C# / ASP.NET Core", "Java / Spring Boot", "PHP / Laravel", "Node.js"],
  },
  {
    number: "B",
    title: "Experience",
    items: ["React / Next.js", "Angular", "JavaScript", "Tailwind CSS"],
  },
  {
    number: "C",
    title: "Systems",
    items: ["SQL Server / MySQL", "MongoDB", "Docker", "RabbitMQ / Kafka"],
  },
  {
    number: "D",
    title: "Security",
    items: ["Keycloak", "OAuth2 / OIDC", "JWT", "OWASP / Burp Suite"],
  },
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "flight") {
    return (
      <div className="flight-ui" aria-hidden="true">
        <div className="flight-ui-top">
          <span>SKYBOOK / SEARCH</span>
          <i />
        </div>
        <div className="flight-route">
          <div><strong>RBA</strong><span>Rabat</span></div>
          <div className="flight-line"><b>✦</b></div>
          <div><strong>PAR</strong><span>Paris</span></div>
        </div>
        <div className="flight-card">
          <span>06:40</span><i /><span>09:35</span><b>1 240 MAD</b>
        </div>
        <div className="flight-card is-muted">
          <span>11:20</span><i /><span>14:15</span><b>1 460 MAD</b>
        </div>
      </div>
    );
  }

  if (type === "system") {
    return (
      <div className="system-ui" aria-hidden="true">
        <span className="system-label">ASYNC FLOW</span>
        <div className="system-node node-api"><i />API<span>.NET</span></div>
        <div className="system-node node-queue"><i />QUEUE<span>RabbitMQ</span></div>
        <div className="system-node node-client"><i />CLIENT<span>Angular</span></div>
        <div className="system-path path-one" />
        <div className="system-path path-two" />
        <div className="system-signal signal-one" />
        <div className="system-signal signal-two" />
      </div>
    );
  }

  return (
    <div className="document-ui" aria-hidden="true">
      <div className="document-sidebar">
        <i /><i /><i /><i />
      </div>
      <div className="document-page">
        <div className="document-head"><span>YG</span><i /></div>
        <b />
        <i className="line-long" />
        <i className="line-short" />
        <div className="document-columns"><span /><span /></div>
        <i className="line-long" />
        <i className="line-medium" />
        <div className="document-badge">PDF</div>
      </div>
      <div className="document-status"><i /> GENERATION READY</div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [introVisible, setIntroVisible] = useState(true);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorHaloRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroVisible(false), 1350);

    const updatePageState = () => {
      const scrollTop = window.scrollY;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 30);
      setProgress(available > 0 ? Math.min(100, (scrollTop / available) * 100) : 0);
      heroRef.current?.style.setProperty("--portrait-scroll", `${Math.min(scrollTop, 900) * -0.035}px`);

      const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
      let current = "top";
      for (const section of sections) {
        if (section.offsetTop <= scrollTop + 220) current = section.id;
      }
      setActiveSection(current);
    };

    const updatePointer = (event: PointerEvent) => {
      cursorDotRef.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      cursorHaloRef.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      cursorDotRef.current?.classList.add("is-visible");
      cursorHaloRef.current?.classList.add("is-visible");

      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      heroRef.current?.style.setProperty("--name-x-a", `${x * -15}px`);
      heroRef.current?.style.setProperty("--name-y-a", `${y * -8}px`);
      heroRef.current?.style.setProperty("--name-x-b", `${x * 10}px`);
      heroRef.current?.style.setProperty("--name-y-b", `${y * 5}px`);
      heroRef.current?.style.setProperty("--portrait-x", `${x * 18}px`);
      heroRef.current?.style.setProperty("--portrait-y", `${y * 12}px`);
    };

    const hidePointer = () => {
      cursorDotRef.current?.classList.remove("is-visible");
      cursorHaloRef.current?.classList.remove("is-visible");
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -40px" },
    );

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealItems.forEach((item) => revealObserver.observe(item));

    const spotlightItems = Array.from(document.querySelectorAll<HTMLElement>(".project-case"));
    const spotlightHandlers = spotlightItems.map((item) => {
      const handler = (event: PointerEvent) => {
        const bounds = item.getBoundingClientRect();
        item.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        item.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      };
      item.addEventListener("pointermove", handler);
      return { item, handler };
    });

    updatePageState();
    window.addEventListener("scroll", updatePageState, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.documentElement.addEventListener("mouseleave", hidePointer);
    return () => {
      window.clearTimeout(introTimer);
      revealObserver.disconnect();
      window.removeEventListener("scroll", updatePageState);
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("mouseleave", hidePointer);
      spotlightHandlers.forEach(({ item, handler }) => item.removeEventListener("pointermove", handler));
    };
  }, []);

  return (
    <main>
      <div className={`intro-loader ${introVisible ? "is-active" : "is-done"}`} aria-hidden="true">
        <div className="intro-mark"><span>Y</span><span>G</span></div>
        <div className="intro-copy"><b>YOUNESS GUADIR</b><span>PORTFOLIO / 2026</span></div>
        <div className="intro-track"><i /></div>
        <small>INITIALIZING EXPERIENCE</small>
      </div>
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="cursor-halo" ref={cursorHaloRef} aria-hidden="true" />
      <div className="page-noise" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="scroll-progress" style={{ width: `${progress}%` }} />
        <a className="brand" href="#top" aria-label="Accueil - Youness Guadir">
          <span className="brand-mark"><b>Y</b><b>G</b></span>
          <span className="brand-copy"><b>Youness Guadir</b><small>Full Stack Engineer</small></span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>

        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Navigation principale">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={activeSection === item.href.slice(1) ? "is-active" : ""}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <small>{item.number}</small>{item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="mailto:guadir2022@gmail.com">Let&apos;s talk <span>↗</span></a>
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true"><i /><span /></div>
        <div className="hero-orbit orbit-two" aria-hidden="true"><i /><span /></div>
        <div className="hero-scan" aria-hidden="true" />
        <div className="hero-topline reveal">
          <span>Portfolio / 2026</span>
          <span>Salé, Morocco · 34.03° N</span>
          <span className="live-status"><i /> Available for PFE</span>
        </div>

        <h1 className="hero-name reveal" aria-label="Youness Guadir">
          <span>YOUNESS</span>
          <span>GUADIR</span>
        </h1>

        <div className="portrait-panel">
          <img
            src={asset("youness-guadir.png")}
            alt="Youness Guadir lors de sa remise de diplôme"
            width="1023"
            height="1537"
          />
          <div className="portrait-code"><span>YG / 01</span><span>ENGINEER</span></div>
        </div>

        <div className="hero-intro reveal">
          <p className="hero-kicker">Full Stack .NET / Java</p>
          <p>
            Je conçois des produits web <strong>robustes</strong>, des architectures
            <strong> maintenables</strong> et des expériences <strong>sécurisées</strong>.
          </p>
          <div className="hero-actions">
            <a className="button button-acid" href="#projects">Explorer mes projets <span>↘</span></a>
            <a className="button button-ghost" href={asset("Youness-Guadir-CV2.pdf")} download>CV / PDF <span>↓</span></a>
          </div>
        </div>

        <div className="hero-side-note reveal">
          <span>Focus</span>
          <p>Architecture<br />Microservices<br />Application Security</p>
        </div>

        <a className="scroll-cue" href="#about"><span>Scroll to discover</span><i /></a>
      </section>

      <div className="tech-ticker" aria-label="Technologies principales">
        <div>
          <span>ASP.NET CORE</span><i>✦</i><span>SPRING BOOT</span><i>✦</i>
          <span>REACT</span><i>✦</i><span>KEYCLOAK</span><i>✦</i>
          <span>DOCKER</span><i>✦</i><span>RABBITMQ</span><i>✦</i>
          <span>ASP.NET CORE</span><i>✦</i><span>SPRING BOOT</span><i>✦</i>
          <span>REACT</span><i>✦</i><span>KEYCLOAK</span><i>✦</i>
        </div>
      </div>

      <section className="showreel" aria-label="Présentation de projet en vidéo">
        <div className="section-shell showreel-head" data-reveal="up">
          <div className="section-marker is-dark"><span>LIVE</span><p>IN ACTION / PRESENTATION</p></div>
          <h2>Code.<br /><em>Clarté.</em><br />Impact.</h2>
          <p>Construire une solution, puis savoir la défendre.</p>
        </div>

        <div className="showreel-stage" data-reveal="up">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={asset("presentation-poster.jpg")}
            aria-label="Youness Guadir présente un projet informatique"
          >
            <source src={asset("presentation-showreel.mp4")} type="video/mp4" />
          </video>
          <div className="showreel-shade" aria-hidden="true" />
          <div className="showreel-ui" aria-hidden="true">
            <div><span>PROJECT DEFENSE</span><i>REC</i></div>
            <strong>YG / LIVE_01</strong>
            <small>11.8 SEC · NO AUDIO · LOOP</small>
          </div>
          <div className="showreel-word" aria-hidden="true">EXPLAIN</div>
          <span className="showreel-corner corner-a" aria-hidden="true" />
          <span className="showreel-corner corner-b" aria-hidden="true" />
        </div>

        <div className="section-shell capture-rail">
          <figure className="capture-card capture-one" data-reveal="left">
            <img src={asset("presentation-frame-01.jpg")} alt="Présentation d’un graphique de projet" width="960" height="540" />
            <figcaption><span>01</span><b>ANALYSE</b></figcaption>
          </figure>
          <div className="capture-manifesto" data-reveal="up">
            <span>THINK</span><i>→</i><span>BUILD</span><i>→</i><span>EXPLAIN</span>
          </div>
          <figure className="capture-card capture-two" data-reveal="up">
            <img src={asset("presentation-frame-02.jpg")} alt="Présentation des technologies utilisées" width="960" height="540" />
            <figcaption><span>02</span><b>RÉALISATION</b></figcaption>
          </figure>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="section-marker" data-reveal="left"><span>01</span><p>PROFIL / APPROCHE</p></div>
        <div className="about-statement" data-reveal="up">
          <p className="statement-intro">Penser. Construire. Présenter.</p>
          <h2>Du besoin<br />au produit.</h2>
        </div>
        <div className="about-layout" data-reveal="up">
          <div className="about-note">
            <span>À propos</span>
            <p>
              Full Stack, architecture et sécurité réunis dans une même approche.
            </p>
          </div>
          <div className="principles">
            <article><b>01</b><h3>Build</h3><p>Produit utile.</p></article>
            <article><b>02</b><h3>Secure</h3><p>Conçu sûr.</p></article>
            <article><b>03</b><h3>Scale</h3><p>Prêt à évoluer.</p></article>
          </div>
        </div>
      </section>

      <div className="motion-band" aria-hidden="true">
        <div className="motion-line motion-forward"><span>BUILD</span><i>✦</i><span>SECURE</span><i>✦</i><span>SCALE</span><i>✦</i><span>BUILD</span><i>✦</i><span>SECURE</span><i>✦</i><span>SCALE</span><i>✦</i></div>
        <div className="motion-line motion-reverse"><span>ARCHITECTURE</span><i>↗</i><span>FULL STACK</span><i>↗</i><span>MICROSERVICES</span><i>↗</i><span>ARCHITECTURE</span><i>↗</i><span>FULL STACK</span><i>↗</i></div>
      </div>

      <section className="experience" id="experience">
        <div className="section-shell">
          <div className="experience-head" data-reveal="up">
            <div className="section-marker is-dark"><span>02</span><p>PARCOURS / TERRAIN</p></div>
            <h2>Quatre environnements.<br /><em>Une même exigence.</em></h2>
          </div>
          <div className="timeline">
            {experiences.map((item, index) => (
              <article className="timeline-row" key={item.company} data-reveal="up" style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}>
                <div className="timeline-index">0{index + 1}</div>
                <div className="timeline-period">{item.period}</div>
                <div className="timeline-role"><h3>{item.role}</h3><p>{item.company}</p></div>
                <div className="timeline-detail">
                  <p>{item.description}</p>
                  <div className="tag-list">{item.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="section-shell">
          <div className="projects-head" data-reveal="up">
            <div className="section-marker is-dark"><span>03</span><p>SELECTED / WORK</p></div>
            <div><p>Trois produits. Trois défis.</p><a href="https://github.com/GuadirYouness" target="_blank" rel="noreferrer">GitHub profile ↗</a></div>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-case" key={project.name} data-reveal="up" style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}>
                <div className="project-info">
                  <div className="project-meta"><span>CASE / {project.id}</span><span>{project.label}</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="project-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
                </div>
                <div className={`project-stage stage-${project.visual}`}>
                  <ProjectVisual type={project.visual} />
                  <span className="stage-corner">{project.id}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="section-shell">
          <div className="skills-intro" data-reveal="left">
            <div className="section-marker"><span>04</span><p>EXPERTISE / TOOLKIT</p></div>
            <h2>Une stack complète,<br />choisie avec intention.</h2>
            <p>Du front à l’infrastructure.</p>
          </div>
          <div className="skill-matrix">
            {skillGroups.map((group, index) => (
              <article key={group.title} data-reveal="up" style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}>
                <span>{group.number}</span><h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}<i>↗</i></li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="education section-shell" id="education">
        <div className="section-marker" data-reveal="left"><span>05</span><p>FORMATION / BASE</p></div>
        <div className="education-head" data-reveal="up"><h2>Apprendre.<br />Pratiquer.<br /><em>Progresser.</em></h2></div>
        <div className="education-list">
          <article data-reveal="up"><span>2024 — PRESENT</span><div><h3>Cycle Ingénieur — Génie Informatique</h3><p>SUPMTI, Rabat</p></div><b>01</b></article>
          <article data-reveal="up"><span>2023 — 2024</span><div><h3>Licence en Ingénierie des Systèmes Informatiques</h3><p>SUPMTI, Rabat</p></div><b>02</b></article>
          <article data-reveal="up"><span>2022</span><div><h3>Technicien Spécialisé — Développement Digital Full Stack</h3><p>Institut NTIC Rabat</p></div><b>03</b></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <div className="section-shell contact-inner" data-reveal="up">
          <div className="contact-top"><span>06 / CONTACT</span><span>AVAILABLE FOR PFE · 2026</span></div>
          <p>Une idée, un stage ou une opportunité ?</p>
          <h2>Parlons-en.</h2>
          <a className="contact-link" href="mailto:guadir2022@gmail.com"><span>guadir2022@gmail.com</span><b>↗</b></a>
          <div className="contact-bottom">
            <div><small>LOCALISATION</small><span>Salé, Maroc</span></div>
            <div><small>TÉLÉPHONE</small><a href="tel:+212615855264">+212 615 855 264</a></div>
            <div><small>SOCIAL</small><p><a href="https://www.linkedin.com/in/guadir-youness" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/GuadirYouness" target="_blank" rel="noreferrer">GitHub ↗</a></p></div>
          </div>
        </div>
      </section>

      <footer><div className="section-shell"><span>© 2026 YOUNESS GUADIR</span><span>FULL STACK ENGINEER</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </main>
  );
}
