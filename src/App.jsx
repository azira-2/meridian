import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, CircleDollarSign, CreditCard, FileText, Globe2, LockKeyhole, ShieldCheck, Sparkles, Users, Wallet } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import SceneBoundary from './components/SceneBoundary.jsx';
import './styles/dashboard.css';

gsap.registerPlugin(ScrollTrigger);
const LaptopScene = lazy(() => import('./components/LaptopScene.jsx'));

function Hero({ heroRef, progressRef, progress, onEnter, dark, setDark }) {
  return <section id="top" className="hero-scroll" ref={heroRef}>
    <div className="hero-stage">
      <div className="hero-wash" />
      <div className="hero-grid" />
      <div className="hero-copy" style={{ opacity: Math.max(0, 1 - progress * 2.2), transform: `translateY(${-progress * 28}px)` }}>
        <span className="hero-kicker"><i /> BUSINESS, IN A BETTER BALANCE</span>
        <h1>Your business.<br />Your money.<br /><span>One powerful platform.</span></h1>
        <p>Manage your money, payments, cards, and business finances in one beautifully designed experience.</p>
        <div className="hero-actions"><a className="button button-dark" href="#platform">Explore platform <ArrowUpRight size={16} /></a><button className="button button-outline" onClick={onEnter}>Open interactive demo <span className="play-symbol">↗</span></button></div>
        <div className="hero-proof"><span className="proof-avatars"><i>A</i><i>J</i><i>M</i></span><span>Made for teams moving<br /><b>business forward.</b></span></div>
      </div>
      <div className="hero-device-stage" aria-label="Interactive 3D laptop showing a sample finance dashboard">
        <div className="float-card float-transaction"><span className="float-icon float-mint"><Check size={14} /></span><span><b>Payment received</b><small>Acme Studio · just now</small></span><strong>+$4,800</strong></div>
        <div className="float-card float-balance"><span className="float-icon float-blue"><Wallet size={14} /></span><span><small>Available balance</small><b>$128,450.80</b></span><span className="float-trend">↗ 8.2%</span></div>
        <div className="float-card float-card-chip"><span className="mini-chip" /><span><b>Team card</b><small>•••• 4821</small></span><span className="card-status">ACTIVE</span></div>
        <SceneBoundary fallback={<div className="laptop-fallback"><div className="fallback-screen"><span>m</span><i /><i /><i /></div><div className="fallback-base" /><p>Interactive preview unavailable on this device.</p></div>}><Suspense fallback={<div className="laptop-loading" aria-label="Loading interactive laptop" />}><LaptopScene progressRef={progressRef} /></Suspense></SceneBoundary>
        <div className="device-glow" />
      </div>
      <div className="hero-bottom-note" style={{ opacity: Math.max(0, 1 - progress * 3) }}><span>SCROLL TO STEP INSIDE</span><span className="scroll-cue"><i /></span></div>
      <div className="entry-dashboard" style={{ opacity: Math.max(0, Math.min(1, (progress - 0.55) / 0.23)), pointerEvents: progress > 0.78 ? 'auto' : 'none' }} aria-hidden={progress <= 0.78}>
        <Dashboard dark={dark} setDark={setDark} onExit={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} />
      </div>
      <div className="hero-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </div>
  </section>;
}

const pillars = [
  { number: '01', icon: Wallet, title: 'Business banking, without the busywork.', text: 'Checking, savings, and a clear view of every dollar. Spend less time catching up and more time building what’s next.', detail: ['One clear view of cash', 'Built-in account controls', 'A calmer way to reconcile'] },
  { number: '02', icon: CreditCard, title: 'Cards with a little more intention.', text: 'Create virtual cards for every kind of spend. Set a limit, name an owner, and know exactly where your money went.', detail: ['Instant virtual cards', 'Flexible spend limits', 'Receipts in the right place'] },
  { number: '03', icon: Globe2, title: 'Payments that keep good work moving.', text: 'Pay vendors and get paid by customers from the same considered workspace. Clear status, less follow-up.', detail: ['Simple payment tracking', 'Helpful approval flows', 'Fewer tools to connect'] },
];

