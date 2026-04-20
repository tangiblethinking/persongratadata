import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GOAL_PILLARS = [
  { icon: 'hub', label: 'Unified Source of Truth', detail: 'One system. Every department. Same customer understanding.' },
  { icon: 'bolt', label: 'Insight → Decision → Action', detail: 'A clear pipeline from data to execution, built into everyday workflows.' },
  { icon: 'loop', label: 'Continuously Generative', detail: 'Real-time persona generation that evolves with new behavioral data.' },
  { icon: 'groups', label: 'Cross-Functional by Design', detail: 'Built for all of Research, BI, Marketing, Product, UX, Sales, and CX.' },
];

export default function GoalSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="goal"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, rgba(54,92,111,0.08) 0%, transparent 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div style={{
        position: 'absolute', right: '-10%', top: '50%',
        transform: 'translateY(-50%)',
        width: 500, height: 500,
        borderRadius: '50%',
        border: '1px solid rgba(67,143,156,0.08)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '-5%', top: '50%',
        transform: 'translateY(-50%)',
        width: 300, height: 300,
        borderRadius: '50%',
        border: '1px solid rgba(67,143,156,0.12)',
        pointerEvents: 'none',
      }} />

      <div className="content-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 60, alignItems: 'center' }}>

          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="section-label">The Goal</div>
              <h2 className="section-title" style={{ marginBottom: 24 }}>
                One Tool.<br />Every Team.<br />Aligned.
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: 'var(--c-text-secondary)',
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: 32,
              }}>
                A tool that, on demand, provides insight to all departments which aligns strategy for both high-level planning and task-driven actions.
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 22px',
                background: 'rgba(67,143,156,0.1)',
                border: '1px solid rgba(67,143,156,0.25)',
                borderRadius: 12,
              }}>
                <span className="material-icons-round" style={{ color: 'var(--c-teal)', fontSize: 20 }}>format_quote</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--c-sky)', fontStyle: 'italic' }}>
                  "Strategic insight from real data"
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {GOAL_PILLARS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: 24 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(120,172,175,0.1)',
                  borderRadius: 12,
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(67,143,156,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(248,244,244,0.75)';
                  e.currentTarget.style.transform = 'translateX(6px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(120,172,175,0.1)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(67,143,156,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="material-icons-round" style={{ color: 'var(--c-teal)', fontSize: 20 }}>{p.icon}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--c-white)', marginBottom: 3 }}>{p.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--c-text-muted)', lineHeight: 1.4 }}>{p.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* OKRs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: 60,
            padding: '32px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(120,172,175,0.12)',
            borderRadius: 20,
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.16em', color: 'var(--c-teal)', textTransform: 'uppercase', marginBottom: 20 }}>
            Objectives & Key Results
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { kr: 'KR 1', text: '90–95% accuracy threshold for generated personas' },
              { kr: 'KR 2', text: 'Organization-wide adoption across all 6 departments' },
              { kr: 'KR 3', text: 'Real-time persona generation embedded in workflows' },
              { kr: 'KR 4', text: 'Single source of truth for customer understanding' },
              { kr: 'KR 5', text: 'Measurable improvement in decision velocity' },
            ].map((k) => (
              <div key={k.kr} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  flexShrink: 0,
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--c-deep)',
                  background: 'var(--c-teal)',
                  padding: '3px 8px',
                  borderRadius: 6,
                  letterSpacing: '0.05em',
                  marginTop: 1,
                }}>{k.kr}</div>
                <p style={{ fontSize: '0.84rem', color: 'var(--c-text-secondary)', lineHeight: 1.5 }}>{k.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
