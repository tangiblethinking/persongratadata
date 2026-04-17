import { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ImageSlot
 *
 * A fixed-dimension image container that:
 *  - Holds a static size regardless of the image's native aspect ratio
 *  - Shows a styled placeholder when no src is provided
 *  - Applies a hover overlay with a zoom/expand cue
 *  - Opens a fullscreen lightbox on click (with title, X button, ESC key)
 *
 * Props:
 *   src        {string}  — image URL. Empty string or undefined = placeholder mode
 *   alt        {string}  — alt text
 *   title      {string}  — displayed in white in the fullscreen overlay header
 *   height     {number}  — container height in px (default 220)
 *   borderRadius {number} — (default 16)
 *   label      {string}  — placeholder label text shown when no src
 */
export default function ImageSlot({
  src,
  alt = '',
  title = '',
  height = 220,
  borderRadius = 16,
  label = 'ADD IMAGE URL',
}) {
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const hasImage = !!src;

  const openLightbox = useCallback(() => {
    setLightbox(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(false);
  }, []);

  // ESC key to close
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  // ─── Container style ──────────────────────────────────────────────────────
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height,
    borderRadius,
    overflow: 'hidden',
    cursor: 'pointer',
    flexShrink: 0,
    border: hasImage
      ? '1px solid rgba(120,172,175,0.15)'
      : '2px dashed rgba(120,172,175,0.15)',
    background: hasImage ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.02)',
    transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
    boxShadow: hovered ? '0 0 0 2px rgba(67,143,156,0.45), 0 8px 32px rgba(0,0,0,0.35)' : 'none',
  };

  // ─── Hover overlay ────────────────────────────────────────────────────────
  const hoverOverlay = (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,20,26,0.52)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.22s ease',
        zIndex: 2,
        borderRadius,
      }}
    >
      <span
        className="material-icons-round"
        style={{ color: '#fff', fontSize: 28 }}
      >
        {hasImage ? 'zoom_in' : 'add_photo_alternate'}
      </span>
      <span
        style={{
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
        }}
      >
        {hasImage ? 'VIEW FULLSCREEN' : 'IMAGE SLOT'}
      </span>
    </div>
  );

  // ─── Image or Placeholder content ────────────────────────────────────────
  const inner = hasImage ? (
    <img
      src={src}
      alt={alt}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.35s ease',
      }}
    />
  ) : (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        color: 'var(--c-text-muted)',
      }}
    >
      <span
        className="material-icons-round"
        style={{
          fontSize: 36,
          color: 'rgba(120,172,175,0.25)',
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        image
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        {label}
      </span>
    </div>
  );

  // ─── Lightbox portal ──────────────────────────────────────────────────────
  const lightboxPortal = ReactDOM.createPortal(
    <AnimatePresence>
      {lightbox && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(8,16,22,0.95)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Header bar */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(to bottom, rgba(8,16,22,0.9) 0%, transparent 100%)',
              zIndex: 100000,
            }}
          >
            <span
              style={{
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                letterSpacing: '0.04em',
              }}
            >
              {title}
            </span>
            <button
              onClick={closeLightbox}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                transition: 'background 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <span className="material-icons-round" style={{ fontSize: 20 }}>close</span>
            </button>
          </div>

          {/* Image or placeholder */}
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              maxWidth: 'min(92vw, 1200px)',
              maxHeight: '80vh',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              border: '1px solid rgba(120,172,175,0.2)',
            }}
          >
            {hasImage ? (
              <img
                src={src}
                alt={alt}
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <div
                style={{
                  width: 'min(80vw, 640px)',
                  height: 360,
                  background: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                }}
              >
                <span
                  className="material-icons-round"
                  style={{ fontSize: 56, color: 'rgba(120,172,175,0.25)' }}
                >
                  image
                </span>
                <span
                  style={{
                    color: 'rgba(120,172,175,0.5)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  {label}
                </span>
              </div>
            )}
          </motion.div>

          {/* ESC hint */}
          <div
            style={{
              position: 'fixed',
              bottom: 24,
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
          >
            PRESS ESC TO CLOSE
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      <div
        style={containerStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        aria-label={hasImage ? `View ${title} fullscreen` : `Image slot: ${label}`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(); }}
      >
        {inner}
        {hoverOverlay}
      </div>
      {lightboxPortal}
    </>
  );
}
