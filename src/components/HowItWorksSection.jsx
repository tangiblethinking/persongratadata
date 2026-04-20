import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSlot from './ImageSlot';
import { INPUT_LAYERS } from '../data/content';
import Tooltip from './Tooltip';

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState('automatic');
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const automaticLayers = INPUT_LAYERS.filter(l => l.type === 'automatic');
  const manualLayers = INPUT_LAYERS.filter(l => l.type === 'manual');
  const currentLayers = activeTab === 'automatic' ? automaticLayers : manualLayers;

  return (
    <section id="how-it-works" ref={ref} style={{ background: 'rgba(54,92,111,0.04)' }}>
      <div className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Input Governs Output.</h2>
          <p className="section-subtitle" style={{ marginBottom: 40 }}>
            Quality in = quality out. The system combines hardcoded instructions with user-defined inputs across two distinct input paradigms. Hover each layer for detail.
          </p>
        </motion.div>

        {/* Tab toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}
        >
          {[
            { id: 'automatic', label: 'Automatic', icon: 'auto_fix_high', sub: 'System-governed inputs' },
            { id: 'manual', label: 'Manual', icon: 'edit_note', sub: 'User-defined overrides' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '14px 24px',
                border: `1px solid ${activeTab === tab.id ? 'rgba(67,143,156,0.5)' : 'rgba(120,172,175,0.15)'}`,
                borderRadius: 12,
                background: activeTab === tab.id ? 'rgba(67,143,156,0.12)' : 'rgba(255,255,255,0.02)',
                color: activeTab === tab.id ? 'var(--c-white)' : 'var(--c-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                textAlign: 'left',
              }}
            >
              <span className="material-icons-round" style={{ fontSize: 22, color: activeTab === tab.id ? 'var(--c-teal)' : 'inherit' }}>{tab.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem' }}>{tab.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', marginTop: 2 }}>{tab.sub}</div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Input pipeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {/* Note for manual */}
            {activeTab === 'manual' && (
              <div style={{
                padding: '14px 20px',
                background: 'rgba(165,105,53,0.1)',
                border: '1px solid rgba(165,105,53,0.25)',
                borderRadius: 12,
                marginBottom: 24,
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}>
                <span className="material-icons-round" style={{ color: 'var(--c-amber)', fontSize: 20 }}>info</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--c-amber)', marginBottom: 4 }}>It's the user's fault</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--c-text-secondary)' }}>Manual mode requires correct option selections and accurate instruction input. The system is not a black box — but incorrect inputs produce incorrect outputs.</div>
                </div>
              </div>
            )}

            {/* Layer flow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {currentLayers.map((layer, i) => (
                <div key={layer.label}>
                  <Tooltip content={layer.detail} maxWidth={300}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '18px 24px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(120,172,175,0.1)',
                        borderRadius: 12,
                        cursor: 'help',
                        transition: 'all 0.25s ease',
                        width: '100%',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(67,143,156,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(67,143,156,0.3)';
                        e.currentTarget.style.transform = 'translateX(6px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.borderColor = 'rgba(120,172,175,0.1)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: activeTab === 'automatic' ? 'rgba(67,143,156,0.15)' : 'rgba(165,105,53,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <span className="material-icons-round" style={{
                          color: activeTab === 'automatic' ? 'var(--c-teal)' : 'var(--c-amber)',
                          fontSize: 18,
                        }}>{layer.icon}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--c-white)' }}>{layer.label}</div>
                      </div>
                      <span className="material-icons-round" style={{ color: 'var(--c-text-muted)', fontSize: 16 }}>info_outline</span>
                    </motion.div>
                  </Tooltip>

                  {/* Connector line */}
                  {i < currentLayers.length - 1 && (
                    <div style={{
                      width: 2,
                      height: 16,
                      background: 'linear-gradient(180deg, rgba(67,143,156,0.3), rgba(67,143,156,0.1))',
                      margin: '0 0 0 34px',
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Arrow to output */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 0 }}>
              <div style={{
                width: 2, height: 24,
                background: 'linear-gradient(180deg, rgba(67,143,156,0.3), var(--c-teal))',
                margin: '0 0 0 34px',
              }} />
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 24px',
                background: 'linear-gradient(135deg, rgba(67,143,156,0.15), rgba(54,92,111,0.2))',
                border: '1px solid rgba(67,143,156,0.35)',
                borderRadius: 12,
              }}>
                <span className="material-icons-round" style={{ color: 'var(--c-sky)', fontSize: 22 }}>output</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--c-white)' }}>Persona Generated</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--c-teal)', marginTop: 2 }}>Behavior-driven, validated, actionable</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Image slot */}
        <div style={{ marginTop: 40 }}>
          <ImageSlot
            src="https://cdn.myportfolio.com/abc1e0ab-7370-4502-8c78-92428397bf66/688391a7-78a1-4dfa-af93-0b317d68a39a.png?h=23b53c37674b76e8bc8b1019d270e4dc"
            title="How It Works"
            label="INPUT FLOW DIAGRAM — ADD URL"
            height={200}
          />
        </div>
      </div>
    </section>
  );
}
