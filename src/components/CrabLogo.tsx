import { useId, type SVGProps } from 'react';

type Variant = 'default' | 'mono';

/**
 * CroustyLab crab logo.
 * - `default`: multicoloured, for light surfaces.
 * - `mono`: single colour from `currentColor` (brick on light, cream on dark surfaces).
 */
export function CrabLogo({ variant = 'default', ...props }: { variant?: Variant } & SVGProps<SVGSVGElement>) {
  const id = useId().replace(/:/g, '');
  const c =
    variant === 'mono'
      ? { claw: 'currentColor', body: 'currentColor', mouth: 'currentColor', legs: 'currentColor', eyes: 'currentColor' }
      : { claw: '#C24E3E', body: '#C65D4D', mouth: '#C24E3E', legs: '#A44334', eyes: '#1B2125' };

  return (
    <svg viewBox="0 0 408 267" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <mask id={`${id}-l`}>
          <rect width="408" height="267" fill="#fff" />
          <circle cx="108" cy="56" r="45" fill="#000" />
        </mask>
        <mask id={`${id}-r`}>
          <rect width="408" height="267" fill="#fff" />
          <circle cx="300" cy="56" r="45" fill="#000" />
        </mask>
      </defs>
      {/* Claws: a disc with a bite taken out */}
      <circle cx="58" cy="64" r="60" fill={c.claw} mask={`url(#${id}-l)`} />
      <circle cx="350" cy="64" r="60" fill={c.claw} mask={`url(#${id}-r)`} />
      <g fill={c.eyes}>
        <circle cx="147" cy="50" r="29" />
        <circle cx="261" cy="50" r="29" />
      </g>
      <g fill="none" stroke={c.legs} strokeWidth="26" strokeLinecap="round">
        <path d="M112 162 Q 70 214 88 254" />
        <path d="M152 200 Q 126 230 138 254" />
        <path d="M296 162 Q 338 214 320 254" />
        <path d="M256 200 Q 282 230 270 254" />
      </g>
      <path d="M172 244 L204 206 L236 244 Z" fill={c.mouth} stroke={c.mouth} strokeWidth="18" strokeLinejoin="round" />
      <path d="M128 104 L280 104 L204 204 Z" fill={c.body} stroke={c.body} strokeWidth="28" strokeLinejoin="round" />
    </svg>
  );
}
