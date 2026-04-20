import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageSlot from './ImageSlot';
import { DEPARTMENTS } from '../data/content';
import SideSheet from './SideSheet';

export default function DepartmentUseSection() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="department-use" ref={ref} style={{ background: 'rgba(54,92,111,0.04)' }}>
      <div className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Holistic Department Use</div>
          <h2 className="section-title">Details That Create Plans<br />That Create Actions.</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            The system wasn't built for one team — it was designed for every team. Each department embedded persona outputs into their specific workflows. Click any department to see how.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 16 }}>
          {DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(dept)}
              style={{
                padding: '24px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(120,172,175,0.1)',
                borderRadius: 16,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(248,244,244,0.75)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(120,172,175,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--c-glass)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="material-icons-round" style={{ color: dept.color, fontSize: 22 }}>{dept.icon}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--c-white)', marginBottom: 4 }}>{dept.name}</div>
                  <div style={{ fontSize: '0.7rem', color: dept.color, fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.06em' }}>
                    {dept.uses.length} USE CASES
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {dept.uses.map(u => (
                  <div key={u} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--c-text-secondary)' }}>
                    <span className="material-icons-round" style={{ color: dept.color, fontSize: 14, flexShrink: 0, marginTop: 2 }}>arrow_right</span>
                    {u}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 16, paddingTop: 14,
                borderTop: '1px solid rgba(120,172,175,0.08)',
                fontSize: '0.7rem',
                color: 'var(--c-text-muted)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span className="material-icons-round" style={{ fontSize: 14 }}>open_in_new</span>
                VIEW FULL USE CASE
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image slot */}
        <div style={{ marginTop: 40 }}>
          <ImageSlot
            src="https://cdn.myportfolio.com/abc1e0ab-7370-4502-8c78-92428397bf66/c9a2f4fa-3cc9-4df4-ba94-6c8344600165.png?h=108d938868b6890ab696a8021a5a0676"
            title="Holistic Department Use"
            label="DEPARTMENT DASHBOARD — ADD URL"
            height={200}
          />
        </div>
      </div>

      {/* Side Sheet */}
      <SideSheet
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        subtitle="Department Integration"
      >
        {selected && (
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px', background: 'var(--c-glass)',
              border: '1px solid var(--c-glass-border)', borderRadius: 12, marginBottom: 24,
            }}>
              <span className="material-icons-round" style={{ color: selected.color, fontSize: 26 }}>{selected.icon}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: selected.color }}>
                {selected.uses.length} Documented Use Cases
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>Use Cases</div>
              {selected.uses.map(u => (
                <div key={u} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(120,172,175,0.08)',
                  borderRadius: 8, marginBottom: 6,
                  fontSize: '0.88rem', color: 'var(--c-text-secondary)',
                }}>
                  <span className="material-icons-round" style={{ color: selected.color, fontSize: 16, flexShrink: 0 }}>check_circle</span>
                  {u}
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>How They Used the System</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)', lineHeight: 1.7, padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(120,172,175,0.08)' }}>
                {selected.detail}
              </p>
            </div>
          </div>
        )}
      </SideSheet>
    </section>
  );
}
