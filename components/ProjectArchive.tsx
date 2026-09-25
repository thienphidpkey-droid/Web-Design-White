import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, CATEGORIES, Project } from '../data';
import { ArchiveHeader } from './archive/ArchiveHeader';
import { ArchiveDesktopView } from './archive/ArchiveDesktopView';
import { ArchiveMobileView } from './archive/ArchiveMobileView';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_INITIAL_COUNT = 8;

interface ProjectArchiveProps {
  onProjectClick: (project: Project) => void;
}

const ProjectArchive: React.FC<ProjectArchiveProps> = ({ onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);
  const [displayedProject, setDisplayedProject] = useState<Project>(PROJECTS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileShowAll, setMobileShowAll] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredProjects =
    activeCategory === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);

  const selectProject = (project: Project) => {
    if (project.id === activeProject.id) return;
    setActiveProject(project);
    setIsTransitioning(true);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setDisplayedProject(project);
      setIsTransitioning(false);
    }, 220);
  };

  // Reset to first project when category changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const first = filteredProjects[0];
      setActiveProject(first);
      setIsTransitioning(true);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setDisplayedProject(first);
        setIsTransitioning(false);
      }, 220);
    }
    setMobileShowAll(false);
  }, [activeCategory]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  const mobileVisible = mobileShowAll
    ? filteredProjects
    : filteredProjects.slice(0, MOBILE_INITIAL_COUNT);

  // Shared preview transition style
  const previewTransitionStyle: React.CSSProperties = {
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
    transition: 'opacity 0.28s ease, transform 0.28s ease',
  };

  return (
    <section
      id="archive"
      ref={sectionRef}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      {/* ─── ARCHIVE HEADER & FILTERS ─── */}
      <ArchiveHeader
        titleRef={titleRef}
        totalProjects={PROJECTS.length}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        mobileCatOpen={mobileCatOpen}
        setMobileCatOpen={setMobileCatOpen}
      />

      {/* ─── DESKTOP SPLIT VIEW ─── */}
      <ArchiveDesktopView
        filteredProjects={filteredProjects}
        activeProject={activeProject}
        displayedProject={displayedProject}
        previewTransitionStyle={previewTransitionStyle}
        onSelectProject={selectProject}
        onProjectClick={onProjectClick}
      />

      {/* ─── MOBILE SINGLE-COLUMN VIEW ─── */}
      <ArchiveMobileView
        displayedProject={displayedProject}
        mobileVisible={mobileVisible}
        activeProject={activeProject}
        mobileShowAll={mobileShowAll}
        totalFilteredCount={filteredProjects.length}
        mobileInitialCount={MOBILE_INITIAL_COUNT}
        previewTransitionStyle={previewTransitionStyle}
        sectionRef={sectionRef}
        onSelectProject={selectProject}
        onProjectClick={onProjectClick}
        onShowAll={() => setMobileShowAll(true)}
      />

      {/* ─── RESPONSIVE CSS ─── */}
      <style>{`
        /* Section header padding */
        .archive-header {
          padding: 80px 60px 0;
        }

        /* Desktop: show desktop, hide mobile */
        @media (min-width: 768px) {
          .desktop-filters { display: flex !important; }
          .mobile-filters  { display: none !important; }
          .desktop-archive { display: grid !important; }
          .mobile-archive  { display: none !important; }
        }

        /* Tablet: tighten columns */
        @media (min-width: 768px) and (max-width: 1199px) {
          .archive-header { padding: 72px 36px 0; }
          .desktop-archive { grid-template-columns: 48% 52% !important; }
        }

        /* Mobile: flip to mobile layout */
        @media (max-width: 767px) {
          .archive-header {
            padding: 72px 20px 0 !important;
          }
          .desktop-filters { display: none !important; }
          .mobile-filters  { display: block !important; }
          .desktop-archive { display: none !important; }
          .mobile-archive  { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default ProjectArchive;
