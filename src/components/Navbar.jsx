import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar({ onDemo }) {
  const [open, setOpen] = useState(false);
  const items = [['Platform', '#platform'], ['Business banking', '#banking'], ['Resources', '#resources']];
  const close = () => setOpen(false);
  return <header className="site-nav">
    <a className="brand" href="#top" onClick={close} aria-label="Meridian home"><span className="brand-mark">m</span><span>meridian</span></a>
    <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
      {items.map(([label, href]) => <a href={href} key={label} onClick={close}>{label}</a>)}
    </nav>
    <div className="nav-actions"><button className="nav-login" onClick={onDemo}>Log in</button><button className="button button-dark nav-cta" onClick={onDemo}>Open an account <ArrowUpRight size={15} /></button></div>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
  </header>;
}