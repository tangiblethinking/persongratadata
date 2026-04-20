import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONA_TIERS } from '../data/content';
import SideSheet from './SideSheet';
import ImageSlot from './ImageSlot';

function ConstellationOrbit({ tier, index, onSelect, isSelected, containerSize }) {
  const cx = containerSize / 2;
  const cy = containerSize / 2;
  const angleRad = (tier.angle * Math.PI) / 180;
  const r = (tier.orbitRadius / 250) * (containerSize / 2 - 40);
  const nx = cx + r * Math.cos(angleRad);
  const ny = cy + r * Math.sin(angleRad);

  return (
    <g style={{ cursor: 'pointer' }} onClick={() => onSelect(tier)}>
      {/* Orbit ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={`${tier.color}22`}
        strokeWidth={1}
        strokeDasharray="4 8"
      />
      {/* Orbit node */}
      <motion.circle
        cx={nx}
        cy={ny}
        r={isSelected ? 22 : 18}
        fill={tier.color}
        fillOpacity={isSelected ? 0.9 : 0.7}
        stroke={tier.color}
        strokeWidth={isSelected ? 3 : 1.5}
        strokeOpacity={0.6}
        animate={{ r: isSelected ? 22 : 18 }}
        transition={{ duration: 0.3 }}
      />
      {/* Glow */}
      {isSelected && (
        <motion.circle
          cx={nx}
          cy={ny}
          r={30}
          fill="none"
          stroke={tier.color}
          strokeWidth={1}
          strokeOpacity={0.3}
          initial={{ r: 18, opacity: 0 }}
          animate={{ r: 38, opacity: [0.3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      {/* Label */}
      <text
        x={nx}
        y={ny + r * 0.28 + 32}
        textAnchor="middle"
        fill={tier.color}
        fontSize="11"
        fontFamily="'Syne', sans-serif"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        {tier.tier.toUpperCase()}
      </text>
    </g>
  );
}

function ParticleField({ count = 60, containerSize }) {
  const particles = useRef(
    Array.from({ length: count }, () => ({
      x: Math.random() * containerSize,
      y: Math.random() * containerSize,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }))
  );

  return (
    <>
      {particles.current.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill="var(--c-sky)"
          fillOpacity={p.opacity}
          animate={{ fillOpacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}

export default function PersonaTiersSection() {
  const [visible, setVisible] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState(380);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setSize(Math.min(w, 460));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleSelect = (tier) => {
    setSelectedTier(tier);
    setSheetOpen(true);
  };

  return (
    <section id="persona-tiers" ref={ref}>
      <div className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Persona Output</div>
          <h2 className="section-title">Three Tiers.<br />One Loyalty Spectrum.</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            Every generated persona is classified within Plexus's loyalty model. Select a tier in the constellation to explore the full behavioral profile, CX indicators, and cross-functional actions.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 48, alignItems: 'center' }}>

          {/* Constellation */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{ position: 'relative', width: '100%', aspectRatio: '1' }}
          >
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              style={{
                display: 'block',
                margin: '0 auto',
                filter: 'drop-shadow(0 0 40px rgba(67,143,156,0.15))',
              }}
            >
              {/* Background particles */}
              <ParticleField count={50} containerSize={size} />

              {/* Center core */}
              <circle cx={size/2} cy={size/2} r={28} fill="rgba(67,143,156,0.12)" stroke="rgba(67,143,156,0.3)" strokeWidth={1} />
              <circle cx={size/2} cy={size/2} r={16} fill="rgba(67,143,156,0.25)" />
              <text x={size/2} y={size/2+4} textAnchor="middle" fill="#78ACAF" fontSize="9" fontFamily="'Syne', sans-serif" fontWeight="700" letterSpacing="0.1em">CORE</text>

              {/* Pulsing outer ring */}
              <motion.circle
                cx={size/2} cy={size/2} r={size/2 - 10}
                fill="none"
                stroke="rgba(67,143,156,0.06)"
                strokeWidth={1}
                animate={{ r: [size/2 - 10, size/2 - 6, size/2 - 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Tier orbits */}
              {PERSONA_TIERS.map((tier, i) => (
                <ConstellationOrbit
                  key={tier.id}
                  tier={tier}
                  index={i}
                  onSelect={handleSelect}
                  isSelected={selectedTier?.id === tier.id}
                  containerSize={size}
                />
              ))}
            </svg>

            {/* Instruction */}
            <div style={{
              textAlign: 'center',
              marginTop: 16,
              fontSize: '0.72rem',
              color: 'var(--c-text-muted)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}>
              SELECT A TIER TO EXPLORE
            </div>
          </motion.div>

          {/* Tier summary cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PERSONA_TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, x: 24 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                onClick={() => handleSelect(tier)}
                style={{
                  padding: '20px 22px',
                  background: selectedTier?.id === tier.id ? `${tier.color}12` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedTier?.id === tier.id ? tier.color + '55' : 'rgba(120,172,175,0.12)'}`,
                  borderRadius: 14,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${tier.color}10`;
                  e.currentTarget.style.borderColor = `${tier.color}40`;
                  e.currentTarget.style.transform = 'translateX(6px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = selectedTier?.id === tier.id ? `${tier.color}12` : 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = selectedTier?.id === tier.id ? `${tier.color}55` : 'rgba(120,172,175,0.12)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span className="material-icons-round" style={{ color: tier.color, fontSize: 20 }}>{tier.icon}</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--c-white)' }}>{tier.tier}</div>
                  <div style={{ marginLeft: 'auto', fontSize: '0.65rem', color: tier.color, fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.08em' }}>VIEW PROFILE →</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tier.traits.slice(0, 2).map(t => (
                    <span key={t} style={{
                      fontSize: '0.72rem',
                      padding: '3px 10px',
                      background: `${tier.color}18`,
                      border: `1px solid ${tier.color}30`,
                      borderRadius: 100,
                      color: tier.color,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                    }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image slot */}
        <div style={{ marginTop: 40 }}>
          <ImageSlot
            src="https://cdn.myportfolio.com/abc1e0ab-7370-4502-8c78-92428397bf66/db479b5a-2c39-480d-aae4-8f667b13de3e.png?h=8b1764ec6d6055a36f98cf67d73413eb"
            title="Persona Output"
            label="PERSONA OUTPUT SCREENSHOT — ADD URL"
            height={200}
          />
        </div>
      </div>

      {/* Side Sheet */}
      <SideSheet
        open={sheetOpen}
        onClose={() => { setSheetOpen(false); setSelectedTier(null); }}
        title={selectedTier?.tier}
        subtitle="Persona Profile"
        width={540}
      >
        {selectedTier && (
          <div>
            {/* Tier badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 20px',
              background: `${selectedTier.color}12`,
              border: `1px solid ${selectedTier.color}30`,
              borderRadius: 12, marginBottom: 28,
            }}>
              <span className="material-icons-round" style={{ color: selectedTier.color, fontSize: 28 }}>{selectedTier.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--c-white)' }}>{selectedTier.tier}</div>
                <div style={{ fontSize: '0.8rem', color: selectedTier.color }}>{selectedTier.experience}</div>
              </div>
            </div>

            {/* Behavioral profile */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>Behavioral Profile</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)', lineHeight: 1.7 }}>{selectedTier.behavior}</p>
            </div>

            {/* Traits */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>Traits</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedTier.traits.map(t => (
                  <span key={t} style={{
                    padding: '6px 14px',
                    background: `${selectedTier.color}15`,
                    border: `1px solid ${selectedTier.color}30`,
                    borderRadius: 100,
                    fontSize: '0.8rem',
                    color: selectedTier.color,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Department actions */}
            <div>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>Cross-Functional Actions</div>
              {Object.entries(selectedTier.actions).map(([dept, action]) => (
                <div key={dept} style={{
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(120,172,175,0.1)',
                  borderRadius: 10,
                  marginBottom: 8,
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', color: 'var(--c-sky)', marginBottom: 4, letterSpacing: '0.06em' }}>{dept.toUpperCase()}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--c-text-secondary)' }}>{action}</div>
                </div>
              ))}
            </div>

            {/* Image slot */}
            <div style={{ marginTop: 24 }}>
              <ImageSlot
                src=""
                title={selectedTier.tier}
                label={`${selectedTier.tier.toUpperCase()} PERSONA CARD — ADD URL`}
                height={160}
              />
            </div>
          </div>
        )}
      </SideSheet>
    </section>
  );
}
