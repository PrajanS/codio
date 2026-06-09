'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Tag = 'div' | 'section' | 'span' | 'p' | 'article' | 'header' | 'footer' | 'li' | 'ul';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
};

export default function Reveal({ children, className = '', delay = 0, as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const target = e.target as HTMLElement;
          if (delay) window.setTimeout(() => target.classList.add('in'), delay);
          else target.classList.add('in');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -80px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Tag = as as 'div';
  return (
    <Tag ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
