import { motion, type HTMLMotionProps } from 'motion/react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';

/** Fades + slides its children in the first time they scroll into view. */
export function Reveal({ delay = 0, y = 20, ...props }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

/** `[ Title ]` with coloured brackets, as in the brand guideline. */
export function Bracketed({ children, bracketClass = 'text-primary' }: { children: ReactNode; bracketClass?: string }) {
  return (
    <>
      <span className={bracketClass} aria-hidden="true">
        [
      </span>{' '}
      {children}{' '}
      <span className={bracketClass} aria-hidden="true">
        ]
      </span>
    </>
  );
}

type Tone = 'light' | 'primary';

const toneStyles: Record<Tone, { label: string; index: string; rule: string; title: string; bracket: string; subtitle: string; frame: string }> = {
  light: { label: 'text-fg', index: 'text-primary', rule: 'bg-ink', title: '', bracket: 'text-primary', subtitle: 'text-muted-fg', frame: 'shadow-brutal-lg' },
  primary: { label: 'text-cream', index: 'text-ink', rule: 'bg-cream', title: 'text-cream', bracket: 'text-ink', subtitle: 'text-cream/85', frame: 'shadow-brutal-lg' },
};

export function SectionHeading({
  id,
  index,
  label,
  title,
  subtitle,
  Illustration,
  tone = 'light',
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  subtitle: string;
  Illustration?: ComponentType<SVGProps<SVGSVGElement>>;
  tone?: Tone;
}) {
  const s = toneStyles[tone];
  return (
    <div className="mb-14 grid items-end gap-10 md:mb-16 md:grid-cols-[1fr_auto]">
      <Reveal>
        <div className={`mb-6 flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase ${s.label}`}>
          <span className={`font-display text-2xl tracking-normal ${s.index}`}>{index}</span>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`h-0.5 w-16 origin-left md:w-28 ${s.rule}`}
          />
          {label}
        </div>
        <h2 id={id} className={`text-3xl md:text-5xl ${s.title}`}>
          <Bracketed bracketClass={s.bracket}>{title}</Bracketed>
        </h2>
        <p className={`mt-4 max-w-xl leading-relaxed ${s.subtitle}`}>{subtitle}</p>
      </Reveal>
      {Illustration && (
        <Reveal delay={0.15} className="hidden md:block">
          <div className={`rounded-brutal-md border-2 border-ink bg-surface p-4 ${s.frame}`}>
            <Illustration aria-hidden="true" className="h-36 w-auto lg:h-40" />
          </div>
        </Reveal>
      )}
    </div>
  );
}

export function Chip({
  active,
  children,
  ...props
}: { active?: boolean; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`press press-sm rounded-brutal-sm border-2 border-ink px-4 py-1.5 text-sm font-medium ${
        active ? 'bg-primary text-primary-fg' : 'bg-surface text-fg hover:bg-surface-2'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

const buttonStyles = {
  primary: 'bg-primary text-primary-fg hover:bg-primary-dark',
  outline: 'bg-surface text-fg hover:bg-surface-2',
  ink: 'bg-ink text-cream',
  cream: 'bg-cream text-ink hover:bg-surface',
};

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: {
  variant?: keyof typeof buttonStyles;
  size?: 'sm' | 'md';
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const sizes = size === 'sm' ? 'press-sm gap-2 px-3 py-1.5 text-sm' : 'gap-2.5 px-5 py-3';
  return (
    <a
      className={`press inline-flex items-center justify-center rounded-brutal-sm border-2 border-ink font-medium ${sizes} ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
