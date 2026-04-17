import { useState, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Tooltip({ content, children, maxWidth = 260 }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const targetRef = useRef(null);
  const tooltipRef = useRef(null);

  const updatePos = useCallback(() => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const tooltipH = tooltipRef.current?.offsetHeight || 80;
    const tooltipW = Math.min(maxWidth, 260);
    let x = rect.left + rect.width / 2 - tooltipW / 2;
    let y = rect.top - tooltipH - 10;
    if (x < 10) x = 10;
    if (x + tooltipW > window.innerWidth - 10) x = window.innerWidth - tooltipW - 10;
    if (y < 10) y = rect.bottom + 10;
    setPos({ x, y });
  }, [maxWidth]);

  const show = () => { setVisible(true); setTimeout(updatePos, 0); };
  const hide = () => setVisible(false);

  useEffect(() => {
    if (visible) window.addEventListener('scroll', hide, { passive: true });
    return () => window.removeEventListener('scroll', hide);
  }, [visible]);

  const tooltip = visible ? ReactDOM.createPortal(
    <div
      ref={tooltipRef}
      className="portal-tooltip"
      style={{ left: pos.x, top: pos.y, maxWidth, opacity: visible ? 1 : 0, transition: 'opacity 0.15s ease' }}
    >
      {content}
    </div>,
    document.body
  ) : null;

  return (
    <>
      <span
        ref={targetRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onTouchStart={show}
        onTouchEnd={hide}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {children}
      </span>
      {tooltip}
    </>
  );
}
