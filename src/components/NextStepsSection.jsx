import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NEXT_STEPS } from '../data/content';

export default function NextStepsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="next-steps"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, rgba(54,92,111,0.06) 0%, rgba(23,37,46,0) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial */}
      <div style={{
        position: 'absolute',
        bottom: '-20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(67,143,156,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="content-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Next Steps</div>
          <h2 className="section-title">The Foundation<br />Is Set. What's Next.</h2>
          <p className="section-subtitle" style={{ marginBottom: 56 }}>
            The persona engine is infrastructure. These four initiatives define the next chapter — using the system to drive product strategy, not just inform it.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 20 }}>
          {NEXT_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 32 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                padding: '28px 24px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(120,172,175,0.1)',
                borderRadius: 18,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(248,244,244,0.75)';
                e.currentTarget.style.background = `${step.color}08`;
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.35)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(120,172,175,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Step number */}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '3.5rem',
                color: `${step.color}12`,
                lineHeight: 1,
                userSelect: 'none',
              }}>{String(i + 1).padStart(2, '0')}</div>

              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `${step.color}18`,
                border: `1px solid ${step.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <span className="material-icons-round" style={{ color: step.color, fontSize: 24 }}>{step.icon}</span>
              </div>

              {/* Title */}
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: 'var(--c-white)',
                marginBottom: 8,
                lineHeight: 1.2,
              }}>{step.title}</h4>

              {/* Question */}
              <div style={{
                fontSize: '0.8rem',
                color: step.color,
                fontStyle: 'italic',
                marginBottom: 14,
                lineHeight: 1.4,
              }}>{step.question}</div>

              {/* Detail */}
              <p style={{
                fontSize: '0.84rem',
                color: 'var(--c-text-muted)',
                lineHeight: 1.65,
              }}>{step.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: 56,
            padding: '36px 40px',
            background: 'linear-gradient(135deg, rgba(67,143,156,0.1), rgba(54,92,111,0.08))',
            border: '1px solid rgba(67,143,156,0.2)',
            borderRadius: 20,
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontWeight: 600,
            color: 'var(--c-text-secondary)',
            lineHeight: 1.65,
            maxWidth: 700,
            margin: '0 auto',
          }}>
            By transforming personas into a living system and embedding it across leadership layers, I enabled the organization to operate not as siloed teams —{' '}
            <span style={{ color: 'var(--c-sky)', fontWeight: 700 }}>but as a coordinated, insight-driven engine.</span>
          </div>
          <div style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem', color: 'var(--c-text-muted)' }}>
              Christopher Kenreigh
            </div>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--c-text-muted)' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.82rem', color: 'var(--c-text-muted)' }}>
              Sr. Director of UX Design
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
