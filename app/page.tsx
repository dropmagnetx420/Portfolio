'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
const skillGroups = [
  { number: '01', title: 'Programming', description: 'A foundation in logic, algorithms and problem solving.', items: ['C++', 'Java', 'Python'] },
  { number: '02', title: 'Web development', description: 'Modern technologies for responsive web experiences.', items: ['HTML', 'CSS', 'JavaScript', 'Next.js', 'WordPress', 'Tailwind CSS'] },
  { number: '03', title: 'Tools & technologies', description: 'The ecosystem behind collaborative development.', items: ['React / Next.js Ecosystem', 'Git', 'Responsive Web Design'] },
  { number: '04', title: 'Human skills', description: 'A thoughtful, adaptable approach to working with others.', items: ['Problem Solving', 'Quick Learner', 'Team Collaboration'] },
];
const education = [
  { year: '2026', degree: 'Bachelor of Technology (B.Tech)', subject: 'Computer Science & Engineering', school: 'Jawaharlal Nehru Technological University (JNTU), India', label: 'Undergraduate degree' },
  { year: '2021', degree: 'Higher Secondary Certificate (HSC)', subject: 'Higher secondary education', school: 'Varendra College, Rajshahi, Bangladesh', label: 'Higher secondary' },
];
const interests = [
  { title: 'Software Development', text: 'Turning logical thinking into practical software solutions.' },
  { title: 'Full-Stack Web Development', text: 'Exploring how thoughtful interfaces connect with reliable systems.' },
  { title: 'Open Source Contribution', text: 'Learning in the open and contributing alongside other developers.' },
];
const languages = [
  { name: 'Bengali', level: 'Native' },
  { name: 'English', level: 'Professional Working Proficiency' },
  { name: 'Hindi', level: 'Fluent' },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}</svg>;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const rect = element.getBoundingClientRect();
    // Content is visible by default, including when JavaScript is unavailable.
    if (rect.top >= window.innerHeight) element.dataset.reveal = 'waiting';
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.dataset.reveal = 'visible';
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    const onPreference = () => { if (preference.matches) element.dataset.reveal = 'visible'; };
    preference.addEventListener('change', onPreference);
    return () => { observer.disconnect(); preference.removeEventListener('change', onPreference); };
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [photoFailed, setPhotoFailed] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const configuredPhoto = process.env.NEXT_PUBLIC_PROFILE_IMAGE || '';
  const photo = configuredPhoto.startsWith('/') && !configuredPhoto.startsWith('//') ? configuredPhoto : '';

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`); });
    }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => { observer.disconnect(); if (copyTimer.current) clearTimeout(copyTimer.current); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [menuOpen]);

  async function copyEmail() {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText('foisaliqbal09@gmail.com');
      setCopyStatus('Email address copied.');
    } catch {
      setCopyStatus('Copy unavailable. Please select the email address or use the email link.');
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyStatus(''), 6000);
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="shell flex items-center justify-between gap-4">
          <a className="brand" href="#home" aria-label="Foisal Iqbal home">FI<span>.</span></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(link => <a key={link.href} href={link.href} aria-current={activeSection === link.href ? 'location' : undefined}>{link.label}</a>)}
          </nav>
          <a href="mailto:foisaliqbal09@gmail.com" className="header-cta">Let’s talk <Arrow diagonal /></a>
          <button ref={menuButton} type="button" className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(value => !value)}>
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{menuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
          {navigation.map(link => <a key={link.href} href={link.href} onClick={() => { setMenuOpen(false); document.querySelector<HTMLElement>(link.href)?.focus({ preventScroll: true }); }}>{link.label}<Arrow /></a>)}
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="home" className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="availability"><span className="status-dot" />Available for full-time opportunities</div>
            <p className="eyebrow hero-intro">HELLO, I’M FOISAL</p>
            <h1 id="hero-title">MD. FOISAL <span>IQBAL</span></h1>
            <p className="hero-title">Computer Science &amp; Engineering Graduate</p>
            <p className="hero-description">An aspiring software developer with a curious mind and a detail-oriented approach. Ready to turn ideas into thoughtful digital experiences.</p>
            <div className="flex flex-wrap gap-3 hero-actions">
              <a className="button button-primary" href="#contact">Let’s connect <Arrow diagonal /></a>
              <a className="button button-secondary" href="#skills">Explore my skills <Arrow /></a>
            </div>
            <div className="hero-location"><span aria-hidden="true">⌖</span> Nachole, Rajshahi, Bangladesh</div>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="portrait-card">
              <div className="portrait-topline"><span>THE DEVELOPER</span><span aria-hidden="true">↗</span></div>
              <div className="portrait-visual">
                {photo && !photoFailed ? <Image src={photo} alt="MD. Foisal Iqbal" fill sizes="(max-width: 767px) 85vw, 420px" priority className="profile-photo" onError={() => setPhotoFailed(true)} /> : <div className="monogram" aria-label="Foisal Iqbal initials"><span>FI<span className="monogram-dot">.</span></span><div className="monogram-caption">CURIOUS MIND. BUILDER’S MINDSET.</div></div>}
              </div>
              <div className="portrait-caption"><div><strong>Foisal Iqbal</strong><span>B.Tech · CSE · 2026</span></div><span className="portrait-symbol" aria-hidden="true">&lt;/&gt;</span></div>
            </div>
            <div className="floating-label label-code"><span aria-hidden="true">&lt;/&gt;</span> Code. Learn. Create.</div>
            <div className="floating-label label-degree"><span className="small-dot" />Engineering graduate · India</div>
          </div>
          <div className="hero-bottom"><span>LOGIC MEETS CREATIVITY</span><a href="#about">Scroll to discover <span aria-hidden="true">↓</span></a></div>
        </section>

        <div className="technology-strip" aria-label="Selected technologies"><div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3"><span className="strip-label">MY TOOLKIT</span>{['C++', 'Java', 'Python', 'React', 'Next.js', 'WordPress'].map(skill => <span key={skill}>{skill}</span>)}</div></div>

        <section id="about" className="section shell" tabIndex={-1} aria-labelledby="about-title">
          <Reveal className="about-grid">
            <div><p className="eyebrow">01 / ABOUT ME</p><h2 id="about-title">A strong foundation.<br /><span className="muted-heading">A curious mindset.</span></h2></div>
            <div className="about-copy"><p className="lead">I’m a Computer Science &amp; Engineering graduate from JNTU, India, looking to start my journey in software and web development.</p><p>Motivated and detail-oriented, I’m eager to apply my programming skills in C++, Java and Python, alongside modern web technologies like Next.js and WordPress, to contribute to innovative projects and grow as a professional developer.</p><div className="about-note"><span className="small-dot" />Seeking an entry-level software or web development role.</div></div>
          </Reveal>
          <div className="interest-grid">{interests.map((interest, index) => <Reveal key={interest.title} delay={index * 70}><article className="interest-card"><span className="card-index">0{index + 1} / INTEREST</span><h3>{interest.title}</h3><p>{interest.text}</p></article></Reveal>)}</div>
        </section>

        <section id="skills" className="section skills-section" tabIndex={-1} aria-labelledby="skills-title">
          <div className="shell"><Reveal className="section-heading"><div><p className="eyebrow">02 / SKILLS &amp; TOOLKIT</p><h2 id="skills-title">The tools behind<br /><span className="muted-heading">the thinking.</span></h2></div><p>A blend of programming fundamentals, web technologies and a collaborative mindset.</p></Reveal>
            <div className="skills-grid">{skillGroups.map((group, index) => <Reveal key={group.title} delay={index * 60}><article className="skill-card"><div className="skill-top"><span className="skill-number">{group.number}</span><Arrow diagonal /></div><h3>{group.title}</h3><p>{group.description}</p><ul className="skill-tags">{group.items.map(item => <li key={item}>{item}</li>)}</ul></article></Reveal>)}</div>
          </div>
        </section>

        <section id="education" className="section shell" tabIndex={-1} aria-labelledby="education-title">
          <Reveal className="section-heading"><div><p className="eyebrow">03 / EDUCATION</p><h2 id="education-title">Built on<br /><span className="muted-heading">solid foundations.</span></h2></div><p>My academic journey, from Bangladesh to an engineering degree in India.</p></Reveal>
          <div className="education-list">{education.map(item => <Reveal key={item.year}><article className="education-row"><div className="education-year">{item.year}<span>COMPLETED</span></div><div className="education-detail"><span className="education-label">{item.label}</span><h3>{item.degree}</h3><p className="education-subject">{item.subject}</p><p>{item.school}</p></div><span className="education-arrow" aria-hidden="true">↗</span></article></Reveal>)}</div>
          <Reveal className="language-panel"><div><p className="eyebrow">BEYOND CODE</p><h3>Connecting through language.</h3></div><dl className="languages">{languages.map(language => <div key={language.name}><dt>{language.name}</dt><dd>{language.level}</dd></div>)}</dl></Reveal>
        </section>

        <section id="contact" className="section contact-section" tabIndex={-1} aria-labelledby="contact-title">
          <div className="shell"><Reveal className="contact-card"><div className="contact-copy"><p className="eyebrow">04 / LET’S CONNECT</p><h2 id="contact-title">Your next idea.<br /><span>Our next conversation.</span></h2><p>I’m immediately available for full-time opportunities. If you’re looking for an enthusiastic graduate to join your team, I’d love to hear from you.</p><a className="button button-primary" href="mailto:foisaliqbal09@gmail.com">Start a conversation <Arrow diagonal /></a></div><div className="contact-details"><div className="contact-detail"><span>EMAIL</span><a href="mailto:foisaliqbal09@gmail.com">foisaliqbal09@gmail.com <Arrow diagonal /></a><button type="button" className="copy-button" onClick={copyEmail}>Copy email address</button><p className="copy-status" role="status" aria-live="polite">{copyStatus}</p></div><div className="contact-detail"><span>PHONE</span><a href="tel:+8801518951073">+880 1518-951073 <Arrow diagonal /></a></div><div className="contact-detail"><span>BASED IN</span><p>Nachole, Rajshahi, Bangladesh</p></div><div className="contact-availability"><span className="status-dot" />Open to full-time opportunities</div></div></Reveal></div>
        </section>
      </main>
      <footer className="shell footer"><a className="brand" href="#home" aria-label="Back to Foisal Iqbal home">FI<span>.</span></a><p>MD. FOISAL IQBAL · Computer Science &amp; Engineering</p><div className="footer-actions"><button type="button" onClick={() => window.print()}>Print / Save résumé</button><a href="#home">Back to top ↑</a></div></footer>
    </>
  );
}
