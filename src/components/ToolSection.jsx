import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOOL_MODES } from '../data/content';
import ImageSlot from './ImageSlot';

export default function ToolSection() {
  const [activeMode, setActiveMode] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const mode = TOOL_MODES[activeMode];

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="tool" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">The Tool</div>
          <h2 className="section-title">Two Modes.<br />One Decision Engine.</h2>
          <p className="section-subtitle" style={{ marginBottom: 40 }}>
            The system was designed around a simple principle: one input → guided output → aligned action. Choose your mode based on use case and expertise.
          </p>
        </motion.div>

        {/* Mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(120,172,175,0.15)',
            borderRadius: 100,
            padding: 4,
            marginBottom: 40,
          }}
        >
          {TOOL_MODES.map((m, i) => (
            <button
              key={m.mode}
              onClick={() => setActiveMode(i)}
              style={{
                padding: '10px 24px',
                borderRadius: 100,
                border: 'none',
                background: activeMode === i
                  ? 'linear-gradient(135deg, var(--c-teal), var(--c-navy))'
                  : 'transparent',
                color: activeMode === i ? 'var(--c-white)' : 'var(--c-text-muted)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span className="material-icons-round" style={{ fontSize: 18 }}>{m.icon}</span>
              {m.mode}
            </button>
          ))}
        </motion.div>

        {/* Mode content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              {/* Main info */}
              <div
                className="glass-card"
                style={{ padding: '32px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: 'rgba(67,143,156,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="material-icons-round" style={{ color: 'var(--c-teal)', fontSize: 26 }}>{mode.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--c-white)' }}>{mode.mode} Mode</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--c-teal)', fontStyle: 'italic' }}>{mode.tagline}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)', lineHeight: 1.65, marginBottom: 24 }}>
                  {mode.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(120,172,175,0.12)', paddingTop: 20 }}>
                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--c-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Capabilities</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {mode.capabilities.map((c, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.84rem', color: 'var(--c-text-secondary)' }}>
                        <span className="material-icons-round" style={{ color: 'var(--c-teal)', fontSize: 16, flexShrink: 0, marginTop: 1 }}>check_circle</span>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Will / Won't */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div
                  className="glass-card"
                  style={{ padding: '24px', flex: 1 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span className="material-icons-round" style={{ color: '#4caf89', fontSize: 20 }}>check_circle</span>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#4caf89' }}>It Will</div>
                  </div>
                  {mode.willDo.map((w, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      fontSize: '0.84rem', color: 'var(--c-text-secondary)',
                      marginBottom: 10, lineHeight: 1.5,
                    }}>
                      <span style={{ color: '#4caf89', fontWeight: 700, flexShrink: 0 }}>→</span>
                      {w}
                    </div>
                  ))}
                </div>

                <div
                  className="glass-card"
                  style={{ padding: '24px', flex: 1 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span className="material-icons-round" style={{ color: '#cf6679', fontSize: 20 }}>cancel</span>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#cf6679' }}>It Won't</div>
                  </div>
                  {mode.wontDo.map((w, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      fontSize: '0.84rem', color: 'var(--c-text-secondary)',
                      marginBottom: 10, lineHeight: 1.5,
                    }}>
                      <span style={{ color: '#cf6679', fontWeight: 700, flexShrink: 0 }}>✕</span>
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image slot */}
            <ImageSlot
              src="https://cdn.myportfolio.com/abc1e0ab-7370-4502-8c78-92428397bf66/ec7c0862-d91f-4139-a4cc-542e77309d88.png?h=057b865b17139842d4cc0991d617d1be"
              title={`${mode.mode} Mode — The Tool`}
              label={`${mode.mode.toUpperCase()} MODE — TOOL SCREENSHOT PLACEHOLDER`}
              height={200}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
