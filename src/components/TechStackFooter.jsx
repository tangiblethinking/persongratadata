import { useState } from 'react';
import Tooltip from './Tooltip';

const STACK = [
  {
    name: 'React',
    category: 'Frontend',
    color: '#61DAFB',
    svg: `<svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg"><circle r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
  },
  {
    name: 'Vite',
    category: 'Build Tool',
    color: '#A78BFA',
    svg: `<svg viewBox="0 0 410 404" xmlns="http://www.w3.org/2000/svg"><path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2938 403.768 52.1508 399.641 59.5246Z" fill="url(#viteGrad1)"/><path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.066 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.8541 273.262 96.2684L292.083 31.6806C293.121 28.0819 289.994 24.7714 286.325 25.4867L292.965 1.5744Z" fill="url(#viteGrad2)"/><defs><linearGradient id="viteGrad1" x1="6" y1="32.9909" x2="235" y2="344.438" gradientUnits="userSpaceOnUse"><stop stop-color="#41D1FF"/><stop offset="1" stop-color="#BD34FE"/></linearGradient><linearGradient id="viteGrad2" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse"><stop stop-color="#FF3E00"/><stop offset="0.5" stop-color="#BF3BFF"/><stop offset="1" stop-color="#FF8A00"/></linearGradient></defs></svg>`,
  },
  {
    name: 'Node.js',
    category: 'Backend',
    color: '#68A063',
    svg: `<svg viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg"><path d="M128 288.464C119.35 288.464 111.483 286.248 104.402 281.816L66.656 259.097C55.563 252.917 60.872 250.702 64.642 249.394C72.166 246.724 73.919 245.87 81.887 241.198C82.741 240.682 83.833 240.896 84.702 241.411L113.559 258.136C114.643 258.758 116.169 258.758 117.036 258.136L232.407 191.174C233.492 190.545 234.145 189.286 234.145 187.989V54.064C234.145 52.744 233.492 51.492 232.351 50.843L117.036 -16.185C115.951 -16.814 114.427 -16.814 113.559 -16.185L-1.745 50.843C-2.886 51.492 -3.539 52.744 -3.539 54.064V187.989C-3.539 189.286 -2.886 190.545 -1.745 191.174L31.271 209.849C48.636 218.782 59.351 208.857 59.351 198.708V65.895C59.351 64.123 60.65 62.799 62.383 62.799H74.748C76.485 62.799 77.779 64.123 77.779 65.895V198.708C77.779 220.093 66.424 232.268 46.158 232.268C40.03 232.268 35.15 232.268 20.47 225.012L-11.459 207.247C-25.024 199.546 -33.539 185.099 -33.539 169.577V35.652C-33.539 20.13 -25.024 5.683 -11.459 -2.018L113.559 -74.979C126.692 -82.445 144.28 -82.445 157.41 -74.979L282.459 -2.018C295.997 5.683 304.535 20.13 304.535 35.652V169.577C304.535 185.099 295.997 199.546 282.459 207.247L157.41 280.208C150.329 284.668 142.462 288.464 128 288.464Z" fill="#539E43"/></svg>`,
  },
  {
    name: 'TypeScript',
    category: 'Language',
    color: '#3178C6',
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" rx="50" fill="#3178c6"/><path d="M87.2 187.6h48v123h29v-123h48v-24h-125zM332 305c-5.9 3.1-12.9 5.4-20.9 7.1-8 1.7-16.4 2.5-25.3 2.5-9.6 0-18.1-1.2-25.7-3.7-7.5-2.5-14-6.2-19.3-11.1-5.3-5-9.4-11.1-12.3-18.3-2.8-7.2-4.3-15.5-4.3-24.9 0-9 1.5-17.1 4.4-24.2 3-7.1 7.1-13.1 12.5-18.1 5.4-5 11.8-8.8 19.2-11.5 7.4-2.7 15.7-4 24.8-4 8.3 0 15.7.8 22.3 2.5 6.6 1.7 12.1 3.9 16.5 6.5l-8.3 22.7c-4-2.3-8.4-4.2-13.3-5.8-4.9-1.6-10.2-2.3-16-2.3-9.6 0-17.1 3.1-22.7 9.4-5.5 6.3-8.3 15.1-8.3 26.4 0 5.3.7 10.1 2 14.4 1.4 4.3 3.4 8 6.1 11.1 2.7 3.1 6.1 5.5 10.2 7.2 4.1 1.7 8.9 2.5 14.4 2.5 6.2 0 12-.8 17.2-2.4 5.3-1.6 9.8-3.5 13.5-5.8l8 22.8z" fill="white"/></svg>`,
  },
  {
    name: 'Claude AI',
    category: 'AI Generation Layer',
    color: '#D4A574',
    svg: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#D4A574" opacity="0.2" stroke="#D4A574" stroke-width="1.5"/><text x="20" y="26" text-anchor="middle" font-family="serif" font-size="18" font-weight="bold" fill="#D4A574">C</text></svg>`,
  },
  {
    name: 'Gemini',
    category: 'AI Generation Layer',
    color: '#4285F4',
    svg: `<svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z" fill="url(#geminiGrad)"/><defs><linearGradient id="geminiGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#4285F4"/><stop offset="1" stop-color="#9B72CB"/></linearGradient></defs></svg>`,
  },
];

export default function TechStackFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(120,172,175,0.1)',
      padding: '40px clamp(20px, 5vw, 60px) 32px',
      background: 'rgba(15,26,33,0.8)',
    }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
          marginBottom: 32,
        }}>
          <div>
            <div style={{
              fontSize: '0.68rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--c-teal)',
              marginBottom: 6,
            }}>Technology Stack</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--c-text-secondary)',
            }}>Built with</div>
          </div>

          {/* Logo band */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(16px, 3vw, 32px)',
            flexWrap: 'wrap',
          }}>
            {STACK.map((tech) => (
              <Tooltip
                key={tech.name}
                content={
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 3 }}>{tech.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)' }}>{tech.category}</div>
                  </div>
                }
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'default',
                  opacity: 0.65,
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = '0.65';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{ width: 32, height: 32 }}
                    dangerouslySetInnerHTML={{ __html: tech.svg }}
                  />
                  <div style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    color: 'var(--c-text-muted)',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                  }}>{tech.name}</div>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(120,172,175,0.06)',
          paddingTop: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--c-text-muted)',
            fontFamily: 'var(--font-display)',
          }}>
            © {new Date().getFullYear()} Christopher Kenreigh · Portfolio Case Study
          </div>
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--c-text-muted)',
            fontFamily: 'var(--font-display)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span className="material-icons-round" style={{ fontSize: 14 }}>lock</span>
            Confidential — For Interview Purposes Only
          </div>
        </div>
      </div>
    </footer>
  );
}
