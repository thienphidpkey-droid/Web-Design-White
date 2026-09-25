import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ArchiveHeaderProps {
  titleRef: React.RefObject<HTMLDivElement>;
  totalProjects: number;
  categories: readonly string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  mobileCatOpen: boolean;
  setMobileCatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ArchiveHeader: React.FC<ArchiveHeaderProps> = ({
  titleRef,
  totalProjects,
  categories,
  activeCategory,
  onSelectCategory,
  mobileCatOpen,
  setMobileCatOpen,
}) => {
  return (
    <div
      ref={titleRef}
      className="archive-header"
      style={{ opacity: 0 }}
    >
      {/* Top row: label + count */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '18px',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          color: 'var(--purple)',
        }}>
          03 — ARCHIVE
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          color: 'var(--muted)',
        }}>
          {totalProjects} PROJECTS
        </span>
      </div>

      {/* Main headline */}
      <h2 style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 'clamp(3rem, 5.5vw, 4.5rem)',
        letterSpacing: '-0.03em',
        textTransform: 'uppercase',
        lineHeight: 0.9,
        color: 'var(--text)',
        marginBottom: '36px',
      }}>
        PROJECT ARCHIVE
      </h2>

      {/* ── Desktop: horizontal filter tabs ── */}
      <div className="desktop-filters" style={{
        display: 'flex',
        flexWrap: 'wrap',
        borderTop: '1px solid var(--border)',
        borderLeft: '1px solid var(--border)',
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              padding: '11px 22px',
              background: activeCategory === cat ? 'var(--purple-dim)' : 'transparent',
              border: '1px solid var(--border)',
              borderLeft: 'none',
              borderTop: 'none',
              cursor: 'pointer',
              color: activeCategory === cat ? 'var(--purple)' : 'var(--muted)',
              transition: 'all 0.18s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (activeCategory !== cat) e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { if (activeCategory !== cat) e.currentTarget.style.color = 'var(--muted)'; }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Mobile: dropdown filter ── */}
      <div className="mobile-filters" style={{ display: 'none', position: 'relative' }}>
        <button
          onClick={() => setMobileCatOpen(o => !o)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'var(--text)',
          }}
        >
          {activeCategory === 'ALL' ? 'ALL CATEGORIES' : activeCategory}
          <ChevronDown
            size={14}
            style={{
              color: 'var(--muted)',
              transform: mobileCatOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>
        {mobileCatOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderTop: 'none',
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileCatOpen(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  background: activeCategory === cat ? 'var(--purple-dim)' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: activeCategory === cat ? 'var(--purple)' : 'var(--text-secondary)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
