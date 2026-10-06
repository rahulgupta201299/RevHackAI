'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { AnimatePresence, animate, m, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { liveDemo } from '../../content/work';
import type { LiveDemo } from '../../content/types';
import { fonts } from '../../theme';
import SurfaceCard from '../ui/SurfaceCard';
import { visuallyHidden } from '../ui/visuallyHidden';
import WindowBar from '../ui/WindowBar';

/*
 * A store-admin dashboard that "runs" in the browser with SIMULATED data: orders arrive every
 * few seconds, live visitors drift, the current hour's bar grows and the traffic-source split
 * shifts as each order is attributed. No real client figures are used anywhere.
 */

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
const int = new Intl.NumberFormat('en-IN');
const SERIES = ['series.one', 'series.two', 'series.three'] as const;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
  70% { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
`;

interface Order {
  id: string;
  product: string;
  city: string;
  amount: number;
  at: number;
}

interface State {
  hourly: number[];
  revenue: number;
  visitors: number;
  sessions: number;
  sourceCounts: number[];
  feed: Order[];
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];
const sum = (list: number[]) => list.reduce((a, b) => a + b, 0);

/** Deterministic starting point, so the server and browser render the same first frame. */
function initialState(demo: LiveDemo): State {
  const orders = sum(demo.hourly);
  return {
    hourly: demo.hourly,
    revenue: orders * demo.averageOrderValue,
    visitors: demo.visitors,
    sessions: Math.round(orders * 38.5),
    sourceCounts: demo.sources.map((s) => Math.round(s.share * orders)),
    feed: [],
  };
}

function makeOrder(demo: LiveDemo, at: number): Order {
  // Skewed order values: most near the average, a few large baskets.
  const factor = Math.exp(rand(-0.55, 0.75));
  return {
    id: `RH-${Math.floor(rand(41000, 49999))}`,
    product: pick(demo.products),
    city: pick(demo.cities),
    amount: Math.round((demo.averageOrderValue * factor) / 10) * 10,
    at,
  };
}

function pickSource(demo: LiveDemo) {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < demo.sources.length; i += 1) {
    acc += demo.sources[i].share;
    if (r <= acc) return i;
  }
  return 0;
}

function ago(at: number, now: number) {
  const s = Math.max(0, Math.round((now - at) / 1000));
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  return `${Math.floor(s / 60)}m ago`;
}

function hourLabel(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  const suffix = h < 12 ? 'am' : 'pm';
  return `${h % 12 === 0 ? 12 : h % 12}${suffix}`;
}

/** A number that tweens smoothly from its previous value whenever it changes. */
function Ticker({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reduce) {
      node.textContent = format(value);
      prev.current = value;
      return undefined;
    }
    const controls = animate(prev.current, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, format, reduce]);

  return <span ref={ref}>{format(value)}</span>;
}

const fmtInt = (n: number) => int.format(Math.round(n));
const fmtInr = (n: number) => inr.format(Math.round(n));
const fmtPct = (n: number) => `${n.toFixed(2)}%`;

function Kpi({
  label,
  value,
  format,
  live = false,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  live?: boolean;
}) {
  return (
    <Box
      component="div"
      sx={{
        p: { xs: 1.75, md: 2.25 },
        borderRadius: '16px',
        bgcolor: 'surface.alt',
        border: 1,
        borderColor: 'divider',
        minWidth: 0,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.8rem' }}
      >
        {live && (
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              bgcolor: '#22c55e',
              animation: `${pulse} 1.8s infinite`,
            }}
          />
        )}
        {label}
      </Typography>
      <Typography
        sx={{
          mt: 0.5,
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 'clamp(1.25rem, 2.2vw, 1.7rem)',
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
          whiteSpace: 'nowrap',
        }}
      >
        <Ticker value={value} format={format} />
      </Typography>
    </Box>
  );
}

export default function LiveDashboard({ demo = liveDemo }: { demo?: LiveDemo }) {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.2 });
  const [state, setState] = useState<State>(() => initialState(demo));
  const [now, setNow] = useState<number | null>(null);
  const [hour, setHour] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const hourRef = useRef<number | null>(null);

  // Seed a few recent orders once in the browser (random data never renders on the server).
  // Deferred to a timer so the first paint matches the server HTML exactly.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const t = Date.now();
      setNow(t);
      hourRef.current = new Date(t).getHours();
      setHour(hourRef.current);
      setState((s) => ({
        ...s,
        feed: [
          makeOrder(demo, t - 41_000),
          makeOrder(demo, t - 118_000),
          makeOrder(demo, t - 260_000),
        ],
      }));
    }, 0);
    return () => window.clearTimeout(id);
  }, [demo]);

  // The simulation runs only while the dashboard is on screen and the tab is visible.
  useEffect(() => {
    if (!inView) return undefined;
    let orderTimer = 0;

    const tick = window.setInterval(() => {
      if (document.hidden) return;
      const t = Date.now();
      setNow(t);
      setState((s) => {
        // Live visitors drift with a pull back towards the baseline.
        const drift = Math.round(rand(-5, 5) + (demo.visitors - s.visitors) * 0.08);
        const visitors = Math.min(260, Math.max(90, s.visitors + drift));
        return { ...s, visitors, sessions: s.sessions + Math.round(rand(0, 3)) };
      });
      // New clock hour: shift the chart along.
      const h = new Date(t).getHours();
      if (hourRef.current !== null && hourRef.current !== h) {
        setState((s) => ({ ...s, hourly: [...s.hourly.slice(1), 0] }));
      }
      hourRef.current = h;
      setHour(h);
    }, 2000);

    const scheduleOrder = () => {
      orderTimer = window.setTimeout(
        () => {
          if (!document.hidden) {
            const order = makeOrder(demo, Date.now());
            const source = pickSource(demo);
            setState((s) => {
              const hourly = [...s.hourly];
              hourly[hourly.length - 1] += 1;
              const sourceCounts = [...s.sourceCounts];
              sourceCounts[source] += 1;
              return {
                ...s,
                hourly,
                sourceCounts,
                revenue: s.revenue + order.amount,
                feed: [order, ...s.feed].slice(0, 4),
              };
            });
          }
          scheduleOrder();
        },
        rand(5000, 13000),
      );
    };
    scheduleOrder();

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(orderTimer);
    };
  }, [inView, demo]);

  const orders = sum(state.hourly);
  const conversion = (orders / state.sessions) * 100;
  const max = Math.max(...state.hourly) * 1.15;
  const sourceTotal = sum(state.sourceCounts);
  const shares = state.sourceCounts.map((c) => (c / sourceTotal) * 100);
  const labelFor = (i: number) =>
    hour === null ? '' : hourLabel(hour - (state.hourly.length - 1 - i));

  return (
    <SurfaceCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <WindowBar title={demo.title} />
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.25,
            py: 0.25,
            borderRadius: 999,
            bgcolor: 'rgba(34, 197, 94, 0.12)',
            color: 'success.main',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: '#22c55e',
              animation: `${pulse} 1.8s infinite`,
            }}
          />
          LIVE
        </Box>
      </Box>

      <Box ref={root} sx={{ p: { xs: 2, md: 3 }, display: 'grid', gap: { xs: 2, md: 2.5 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 1.25, md: 1.75 },
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
          }}
        >
          <Kpi label="Orders today" value={orders} format={fmtInt} />
          <Kpi label="Revenue today" value={state.revenue} format={fmtInr} />
          <Kpi label="Live visitors" value={state.visitors} format={fmtInt} live />
          <Kpi label="Conversion" value={conversion} format={fmtPct} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 2.5 },
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.35fr) minmax(0, 1fr)' },
          }}
        >
          {/* Orders per hour: a single series, so the title names it (no legend box). */}
          <Box
            sx={{
              p: 2,
              borderRadius: '16px',
              border: 1,
              borderColor: 'divider',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Orders per hour
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
                last 12 hours
              </Typography>
            </Box>
            <Box
              role="img"
              aria-label={`Orders per hour over the last 12 hours, current hour ${state.hourly[state.hourly.length - 1]} orders`}
              onMouseLeave={() => setHovered(null)}
              sx={{
                position: 'relative',
                mt: 2,
                flex: 1,
                minHeight: 150,
                display: 'grid',
                gridTemplateColumns: `repeat(${state.hourly.length}, minmax(0, 1fr))`,
                alignItems: 'end',
                gap: '2px',
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              {state.hourly.map((value, i) => {
                const current = i === state.hourly.length - 1;
                return (
                  <Box
                    key={i}
                    onMouseEnter={() => setHovered(i)}
                    sx={{
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      cursor: 'default',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: 24,
                        height: `${Math.max(2, (value / max) * 100)}%`,
                        borderRadius: '4px 4px 0 0',
                        bgcolor: 'chart.primary',
                        opacity: hovered === null || hovered === i ? 1 : 0.45,
                        transition: 'height .8s cubic-bezier(0.22, 1, 0.36, 1), opacity .2s ease',
                      }}
                    />
                    {(hovered === i || (hovered === null && current)) && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: `calc(${(value / max) * 100}% + 6px)`,
                          // Keep the label inside the chart at the left and right edges.
                          ...(i >= state.hourly.length - 2
                            ? { right: 0 }
                            : i <= 1
                              ? { left: 0 }
                              : { left: '50%', transform: 'translateX(-50%)' }),
                          px: 0.75,
                          py: 0.25,
                          borderRadius: 1,
                          bgcolor: 'inverse.bg',
                          color: 'inverse.text',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                          zIndex: 1,
                        }}
                      >
                        {current && hovered === null
                          ? `${value} · now`
                          : `${labelFor(i)} · ${value}`}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
            <Box
              aria-hidden="true"
              sx={{
                mt: 0.75,
                display: 'flex',
                justifyContent: 'space-between',
                color: 'text.secondary',
                fontSize: '0.72rem',
                minHeight: '1em',
              }}
            >
              <span>{labelFor(0)}</span>
              <span>{labelFor(Math.floor(state.hourly.length / 2))}</span>
              <span>now</span>
            </Box>
            {/* Table view of the same data for screen readers. */}
            <table style={visuallyHidden}>
              <caption>Orders per hour, demo data</caption>
              <tbody>
                {state.hourly.map((value, i) => (
                  <tr key={i}>
                    <th scope="row">{labelFor(i) || `Hour ${i + 1}`}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          <Box sx={{ display: 'grid', gap: { xs: 2, md: 2.5 }, alignContent: 'start' }}>
            {/* Traffic-source split: stacked bar with 2px surface gaps + a legend. */}
            <Box sx={{ p: 2, borderRadius: '16px', border: 1, borderColor: 'divider' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Orders by source
              </Typography>
              <Box
                role="img"
                aria-label={demo.sources
                  .map((s, i) => `${s.label} ${Math.round(shares[i])}%`)
                  .join(', ')}
                sx={{ display: 'flex', gap: '2px', height: 10, mt: 1.5 }}
              >
                {demo.sources.map((s, i) => (
                  <Box
                    key={s.label}
                    sx={{
                      width: `${shares[i]}%`,
                      bgcolor: SERIES[i],
                      borderRadius:
                        i === 0 ? '4px 0 0 4px' : i === demo.sources.length - 1 ? '0 4px 4px 0' : 0,
                      transition: 'width .8s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                ))}
              </Box>
              <Box
                component="ul"
                sx={{ m: 0, mt: 1.5, p: 0, listStyle: 'none', display: 'grid', gap: 0.5 }}
              >
                {demo.sources.map((s, i) => (
                  <Box
                    component="li"
                    key={s.label}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.82rem' }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{ width: 10, height: 10, borderRadius: '3px', bgcolor: SERIES[i] }}
                    />
                    <Box component="span" sx={{ color: 'text.secondary', flex: 1 }}>
                      {s.label}
                    </Box>
                    <Box
                      component="span"
                      sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}
                    >
                      {shares[i].toFixed(1)}%
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Incoming orders feed. */}
            <Box sx={{ p: 2, borderRadius: '16px', border: 1, borderColor: 'divider' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Latest orders
              </Typography>
              <Box
                component="ul"
                aria-live="off"
                sx={{ m: 0, mt: 1, p: 0, listStyle: 'none', minHeight: 4 * 44 }}
              >
                <AnimatePresence initial={false}>
                  {state.feed.map((order) => (
                    <Box
                      component={m.li}
                      key={order.id + order.at}
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                        py: 0.9,
                        borderTop: 1,
                        borderColor: 'divider',
                        '&:first-of-type': { borderTop: 0 },
                        fontSize: '0.82rem',
                      }}
                    >
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Box
                          sx={{
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {order.product}
                        </Box>
                        <Box sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                          #{order.id} · {order.city} · {now ? ago(order.at, now) : ''}
                        </Box>
                      </Box>
                      <Box sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                        {inr.format(order.amount)}
                      </Box>
                    </Box>
                  ))}
                </AnimatePresence>
              </Box>
            </Box>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
          {demo.note}
        </Typography>
      </Box>
    </SurfaceCard>
  );
}
