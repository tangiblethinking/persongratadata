import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function QuoteSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="quote"
      ref={ref}
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent 0%, rgba(67,143,156,0.05) 50%, transparent 100%)',
      }}
    >
      {/* Decorative lines */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(67,143,156,0.2) 20%, rgba(67,143,156,0.2) 80%, transparent 100%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div className="content-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(6rem, 14vw, 12rem)',
            color: 'rgba(67,143,156,0.15)',
            lineHeight: 0.7,
            marginBottom: 24,
            userSelect: 'none',
          }}
        >"</motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 2.8vw, 1.8rem)',
            fontWeight: 500,
            lineHeight: 1.55,
            color: 'var(--c-text-primary)',
            maxWidth: 820,
            margin: '0 auto',
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
          }}
        >
          Qualitative data, behavioral science, and understanding the{' '}
          <span style={{ color: 'var(--c-sky)', fontStyle: 'normal', fontWeight: 700 }}>"why"</span>{' '}
          are crucial because quantitative data can be misleading and fail to capture the full picture of human behavior and value.
          <br />
          <span style={{ color: 'var(--c-text-muted)', fontSize: '0.75em' }}>Quantity in data to quality of data. Thats the hard part.</span>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <div style={{ width: 32, height: 1, background: 'var(--c-teal)' }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            color: 'var(--c-teal)',
            textTransform: 'uppercase',
          }}>Rory Sutherland</span>
          <div style={{ width: 32, height: 1, background: 'var(--c-teal)' }} />
        </motion.div>
      </div>
    </section>
  );
}
