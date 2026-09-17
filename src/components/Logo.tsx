import { useState } from 'react';
import { cn } from '@/utils/cn';
import { asset } from '@/utils/asset';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { height: 22, text: 'text-sm' },
  md: { height: 30, text: 'text-base' },
  lg: { height: 42, text: 'text-xl' },
} as const;

/**
 * Spendwise brand lockup.
 *   showWordmark = true   → full horizontal logo (wallet + wordmark)
 *   showWordmark = false  → square icon only (mobile header)
 *
 * Falls back to a hand-drawn SVG mark if the image fails to load,
 * so the header never shows a broken-image icon.
 */
export const Logo = ({ size = 'md', showWordmark = true, className }: LogoProps) => {
  const s = sizeMap[size];
  const [failed, setFailed] = useState(false);

  // Fallback: gradient square with a white wallet glyph
  if (failed) {
    return (
      <div className={cn('flex items-center gap-2.5', className)}>
        <div
          className="rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#9CE6C9] to-[#14B8A6] shadow-md shadow-brand-500/25"
          style={{ width: s.height, height: s.height }}
          aria-hidden="true"
        >
          <svg
            width={s.height * 0.55}
            height={s.height * 0.55}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M4 10h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="15.5" cy="14" r="1.25" fill="white" />
          </svg>
        </div>
        {showWordmark && (
          <span className={cn('font-extrabold text-ink-900 tracking-tight', s.text)}>
            Spend<span className="text-brand-500">wise</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {showWordmark ? (
        <img
          src={asset('logo.png')}
          alt="Spendwise"
          width={undefined}
          height={s.height}
          style={{ height: s.height, width: 'auto' }}
          className="select-none"
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <img
          src={asset('icon-192.png')}
          alt="Spendwise"
          width={s.height}
          height={s.height}
          style={{ width: s.height, height: s.height }}
          className="rounded-lg select-none"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};