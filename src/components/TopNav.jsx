import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SECTIONS } from '../data/content';

function DotTooltip({ label, visible, anchorRect }) {
  if (!visible || !anchorRect) return null;
  const x = anchorRect.left + anchorRect.width / 2;
  const y = anchorRect.bottom + 10;
  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      left: x,
      top: y,
      transform: 'translateX(-50%)',
      background: '#1a3340',
      border: '1px solid rgba(120,172,175,0.25)',
      borderRadius: 8,
      padding: '6px 12px',
      fontSize: '0.72rem',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      color: 'var(--c-white)',
      whiteSpace: 'nowrap',
      zIndex: 99999,
      pointerEvents: 'none',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      letterSpacing: '0.05em',
    }}>
      {label}
    </div>,
    document.body
  );
}

export default function TopNav() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredDot, setHoveredDot] = useState(null);
  const [dotRects, setDotRects] = useState({});
  const dotRefs = {};

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const sectionEls = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
      let current = 0;
      sectionEls.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = i;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDotEnter = (i, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDotRects(prev => ({ ...prev, [i]: rect }));
    setHoveredDot(i);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 8000,
      background: 'rgba(23,37,46,0.88)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(120,172,175,0.12)',
    }}>
      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        height: 2,
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, var(--c-teal), var(--c-sky))',
        transition: 'width 0.1s linear',
        borderRadius: '0 2px 2px 0',
        boxShadow: '0 0 10px rgba(67,143,156,0.6)',
      }} />

      <div style={{
        maxWidth: 'var(--content-max)',
        margin: '0 auto',
        padding: '14px clamp(20px, 4vw, 48px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
      }}>
        {/* Logo / wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.95rem',
            color: 'var(--c-sky)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          CK <span style={{ color: 'var(--c-text-muted)', fontWeight: 400 }}>/ Portfolio</span>
        </button>

        {/* Dot nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 1.5vw, 14px)',
          flexWrap: 'nowrap',
        }}>
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              onMouseEnter={(e) => handleDotEnter(i, e)}
              onMouseLeave={() => setHoveredDot(null)}
              style={{
                width: activeSection === i ? 24 : 8,
                height: 8,
                borderRadius: 100,
                background: activeSection === i
                  ? 'linear-gradient(90deg, var(--c-teal), var(--c-sky))'
                  : hoveredDot === i
                  ? 'rgba(120,172,175,0.6)'
                  : 'rgba(120,172,175,0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                padding: 0,
                boxShadow: activeSection === i ? '0 0 10px rgba(67,143,156,0.5)' : 'none',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Section label */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--c-text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          minWidth: 80,
          textAlign: 'right',
        }}>
          {SECTIONS[activeSection]?.label}
        </div>
      </div>

      {/* Portal dot tooltip */}
      <DotTooltip
        label={hoveredDot !== null ? SECTIONS[hoveredDot]?.label : ''}
        visible={hoveredDot !== null}
        anchorRect={hoveredDot !== null ? dotRects[hoveredDot] : null}
      />
    </nav>
  );
}
