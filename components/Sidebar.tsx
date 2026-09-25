import React, { useState } from 'react';
import { Instagram, Github, ExternalLink } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'intro', label: 'INTRO', num: '01' },
  { id: 'featured', label: 'FEATURED', num: '02' },
  { id: 'archive', label: 'ARCHIVE', num: '03' },
  { id: 'about', label: 'ABOUT', num: '04' },
  { id: 'contact', label: 'CONTACT', num: '05' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 'var(--sidebar-width)',
        height: '100vh',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        backgroundColor: 'var(--bg)',
        padding: '0',
      }} className="hidden-mobile">

        {/* Logo */}
        <div style={{
          padding: '32px 28px 28px',
          borderBottom: '1px solid var(--border)',
        }}>
          <button
            onClick={() => scrollTo('intro')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '0.05em',
              color: 'var(--text)',
              userSelect: 'none',
            }}>
              FEN<span style={{ color: 'var(--purple)' }}>.</span>
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '32px 0' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 28px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Active indicator */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isActive ? '3px' : '0px',
                  height: '20px',
                  backgroundColor: 'var(--purple)',
                  transition: 'width 0.3s ease',
                  borderRadius: '0 2px 2px 0',
                }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: isActive ? 'var(--purple)' : 'var(--muted)',
                  transition: 'color 0.2s ease',
                  minWidth: '18px',
                }}>
                  {item.num}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: isActive ? 'var(--text)' : 'var(--muted)',
                  transition: 'color 0.2s ease',
                }}>
                  {item.label}
                </span>
                {isActive && (
                  <div style={{
                    marginLeft: 'auto',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--purple)',
                    marginRight: '4px',
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '20px 28px',
        }}>
          {/* Social links */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            {[
              { icon: <Instagram size={13} />, href: '#', label: 'Instagram' },
              { icon: <Github size={13} />, href: '#', label: 'GitHub' },
              { icon: <ExternalLink size={13} />, href: '#', label: 'Behance' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            letterSpacing: '0.05em',
          }}>
            <div>© 2026 FEN</div>
            <div>DIGITAL WORK</div>
          </div>
        </div>
      </aside>

      {/* ─── MOBILE TOP NAV ─── */}
      <div className="mobile-nav" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: 'rgba(7, 7, 10, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: '56px',
      }}>
        <button
          onClick={() => scrollTo('intro')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text)',
          }}>
            FEN<span style={{ color: 'var(--purple)' }}>.</span>
          </span>
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            padding: '6px 12px',
            color: 'var(--text)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
          }}
        >
          {mobileOpen ? 'CLOSE' : 'MENU'}
        </button>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div style={{
            position: 'fixed',
            top: '56px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
            padding: '16px 20px',
            zIndex: 200,
          }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  color: activeSection === item.id ? 'var(--purple)' : 'var(--text)',
                }}
              >
                <span style={{ color: 'var(--muted)', marginRight: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>{item.num}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
