import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { OUTCOMES } from '../data/content';

function AnimatedNumber({ target, prefix = '', suffix = '', duration = 2000 }) {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const isNeg = String(target).includes('-');
    const numStr = String(target).replace(/[^0-9.]/g, '');
    const end = parseFloat(numStr);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(ease * end * 10) / 10);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  const displayStr = String(target).replace(/[0-9.]+/, current.toString());
  return <span ref={ref}>{prefix}{displayStr}{suffix}</span>;
}

function BeforeAfterSlider({ outcome }) {
  const [pos, setPos] = useState(50);
  const sliderRef = useRef(null);
  const dragging = useRef(false);

  const getPos = (clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    return Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
  };

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = useCallback((e) => { if (dragging.current) setPos(getPos(e.clientX)); }, []);
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);
  const onTouchMove = useCallback((e) => { setPos(getPos(e.touches[0].clientX)); }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const showBefore = pos > 50;
  const showAfter = pos <= 50;

  return (
    <div
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      style={{
        position: 'relative',
        width: '100%',
        height: 120,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        border: '1px solid rgba(120,172,175,0.15)',
      }}
    >
      {/* Before panel */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(95,51,29,0.25), rgba(165,105,53,0.15))',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        padding: '16px 20px',
        clipPath: `inset(0 ${100 - pos}% 0 0)`,
        transition: 'none',
      }}>
        {showBefore && (
          <span style={{
            fontSize: '0.62rem', fontFamily: 'var(--font-display)', fontWeight: 700,
            letterSpacing: '0.12em', color: '#cf6679',
            background: 'rgba(207,102,121,0.15)', border: '1px solid rgba(207,102,121,0.3)',
            padding: '3px 10px', borderRadius: 100, marginBottom: 8,
          }}>BEFORE</span>
        )}
        <div style={{ fontSize: '0.88rem', color: 'var(--c-text-secondary)', lineHeight: 1.5 }}>
          {outcome.before}
        </div>
      </div>

      {/* After panel */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(67,143,156,0.2), rgba(54,92,111,0.15))',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', justifyContent: 'center',
        padding: '16px 20px',
        clipPath: `inset(0 0 0 ${pos}%)`,
      }}>
        {showAfter && (
          <span style={{
            fontSize: '0.62rem', fontFamily: 'var(--font-display)', fontWeight: 700,
            letterSpacing: '0.12em', color: '#4caf89',
            background: 'rgba(76,175,137,0.15)', border: '1px solid rgba(76,175,137,0.3)',
            padding: '3px 10px', borderRadius: 100, marginBottom: 8,
            alignSelf: 'flex-start',
          }}>AFTER</span>
        )}
        <div style={{ fontSize: '0.88rem', color: 'var(--c-text-secondary)', lineHeight: 1.5, textAlign: 'right' }}>
          {outcome.after}
        </div>
      </div>

      {/* Divider handle */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        left: `${pos}%`,
        transform: 'translateX(-50%)',
        width: 2,
        background: 'rgba(120,172,175,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
      }}>
        <div style={{
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'var(--c-deep)',
          border: '2px solid rgba(120,172,175,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}>
          <span className="material-icons-round" style={{ fontSize: 14, color: 'var(--c-sky)' }}>swap_horiz</span>
        </div>
      </div>
    </div>
  );
}

export default function OutcomesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="outcomes" ref={ref}>
      <div className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Key Outcomes</div>
          <h2 className="section-title">Four Months.<br />Measurable Impact.</h2>
          <p className="section-subtitle" style={{ marginBottom: 16 }}>
            The system reversed multi-year decline and scaled customer understanding across the organization within a single quarter. Drag the sliders to compare before and after states.
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--c-text-muted)', marginBottom: 48, fontFamily: 'var(--font-display)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-icons-round" style={{ fontSize: 16 }}>drag_indicator</span>
            Drag the handle on each card to reveal the before/after state
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))', gap: 24 }}>
          {OUTCOMES.map((outcome, i) => (
            <motion.div
              key={outcome.label}
              initial={{ opacity: 0, y: 28 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                padding: '28px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(120,172,175,0.12)',
                borderRadius: 20,
              }}
            >
              {/* Metric header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${outcome.color}18`,
                  border: `1px solid ${outcome.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="material-icons-round" style={{ color: outcome.color, fontSize: 26 }}>{outcome.icon}</span>
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                    color: outcome.color,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {visible ? (
                      <AnimatedNumber
                        target={outcome.metric.replace(/[^0-9]/g, '')}
                        prefix={outcome.metric.startsWith('+') ? '+' : outcome.metric.startsWith('-') ? '-' : ''}
                        suffix={outcome.metric.replace(/[0-9+-]/g, '')}
                      />
                    ) : outcome.metric}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    color: 'var(--c-text-secondary)',
                    lineHeight: 1.3,
                  }}>{outcome.label}</div>
                </div>
              </div>

              {/* Before/After slider */}
              <BeforeAfterSlider outcome={outcome} />

              {/* Detail */}
              <p style={{
                marginTop: 16,
                fontSize: '0.84rem',
                color: 'var(--c-text-muted)',
                lineHeight: 1.65,
                borderTop: '1px solid rgba(120,172,175,0.08)',
                paddingTop: 14,
              }}>
                {outcome.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Image placeholder */}
        <div style={{
          marginTop: 40,
          width: '100%', height: 220,
          background: 'rgba(255,255,255,0.02)',
          border: '2px dashed rgba(120,172,175,0.15)',
          borderRadius: 16,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 10, color: 'var(--c-text-muted)',
        }}>
          <span className="material-icons-round" style={{ fontSize: 36, color: 'rgba(120,172,175,0.25)' }}>image</span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.1em' }}>OUTCOMES DASHBOARD — ADD URL</span>
        </div>
      </div>
    </section>
  );
}
