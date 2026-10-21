/**
 * Loop Audio's mark: two concentric rings with a gap on the right — a loop
 * that does not quite close, drawn the way a driver surround is drawn, with
 * the gap where the cable leaves. Same shape as public/favicon.svg.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"
      className={`shrink-0 ${className}`}>
      <path d="M19.8 8.2a9 9 0 1 0 0 7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
