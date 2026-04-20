import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { OUTCOMES } from '../data/content';
import ImageSlot from './ImageSlot';

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

  const getPos = useCallback((clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    return Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
  }, []);

  const onMouseMove = useCallback((e) => {
    if (dragging.current) setPos(getPos(e.clientX));
  }, [getPos]);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  const onTouchStart = useCallback((e) => {
    dragging.current = true;
    setPos(getPos(e.touches[0].clientX));
  }, [getPos]);

  const onTouchMove = useCallback((e) => {
    if (dragging.current) setPos(getPos(e.touches[0].clientX));
  }, [getPos]);

  const onTouchEnd = useCallback(() => { dragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // Pills are always visible — no conditional hiding based on pos
  return (
    <div
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: 140,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        border: '1px solid rgba(120,172,175,0.15)',
        touchAction: 'none',
      }}
    >
      {/* ── BEFORE panel (left side, clipped) ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(95,51,29,0.25), rgba(165,105,53,0.15))',
        clipPath: `inset(0 ${100 - pos}% 0 0)`,
      }}>
        {/* Before text — bottom-left */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 14,
          right: 14,
          fontSize: '0.84rem',
          color: 'var(--c-text-secondary)',
          lineHeight: 1.5,
          pointerEvents: 'none',
        }}>
          {outcome.before}
        </div>
      </div>

      {/* ── AFTER panel (right side, clipped) ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(67,143,156,0.2), rgba(54,92,111,0.15))',
        clipPath: `inset(0 0 0 ${pos}%)`,
      }}>
        {/* After text — bottom-right */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 14,
          right: 14,
          fontSize: '0.84rem',
          color: 'var(--c-text-secondary)',
          lineHeight: 1.5,
          textAlign: 'right',
          pointerEvents: 'none',
        }}>
          {outcome.after}
        </div>
      </div>

      {/* ── Pills — outside clipped panels so they never get cut ── */}
      {/* BEFORE pill: top-left, always shown */}
      <span style={{
        position: 'absolute',
        top: 12,
        left: 14,
        zIndex: 5,
        fontSize: '0.62rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '0.12em',
        color: '#cf6679',
        background: 'rgba(207,102,121,0.18)',
        border: '1px solid rgba(207,102,121,0.35)',
        padding: '3px 10px',
        borderRadius: 100,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>BEFORE</span>

      {/* AFTER pill: top-right, always shown */}
      <span style={{
        position: 'absolute',
        top: 12,
        right: 14,
        zIndex: 5,
        fontSize: '0.62rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '0.12em',
        color: '#4caf89',
        background: 'rgba(76,175,137,0.18)',
        border: '1px solid rgba(76,175,137,0.35)',
        padding: '3px 10px',
        borderRadius: 100,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>AFTER</span>

      {/* ── Divider + handle ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${pos}%`,
        transform: 'translateX(-50%)',
        width: 2,
        background: 'rgba(120,172,175,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4,
        pointerEvents: 'none',
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'var(--c-deep)',
          border: '2px solid rgba(120,172,175,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          pointerEvents: 'none',
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

        {/* Image slot */}
        <div style={{ marginTop: 40 }}>
          <ImageSlot
            src=""
            title="Key Outcomes"
            label="OUTCOMES DASHBOARD — ADD URL"
            height={200}
          />
        </div>
      </div>
    </section>
  );
}
