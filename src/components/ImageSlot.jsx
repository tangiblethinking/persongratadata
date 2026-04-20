import { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ImageSlot
 *
 * A fixed-dimension image container that:
 *  - Holds a static size regardless of the image's native aspect ratio
 *  - Shows a styled placeholder when no src is provided
 *  - Applies a hover: white border glow + brightness overlay + animated zoom
 *  - Opens a fullscreen lightbox on click (with white title, X button, ESC key)
 *  - Fully responsive: 100% width, locked height, mobile optimised
 *
 * Props:
 *   src          {string}  — image URL. Empty string or undefined = placeholder mode
 *   alt          {string}  — alt text
 *   title        {string}  — displayed in white in the fullscreen overlay header
 *   height       {number}  — container height in px (default 200)
 *   borderRadius {number}  — (default 16)
 *   label        {string}  — placeholder label text shown when no src
 */
export default function ImageSlot({
  src,
  alt = '',
  title = '',
  height = 200,
  borderRadius = 16,
  label = 'ADD IMAGE URL',
}) {
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const hasImage = !!src;

  const openLightbox = useCallback(() => { if (hasImage) setLightbox(true); }, [hasImage]);
  const closeLightbox = useCallback(() => setLightbox(false), []);

  // ESC key to close
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  // ─── Container ────────────────────────────────────────────────────────────
  // height and min-height both set so flex parents can never stretch it
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height,
    minHeight: height,
    maxHeight: height,
    borderRadius,
    overflow: 'hidden',
    cursor: hasImage ? 'pointer' : 'default',
    flexShrink: 0,
    flexGrow: 0,
    // Border: white-ish glow on hover, subtle teal otherwise
    border: hovered && hasImage
      ? '1.5px solid rgba(248,244,244,0.75)'
      : hasImage
        ? '1px solid rgba(120,172,175,0.15)'
        : '2px dashed rgba(120,172,175,0.15)',
    background: 'rgba(255,255,255,0.02)',
    // Box shadow brightens on hover
    boxShadow: hovered && hasImage
      ? '0 0 0 3px rgba(248,244,244,0.12), 0 8px 32px rgba(0,0,0,0.4)'
      : 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  };

  // ─── Hover overlay (brightness + label) ───────────────────────────────────
  const hoverOverlay = hasImage && (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        // Brightness overlay via a semi-transparent white layer
        background: 'rgba(255,255,255,0.10)',
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
        style={{ color: '#fff', fontSize: 28, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
      >
        zoom_in
      </span>
      <span
        style={{
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
        }}
      >
        VIEW FULLSCREEN
      </span>
    </div>
  );

  // ─── Image (with zoom transition) ─────────────────────────────────────────
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
        objectPosition: 'top',
        display: 'block',
        // Animated zoom on hover
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}
    />
  ) : (
    // ─── Placeholder ──────────────────────────────────────────────────────
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
          color: 'rgba(120,172,175,0.45)',
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
            backdropFilter: 'blur(14px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Header bar with white title */}
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
              background: 'linear-gradient(to bottom, rgba(8,16,22,0.92) 0%, transparent 100%)',
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

          {/* Fullscreen image */}
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
              border: '1px solid rgba(248,244,244,0.15)',
            }}
          >
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
        role={hasImage ? 'button' : undefined}
        tabIndex={hasImage ? 0 : undefined}
        aria-label={hasImage ? `View ${title} fullscreen` : undefined}
        onKeyDown={hasImage ? (e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(); }) : undefined}
      >
        {inner}
        {hoverOverlay}
      </div>
      {lightboxPortal}
    </>
  );
}
