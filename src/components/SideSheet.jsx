import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SideSheet({ open, onClose, title, subtitle, children, width = 520 }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const sheet = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(10,20,26,0.72)',
              backdropFilter: 'blur(4px)',
              zIndex: 9000,
            }}
          />
          <motion.div
            key="sheet"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: Math.min(width, window.innerWidth),
              background: 'linear-gradient(160deg, #1a3340 0%, #17252E 60%)',
              borderLeft: '1px solid rgba(120,172,175,0.2)',
              zIndex: 9001,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '28px 28px 20px',
              borderBottom: '1px solid rgba(120,172,175,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              position: 'sticky',
              top: 0,
              background: 'linear-gradient(160deg, #1a3340 0%, #17252E 100%)',
              zIndex: 1,
            }}>
              <div>
                {subtitle && (
                  <div style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--c-teal)',
                    marginBottom: 8,
                  }}>{subtitle}</div>
                )}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                  fontWeight: 800,
                  color: 'var(--c-white)',
                  lineHeight: 1.2,
                }}>{title}</h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(120,172,175,0.2)',
                  borderRadius: '50%',
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--c-text-secondary)',
                  flexShrink: 0,
                  marginLeft: 16,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(67,143,156,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <span className="material-icons-round" style={{ fontSize: 18 }}>close</span>
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '24px 28px 40px', flex: 1 }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(sheet, document.body);
}
