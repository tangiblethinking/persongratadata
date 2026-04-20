import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSlot from './ImageSlot';
import { VALIDATION_NODES } from '../data/content';

function AccuracyRing({ visible }) {
  const target = 92.5;
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => setProgress(target), 400);
    return () => clearTimeout(timeout);
  }, [visible]);

  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Track */}
          <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(120,172,175,0.12)" strokeWidth="8" />
          {/* Progress */}
          <motion.circle
            cx="70" cy="70" r={r}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)' }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#438F9C" />
              <stop offset="100%" stopColor="#78ACAF" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.6rem',
            color: 'var(--c-white)',
            lineHeight: 1,
          }}>
            {Math.round(progress)}%
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--c-text-muted)', letterSpacing: '0.08em', marginTop: 4 }}>ACCURACY</div>
        </div>
      </div>
      <div style={{
        textAlign: 'center',
        fontSize: '0.78rem',
        color: 'var(--c-text-secondary)',
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
      }}>
        90–95% Threshold<br />
        <span style={{ color: 'var(--c-text-muted)', fontWeight: 400 }}>Minimum viable standard</span>
      </div>
    </div>
  );
}

export default function ValidationSection() {
  const [visible, setVisible] = useState(false);
  const [openNode, setOpenNode] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggleNode = (id) => {
    setOpenNode(prev => (prev === id ? null : id));
  };

  return (
    <section id="validation" ref={ref}>
      <div className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Validation</div>
          <h2 className="section-title">Trust Was Engineered,<br />Not Assumed.</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            Generative outputs require a structured validation layer. A 90–95% accuracy threshold was set as the minimum viable standard — anything below would cancel the initiative. Click each stage to explore the methodology.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Flow nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {VALIDATION_NODES.map((node, i) => (
              <div key={node.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15 }}
                >
                  {/* Node header */}
                  <button
                    onClick={() => toggleNode(node.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '20px 24px',
                      background: openNode === node.id ? 'var(--c-glass)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${openNode === node.id ? node.color + '45' : 'rgba(120,172,175,0.12)'}`,
                      borderRadius: openNode === node.id ? '14px 14px 0 0' : 14,
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: 'var(--c-glass)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid var(--c-glass-border)',
                    }}>
                      <span className="material-icons-round" style={{ color: node.color, fontSize: 24 }}>{node.icon}</span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4,
                      }}>
                        <div style={{
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: node.color,
                          padding: '2px 8px',
                          background: 'var(--c-glass)',
                          borderRadius: 4,
                        }}>Stage {i + 1}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--c-white)' }}>{node.label}</div>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--c-text-secondary)' }}>{node.summary}</div>
                    </div>

                    <span className="material-icons-round" style={{
                      color: 'var(--c-text-muted)',
                      fontSize: 20,
                      transition: 'transform 0.3s ease',
                      transform: openNode === node.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                    }}>expand_more</span>
                  </button>

                  {/* Inline expansion */}
                  <AnimatePresence>
                    {openNode === node.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '24px 24px 24px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--c-glass-border)',
                          borderTop: 'none',
                          borderRadius: '0 0 14px 14px',
                        }}>
                          <p style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                            {node.detail}
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {node.bullets.map((b, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.06 }}
                                style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.84rem', color: 'var(--c-text-primary)' }}
                              >
                                <span className="material-icons-round" style={{ color: node.color, fontSize: 15, flexShrink: 0, marginTop: 2 }}>fiber_manual_record</span>
                                {b}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Connector */}
                {i < VALIDATION_NODES.length - 1 && (
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    padding: '6px 0 6px 36px',
                  }}>
                    <div style={{
                      width: 2, height: 24,
                      background: `linear-gradient(180deg, ${VALIDATION_NODES[i].color}, ${VALIDATION_NODES[i+1].color})`,
                    }} />
                    <div style={{
                      marginLeft: 14, fontSize: '0.68rem',
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      color: 'var(--c-text-muted)', letterSpacing: '0.1em',
                    }}>→</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Accuracy ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 24,
              padding: '28px 24px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(120,172,175,0.12)',
              borderRadius: 20,
              position: 'sticky',
              top: 90,
              minWidth: 180,
            }}
          >
            <AccuracyRing visible={visible} />

            <div style={{ width: '100%', borderTop: '1px solid rgba(120,172,175,0.1)', paddingTop: 16 }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Key Principle</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--c-text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Trust was engineered through validation, transparency, and rapid correction."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Image slot */}
        <div style={{ marginTop: 40 }}>
          <ImageSlot
            src=""
            title="Validation"
            label="VALIDATION FRAMEWORK — ADD URL"
            height={200}
          />
        </div>
      </div>
    </section>
  );
}
