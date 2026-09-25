import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../../data';

interface ArchiveDesktopViewProps {
  filteredProjects: Project[];
  activeProject: Project;
  displayedProject: Project;
  previewTransitionStyle: React.CSSProperties;
  onSelectProject: (project: Project) => void;
  onProjectClick: (project: Project) => void;
}

export const ArchiveDesktopView: React.FC<ArchiveDesktopViewProps> = ({
  filteredProjects,
  activeProject,
  displayedProject,
  previewTransitionStyle,
  onSelectProject,
  onProjectClick,
}) => {
  return (
    <div className="desktop-archive" style={{
      display: 'grid',
      gridTemplateColumns: '42% 58%',
      borderTop: '1px solid var(--border)',
    }}>
      {/* LEFT — Project list */}
      <div style={{
        borderRight: '1px solid var(--border)',
        overflowY: 'auto',
        maxHeight: '82vh',
      }}>
        {/* Column header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50px 1fr 116px 54px',
          padding: '10px 28px',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--surface)',
          zIndex: 2,
        }}>
          {['#', 'PROJECT', 'TYPE', 'YEAR'].map((h, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.57rem',
              letterSpacing: '0.16em',
              color: 'var(--muted)',
            }}>
              {h}
            </div>
          ))}
        </div>

        {filteredProjects.map((project, idx) => {
          const isActive = activeProject.id === project.id;
          return (
            <div
              key={project.id}
              onClick={() => onProjectClick(project)}
              onMouseEnter={() => onSelectProject(project)}
              style={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr 116px 54px',
                padding: '0 28px',
                height: '62px',
                alignItems: 'center',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                backgroundColor: isActive ? 'rgba(139,92,246,0.06)' : 'transparent',
                transition: 'background-color 0.2s ease',
                position: 'relative',
              }}
            >
              {/* Purple left bar */}
              <div style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: isActive ? '3px' : '0px',
                backgroundColor: 'var(--purple)',
                transition: 'width 0.2s ease',
              }} />

              {/* # */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: isActive ? 'var(--purple)' : 'var(--muted)',
                fontWeight: isActive ? 700 : 400,
                transition: 'color 0.2s ease',
              }}>
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Name */}
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--text)' : '#ADADBF',
                transition: 'color 0.2s ease',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                paddingRight: '10px',
              }}>
                {project.name}
              </div>

              {/* Category */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.07em',
                color: isActive ? project.color : 'var(--muted)',
                transition: 'color 0.2s ease',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {project.category}
              </div>

              {/* Year */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: isActive ? 'var(--text-secondary)' : 'var(--muted)',
                transition: 'color 0.2s ease',
              }}>
                {project.year}
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT — Preview panel */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '82vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'var(--surface)',
      }}>
        <div style={{ ...previewTransitionStyle, flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* ── Large screenshot: 65% of panel ── */}
          <div style={{
            flex: '0 0 65%',
            overflow: 'hidden',
            position: 'relative',
            borderBottom: '1px solid var(--border)',
          }}>
            <img
              src={displayedProject.image}
              alt={displayedProject.name}
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Overlay badges */}
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '20px',
              display: 'flex',
              gap: '8px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.13em',
                color: displayedProject.color,
                padding: '5px 11px',
                border: `1px solid ${displayedProject.color}55`,
                backgroundColor: 'rgba(7,7,10,0.8)',
                backdropFilter: 'blur(6px)',
              }}>
                {displayedProject.category}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                padding: '5px 11px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(7,7,10,0.8)',
                backdropFilter: 'blur(6px)',
              }}>
                {displayedProject.year}
              </span>
            </div>

            {/* Visit link overlay bottom-right */}
            <a
              href={displayedProject.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'rgba(7,7,10,0.7)',
                padding: '5px 9px',
                border: '1px solid var(--border)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {new URL(displayedProject.url).hostname}
              <ExternalLink size={10} />
            </a>
          </div>

          {/* ── Info area: 35% ── */}
          <div style={{
            flex: '0 0 35%',
            padding: '20px 24px 16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Accent line + name row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '10px' }}>
              <div style={{
                width: '3px',
                height: '36px',
                backgroundColor: displayedProject.color,
                flexShrink: 0,
                marginTop: '4px',
                transition: 'background-color 0.3s ease',
              }} />
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                lineHeight: 1.05,
              }}>
                {displayedProject.name}
              </div>
            </div>

            {/* Description — 2 lines max */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              marginBottom: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              paddingLeft: '17px',
            }}>
              {displayedProject.description}
            </p>

            {/* Services */}
            <div style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              paddingLeft: '17px',
              marginBottom: '14px',
            }}>
              {displayedProject.services.map(s => (
                <span key={s} style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '1px',
                }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: 'auto',
              paddingLeft: '17px',
            }}>
              <button
                onClick={() => onProjectClick(displayedProject)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text)',
                  padding: '11px 18px',
                  background: 'none',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--purple)';
                  e.currentTarget.style.color = 'var(--purple)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text)';
                }}
              >
                VIEW DETAILS <ArrowUpRight size={12} />
              </button>
              <a
                href={displayedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: 'var(--purple)',
                  padding: '11px 18px',
                  background: 'var(--purple-dim)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple-dim)')}
              >
                LIVE WEBSITE <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
