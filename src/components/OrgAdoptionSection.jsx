import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSlot from './ImageSlot';
import { ORG_LAYERS } from '../data/content';
import SideSheet from './SideSheet';

export default function OrgAdoptionSection() {
  const [visible, setVisible] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [expandedLayer, setExpandedLayer] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggleLayer = (id) => {
    setExpandedLayer(prev => (prev === id ? null : id));
  };

  return (
    <section id="org-adoption" ref={ref} style={{ background: 'rgba(54,92,111,0.04)' }}>
      <div className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Organizational Adoption</div>
          <h2 className="section-title">Three Layers.<br />One Coordinated System.</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            Adoption was structured across three organizational layers — not rolled out to everyone at once. Each layer had defined accountability, specific responsibilities, and a clear way of using the system. Click a layer to expand, then view the full detail sheet.
          </p>
        </motion.div>

        {/* Layer diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ORG_LAYERS.map((layer, i) => {
            const isExpanded = expandedLayer === layer.id;
            const widthPct = 100 - i * 10;

            return (
              <div key={layer.id}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.15 }}
                  style={{ width: `${widthPct}%`, margin: '0 auto' }}
                >
                  {/* Layer header */}
                  <button
                    onClick={() => toggleLayer(layer.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '22px 28px',
                      background: isExpanded
                        ? `linear-gradient(135deg, ${layer.color}18, ${layer.color}0a)`
                        : `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))`,
                      border: `1px solid ${isExpanded ? layer.color + '50' : 'rgba(120,172,175,0.12)'}`,
                      borderRadius: isExpanded ? '16px 16px 0 0' : 16,
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                      textAlign: 'left',
                    }}
                  >
                    {/* Layer number */}
                    <div style={{
                      width: 32, height: 32,
                      borderRadius: '50%',
                      background: `${layer.color}25`,
                      border: `1px solid ${layer.color}45`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      color: layer.color,
                      flexShrink: 0,
                    }}>{i + 1}</div>

                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${layer.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span className="material-icons-round" style={{ color: layer.color, fontSize: 22 }}>{layer.icon}</span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--c-white)', marginBottom: 3 }}>
                        {layer.level}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: layer.color, fontWeight: 500 }}>{layer.subtitle}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {isExpanded && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={(e) => { e.stopPropagation(); setSelectedLayer(layer); }}
                          style={{
                            padding: '7px 16px',
                            background: layer.color,
                            color: '#17252E',
                            border: 'none',
                            borderRadius: 100,
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            letterSpacing: '0.06em',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span className="material-icons-round" style={{ fontSize: 14 }}>open_in_new</span>
                          FULL DETAIL
                        </motion.button>
                      )}
                      <span className="material-icons-round" style={{
                        color: 'var(--c-text-muted)',
                        fontSize: 20,
                        transition: 'transform 0.3s ease',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}>expand_more</span>
                    </div>
                  </button>

                  {/* Inline expansion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '24px 28px',
                          background: `${layer.color}06`,
                          border: `1px solid ${layer.color}35`,
                          borderTop: 'none',
                          borderRadius: '0 0 16px 16px',
                        }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div>
                              <div style={{ fontSize: '0.67rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>Accountability</div>
                              {layer.accountability.map((a, j) => (
                                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.84rem', color: 'var(--c-text-secondary)', marginBottom: 8, lineHeight: 1.5 }}>
                                  <span className="material-icons-round" style={{ color: layer.color, fontSize: 14, flexShrink: 0, marginTop: 2 }}>check_circle</span>
                                  {a}
                                </div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.67rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>How They Used The Tool</div>
                              <p style={{ fontSize: '0.84rem', color: 'var(--c-text-secondary)', lineHeight: 1.65 }}>
                                {layer.toolNarrative.substring(0, 200)}...
                              </p>
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedLayer(layer); }}
                                style={{
                                  marginTop: 12,
                                  background: 'none',
                                  border: 'none',
                                  color: layer.color,
                                  fontFamily: 'var(--font-display)',
                                  fontWeight: 700,
                                  fontSize: '0.78rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  letterSpacing: '0.06em',
                                  padding: 0,
                                }}
                              >
                                READ FULL NARRATIVE
                                <span className="material-icons-round" style={{ fontSize: 16 }}>arrow_forward</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Funnel connector */}
                {i < ORG_LAYERS.length - 1 && (
                  <div style={{
                    width: `${widthPct - 5}%`,
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: 2, height: 20,
                      background: `linear-gradient(180deg, ${ORG_LAYERS[i].color}60, ${ORG_LAYERS[i+1].color}60)`,
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Image slot */}
        <div style={{ marginTop: 40 }}>
          <ImageSlot
            src=""
            title="Organizational Adoption"
            label="ORG ADOPTION DIAGRAM — ADD URL"
            height={200}
          />
        </div>
      </div>

      {/* Side Sheet */}
      <SideSheet
        open={!!selectedLayer}
        onClose={() => setSelectedLayer(null)}
        title={selectedLayer?.level}
        subtitle={selectedLayer?.subtitle}
        width={560}
      >
        {selectedLayer && (
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px',
              background: `${selectedLayer.color}10`,
              border: `1px solid ${selectedLayer.color}25`,
              borderRadius: 12, marginBottom: 28,
            }}>
              <span className="material-icons-round" style={{ color: selectedLayer.color, fontSize: 28 }}>{selectedLayer.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--c-white)' }}>{selectedLayer.level}</div>
                <div style={{ fontSize: '0.8rem', color: selectedLayer.color }}>{selectedLayer.subtitle}</div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>Strategic Accountability</div>
              {selectedLayer.accountability.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(120,172,175,0.08)',
                  borderRadius: 8, marginBottom: 6,
                  fontSize: '0.88rem', color: 'var(--c-text-secondary)', lineHeight: 1.5,
                }}>
                  <span className="material-icons-round" style={{ color: selectedLayer.color, fontSize: 15, flexShrink: 0, marginTop: 2 }}>check_circle</span>
                  {a}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>Specific Responsibilities</div>
              {selectedLayer.responsibilities.map((r, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  fontSize: '0.88rem', color: 'var(--c-text-secondary)',
                  marginBottom: 10, lineHeight: 1.5,
                }}>
                  <span style={{ color: selectedLayer.color, fontWeight: 700, flexShrink: 0 }}>→</span>
                  {r}
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>How This Layer Used The Tool</div>
              <p style={{
                fontSize: '0.9rem', color: 'var(--c-text-secondary)', lineHeight: 1.75,
                padding: '18px', background: 'rgba(255,255,255,0.03)',
                borderRadius: 12, border: `1px solid ${selectedLayer.color}20`,
              }}>
                {selectedLayer.toolNarrative}
              </p>
            </div>
          </div>
        )}
      </SideSheet>
    </section>
  );
}
