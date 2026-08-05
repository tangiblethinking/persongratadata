import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SNAPSHOT_STATS } from '../data/content';

function AnimatedStat({ value, label, icon, delay }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        textAlign: 'center',
        padding: '24px 20px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(120,172,175,0.15)',
        borderRadius: 16,
        cursor: 'default',
        transition: 'border-color 0.3s ease, background 0.3s ease',
        flex: '1 1 140px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(248,244,244,0.75)';
        e.currentTarget.style.background = 'rgba(67,143,156,0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(120,172,175,0.15)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      <span className="material-icons-round" style={{ color: 'var(--c-teal)', fontSize: 22, marginBottom: 10, display: 'block' }}>{icon}</span>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
        fontWeight: 800,
        color: 'var(--c-white)',
        lineHeight: 1,
        marginBottom: 6,
      }}>{value}</div>
      <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', lineHeight: 1.4, letterSpacing: '0.02em' }}>{label}</div>
    </motion.div>
  );
}

export default function HeroSection() {
  const parallaxRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handler = () => setOffsetY(window.scrollY * 0.35);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px clamp(20px, 5vw, 60px) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(67,143,156,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(67,143,156,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        transform: `translateY(${offsetY}px)`,
        zIndex: 0,
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '50%',
        transform: `translate(-50%, ${offsetY * 0.5}px)`,
        width: '70vw', height: '50vh',
        background: 'radial-gradient(ellipse, rgba(67,143,156,0.12) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div className="content-wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}
        >
          <div className="chip chip-teal">
            <span className="material-icons-round" style={{ fontSize: 14 }}>person</span>
            Christopher Kenreigh
          </div>
          <div className="chip chip-amber">
            <span className="material-icons-round" style={{ fontSize: 14 }}>workspace_premium</span>
            Principal of UX Design
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          The Persona
          <br />
          <span style={{
            backgroundImage: 'linear-gradient(135deg, var(--c-sky) 0%, var(--c-teal) 50%, var(--c-amber) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Project</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--c-text-secondary)',
            maxWidth: 600,
            lineHeight: 1.65,
            fontWeight: 300,
            marginBottom: 56,
          }}
        >
          Scaling cross-functional decision-making through a unified insight system — transforming fragmented data into a living, generative persona engine.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {SNAPSHOT_STATS.map((s, i) => (
            <AnimatedStat key={s.label} {...s} delay={0.55 + i * 0.1} />
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: 'var(--c-text-muted)',
            fontSize: '0.78rem',
            letterSpacing: '0.1em',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
          }}
        >
          <motion.span
            className="material-icons-round"
            style={{ fontSize: 18 }}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >arrow_downward</motion.span>
          SCROLL TO EXPLORE
        </motion.div>
      </div>
    </section>
  );
}
