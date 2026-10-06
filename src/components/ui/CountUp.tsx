'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { easeCurve } from '../../theme';
import { visuallyHidden } from './visuallyHidden';

/**
 * Counts the first number inside `value` up from zero when it scrolls into view,
 * keeping any prefix/suffix (e.g. "₹1.02Cr", "2,611", "91%"). Screen readers get the final text.
 */
export default function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const match = String(value).match(/^(\D*)([\d,]*\.?\d+)(.*)$/);

  useEffect(() => {
    if (!match || !inView || reduce || !ref.current) return undefined;
    const [, prefix, raw, suffix] = match;
    const target = parseFloat(raw.replace(/,/g, ''));
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const useCommas = raw.includes(',');
    const node = ref.current;

    const controls = animate(0, target, {
      duration,
      ease: easeCurve,
      onUpdate(latest) {
        const n = useCommas ? Math.round(latest).toLocaleString('en-US') : latest.toFixed(decimals);
        node.textContent = `${prefix}${n}${suffix}`;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span style={visuallyHidden}>{value}</span>
    </>
  );
}
