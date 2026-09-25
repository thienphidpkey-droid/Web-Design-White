import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../../data';

interface ArchiveMobileViewProps {
  displayedProject: Project;
  mobileVisible: Project[];
  activeProject: Project;
  mobileShowAll: boolean;
  totalFilteredCount: number;
  mobileInitialCount: number;
  previewTransitionStyle: React.CSSProperties;
  sectionRef: React.RefObject<HTMLElement>;
  onSelectProject: (project: Project) => void;
  onProjectClick: (project: Project) => void;
  onShowAll: () => void;
}

export const ArchiveMobileView: React.FC<ArchiveMobileViewProps> = ({
  displayedProject,
  mobileVisible,
  activeProject,
  mobileShowAll,
  totalFilteredCount,
  mobileInitialCount,
  previewTransitionStyle,
  sectionRef,
  onSelectProject,
  onProjectClick,
  onShowAll,
}) => {
  return (
    <div className="mobile-archive" style={{ display: 'none' }}>
      {/* Selected project – featured card */}
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        ...previewTransitionStyle,
      }}>
        {/* Image */}
        <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
          <img
            src={displayedProject.image}
            alt={displayedProject.name}
            width={600}
            height={375}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              color: displayedProject.color,
              padding: '4px 9px',
              border: `1px solid ${displayedProject.color}55`,
              backgroundColor: 'rgba(7,7,10,0.82)',
            }}>
              {displayedProject.category}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              padding: '4px 9px',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(7,7,10,0.82)',
            }}>
              {displayedProject.year}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '22px 20px 26px', backgroundColor: 'var(--surface)' }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '1.55rem',
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            lineHeight: 1.05,
            marginBottom: '10px',
          }}>
            {displayedProject.name}
          </div>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            marginBottom: '18px',
          }}>
            {displayedProject.description}
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onProjectClick(displayedProject)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                color: 'var(--text)',
                padding: '13px 18px',
                background: 'none',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px',
              }}
            >
              VIEW DETAILS <ArrowUpRight size={13} />
            </button>
            <a
              href={displayedProject.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                color: 'var(--purple)',
                padding: '13px 18px',
                background: 'var(--purple-dim)',
                border: '1px solid rgba(139,92,246,0.3)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px',
              }}
            >
              LIVE WEBSITE <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile project list rows */}
      <div>
        {mobileVisible.map((project, idx) => {
          const isActive = activeProject.id === project.id;
          return (
            <div
              key={project.id}
              onClick={() => {
                onSelectProject(project);
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 68px',
                alignItems: 'center',
                minHeight: '76px',
                padding: '14px 20px',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                backgroundColor: isActive ? 'rgba(139,92,246,0.06)' : 'transparent',
                position: 'relative',
                gap: '12px',
              }}
            >
              <div style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: isActive ? '3px' : '0px',
                backgroundColor: 'var(--purple)',
                transition: 'width 0.2s ease',
              }} />

              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.57rem',
                  color: isActive ? 'var(--purple)' : 'var(--muted)',
                  marginBottom: '4px',
                  transition: 'color 0.2s ease',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--text)' : '#BCBCCC',
                  marginBottom: '4px',
                  transition: 'color 0.2s ease',
                  lineHeight: 1.2,
                }}>
                  {project.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.07em',
                  color: isActive ? project.color : 'var(--muted)',
                  transition: 'color 0.2s ease',
                }}>
                  {project.category} · {project.year}
                </div>
              </div>

              {/* Thumbnail */}
              <div style={{
                width: '68px',
                height: '50px',
                overflow: 'hidden',
                border: isActive ? `1px solid ${project.color}55` : '1px solid var(--border)',
                flexShrink: 0,
                transition: 'border-color 0.2s ease',
              }}>
                <img
                  src={project.image}
                  alt={project.name}
                  width={68}
                  height={50}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Show all button */}
      {!mobileShowAll && totalFilteredCount > mobileInitialCount && (
        <div style={{ padding: '20px' }}>
          <button
            onClick={onShowAll}
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              color: 'var(--text)',
              padding: '16px',
              background: 'none',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            VIEW ALL {totalFilteredCount} PROJECTS
          </button>
        </div>
      )}
    </div>
  );
};