function ProductSections() {
  return <main className="marketing-content">
    <section id="platform" className="trust-strip"><span>GOOD BUSINESS DESERVES BETTER TOOLS</span><strong>One workspace.<br className="mobile-break" /> More room to grow.</strong><div className="trust-stats"><div><b>300k<span>+</span></b><small>ambitious teams</small></div><div><b>$20B<span>+</span></b><small>monthly volume</small></div><div><b>4.9<span>/5</span></b><small>founder rating</small></div></div></section>
    {pillars.map(({ number, icon: Icon, title, text, detail }, index) => <section className={`feature-section ${index % 2 ? 'feature-reverse' : ''}`} id={index === 0 ? 'banking' : undefined} key={number}><div className="feature-copy"><span className="feature-number">{number} / THE PLATFORM</span><h2>{title}</h2><p>{text}</p><ul>{detail.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul><a href="#top" className="inline-link">See what’s possible <ArrowRight size={16} /></a></div><div className={`feature-art feature-art-${number}`}><div className="art-paper"><div className="art-window-head"><span className="art-window-brand"><i /> meridian</span><span>OVERVIEW</span></div><div className="art-line art-muted">{number === '01' ? 'Available balance' : number === '02' ? 'Card activity' : 'Payments this month'}</div><strong className="art-amount">{number === '01' ? '$128,450.80' : number === '02' ? '$8,320.00' : '$24,800.00'}</strong><div className="art-chart">{[32, 48, 37, 63, 55, 74, 66, 90, 75, 100, 88, 96].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="art-row"><span className="art-avatar">{number}</span><span><b>{number === '01' ? 'Northstar Labs' : number === '02' ? 'Growth marketing' : 'Acme Studio'}</b><small>{number === '01' ? 'Client payment' : number === '02' ? 'Virtual card' : 'Invoice paid'}</small></span><strong>{number === '02' ? '−$320' : '+$4,800'}</strong></div></div><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-side-note"><span className="side-note-icon"><Icon size={17} /></span><b>{number === '01' ? 'Everything in view' : number === '02' ? 'Spend, thoughtfully' : 'On its way'}</b><small>DESIGNED TO KEEP YOU MOVING</small></div></div></section>)}
    <section id="resources" className="split-feature"><div className="split-illustration"><div className="invoice-sheet"><div className="invoice-mark"><FileText size={18} /> INVOICE</div><div className="invoice-rule" /><div className="invoice-lines"><i /><i /><i /><i /></div><div className="invoice-bottom"><span>AMOUNT DUE</span><b>$4,800.00</b></div><div className="paid-stamp"><Check size={14} /> PAID</div></div><div className="invoice-toast"><span><Check size={14} /></span><b>Invoice paid</b><small>Acme Studio · moments ago</small></div></div><div className="feature-copy"><span className="feature-number">04 / BILLING</span><h2>A little less chasing. A lot more getting paid.</h2><p>Send invoices that feel like you. Keep an eye on what’s paid, what’s pending, and what deserves a friendly nudge.</p><a href="#top" className="inline-link">Explore invoicing <ArrowRight size={16} /></a></div></section>
    <section className="security-band"><div className="security-copy"><span className="feature-number">BUILT AROUND YOUR BUSINESS</span><h2>Trust is something you build.<br />We built it in from the start.</h2><p>Thoughtful permissions, approval controls, and a little extra peace of mind for the people behind the numbers.</p><div className="security-points"><span><LockKeyhole size={17} /> Granular permissions</span><span><ShieldCheck size={17} /> Secure by design</span><span><Users size={17} /> Team-first controls</span></div></div><div className="security-art"><div className="shield-plate"><div className="shield-outline"><ShieldCheck size={52} strokeWidth={1.1} /></div></div><div className="permission-card"><span className="permission-avatar">JL</span><span><b>Jamie Lee</b><small>Finance admin</small></span><span className="permission-state"><Check size={13} /></span></div><div className="secure-pill"><LockKeyhole size={14} /> APPROVED BY YOU</div></div></section>
    <section className="quote-section"><span className="quote-mark">“</span><blockquote>“It gives our team the kind of financial clarity we used to spend hours trying to piece together.”</blockquote><div className="quote-author"><span className="quote-avatar">JL</span><span><b>Jordan Lee</b><small>Co-founder, Fieldnotes Studio</small></span></div><div className="quote-index">01 <i /> 03</div></section>
    <section className="closing-cta"><div className="closing-pattern"><i /><i /><i /><i /><i /></div><div className="closing-copy"><span>MAKE ROOM FOR WHAT’S NEXT</span><h2>Business, in balance.</h2><p>A thoughtful home for the money side of your business.</p><a className="button button-dark" href="#top">Explore the platform <ArrowUpRight size={16} /></a></div><div className="closing-metric"><span><CircleDollarSign size={20} /></span><b>Your whole financial picture.</b><small>Finally, in one place.</small></div></section>
    <footer className="site-footer"><div className="footer-top"><a className="brand footer-brand" href="#top"><span className="brand-mark">m</span><span>meridian</span></a><p>More clarity for the people<br />building what comes next.</p><a className="footer-up" href="#top" aria-label="Back to top"><ArrowUpRight size={18} /></a></div><div className="footer-columns"><div><b>Platform</b><a href="#banking">Business banking</a><a href="#platform">Cards & spend</a><a href="#platform">Payments</a><a href="#resources">Invoicing</a></div><div><b>Company</b><a href="#resources">About Meridian</a><a href="#resources">Careers</a><a href="#resources">Journal</a><a href="#resources">Contact</a></div><div><b>Explore</b><a href="#platform">For founders</a><a href="#platform">For finance teams</a><a href="#platform">Security</a><a href="#top">Open the demo</a></div><div className="footer-newsletter"><b>A note, now and then.</b><p>Occasional ideas for building a more considered business.</p><form onSubmit={event => { event.preventDefault(); event.currentTarget.reset(); window.alert('You’re on the demo newsletter list.'); }}><input type="email" required placeholder="Your work email" aria-label="Your work email" /><button type="submit" aria-label="Subscribe"><ArrowRight size={16} /></button></form><small>Fictional demo. No newsletter will be sent.</small></div></div><div className="footer-bottom"><span>© 2026 Meridian Technologies, Inc.</span><span>Fictional fintech demo · No banking services provided</span><span><a href="#resources">Privacy</a><a href="#resources">Terms</a></span></div></footer>
  </main>;
}

export default function App() {
  const heroRef = useRef(null); const progressRef = useRef(0); const [progress, setProgress] = useState(0); const [dark, setDark] = useState(() => { try { return localStorage.getItem('meridian-theme') === 'dark'; } catch { return false; } });
  useEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({ trigger: heroRef.current, start: 'top top', end: 'bottom bottom', onUpdate: self => { progressRef.current = self.progress; setProgress(self.progress); } });
      gsap.fromTo('.hero-kicker, .hero-copy h1, .hero-copy > p, .hero-actions', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .8, stagger: .12, ease: 'power2.out', delay: .15 });
      gsap.utils.toArray('.feature-copy, .feature-art, .split-illustration, .security-copy, .security-art, .quote-section, .closing-copy').forEach(element => {
        gsap.fromTo(element, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 82%', once: true } });
      });
    });
    return () => context.revert();
  }, []);
  useEffect(() => { try { localStorage.setItem('meridian-theme', dark ? 'dark' : 'light'); } catch { /* Storage is optional in private browsing. */ } }, [dark]);
  const enterDemo = () => { const section = heroRef.current; if (!section) return; const target = section.offsetTop + (section.offsetHeight - window.innerHeight) * 0.84; window.scrollTo({ top: target, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
  return <div className="app-shell"><Navbar onDemo={enterDemo} /><Hero heroRef={heroRef} progressRef={progressRef} progress={progress} onEnter={enterDemo} dark={dark} setDark={setDark} /><ProductSections /></div>;
}