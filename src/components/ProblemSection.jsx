import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROBLEM_POINTS } from '../data/content';
import Tooltip from './Tooltip';

function ProblemCard({ item, index }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onClick={() => setExpanded(!expanded)}
      style={{
        background: expanded ? 'rgba(67,143,156,0.08)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${expanded ? 'rgba(67,143,156,0.35)' : 'rgba(120,172,175,0.12)'}`,
        borderRadius: 16,
        padding: '24px 24px',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!expanded) {
          e.currentTarget.style.borderColor = 'rgba(67,143,156,0.3)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        }
      }}
      onMouseLeave={e => {
        if (!expanded) {
          e.currentTarget.style.borderColor = 'rgba(120,172,175,0.12)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }
      }}
    >
      {/* Glow on expand */}
      {expanded && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, var(--c-teal), var(--c-sky))',
          borderRadius: '16px 16px 0 0',
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: expanded ? 'rgba(67,143,156,0.2)' : 'rgba(67,143,156,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }}>
          <span className="material-icons-round" style={{ color: 'var(--c-teal)', fontSize: 22 }}>{item.icon}</span>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              fontWeight: 700,
              color: 'var(--c-white)',
              marginBottom: 8,
            }}>{item.headline}</h4>
            <span className="material-icons-round" style={{
              color: 'var(--c-text-muted)',
              fontSize: 18,
              transition: 'transform 0.3s ease',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              flexShrink: 0,
            }}>expand_more</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)', lineHeight: 1.6, marginBottom: expanded ? 16 : 0 }}>
            {item.support}
          </p>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.35 }}
              style={{
                borderTop: '1px solid rgba(120,172,175,0.15)',
                paddingTop: 14,
                fontSize: '0.85rem',
                color: 'var(--c-sky)',
                lineHeight: 1.65,
              }}
            >
              {item.detail}
            </motion.div>
          )}
        </div>
      </div>

      {!expanded && (
        <div style={{
          position: 'absolute', bottom: 12, right: 16,
          fontSize: '0.65rem',
          color: 'var(--c-text-muted)',
          letterSpacing: '0.08em',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}>TAP FOR DETAIL</div>
      )}
    </motion.div>
  );
}

export default function ProblemSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="problem" ref={ref}>
      <div className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">The Problem</div>
          <h2 className="section-title">Abundant Data.<br />Zero Shared Understanding.</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            Plexus was operating with a fragmented view of the customer despite having access to rich data across every department. The result: siloed execution, misaligned roadmaps, and slowed decision velocity.
          </p>
        </motion.div>

        {/* Image placeholder */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={visible ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.15 }}
  style={{ marginBottom: 40 }}
>
  <img
    src="https://www.brother.co.uk/-/media/images/brother-uk/blog/header-images/the-rise-of-office-robotics-2x.jpg?rev=8af4caff0a074738a5ef618888960b3c&mw=1170&hash=AA45DB6BB3951934B48FBB17C39D4F97"
    alt="Problem overview"
    style={{ width: '100%', borderRadius: 20, objectFit: 'cover', display: 'block' }}
  />
</motion.div>

        {/* Problem cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: 16 }}>
          {PROBLEM_POINTS.map((item, i) => (
            <ProblemCard key={item.headline} item={item} index={i} />
          ))}
        </div>

        {/* Systemic insight callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 32,
            padding: '24px 28px',
            background: 'linear-gradient(135deg, rgba(95,51,29,0.2) 0%, rgba(165,105,53,0.1) 100%)',
            border: '1px solid rgba(165,105,53,0.25)',
            borderRadius: 16,
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start',
          }}
        >
          <span className="material-icons-round" style={{ color: 'var(--c-amber)', fontSize: 24, flexShrink: 0, marginTop: 2 }}>lightbulb</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--c-amber)', letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>The Systemic Gap</div>
            <p style={{ fontSize: '0.95rem', color: 'var(--c-text-secondary)', lineHeight: 1.6 }}>
              Directors and managers were optimizing within their own domains — not as a coordinated system. There was no shared mechanism to translate insight into action, align strategy across departments, or ensure decisions scaled consistently.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
