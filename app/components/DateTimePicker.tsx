'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

/* ------------------------------------------------------------------
   Custom, theme-matched date + time pickers for the contact form.
   - Calendar: warm-paper month grid, signal-green selected day.
   - Clock: circular dial you tap or drag like a phone alarm — pick the
     hour, then the minute, with an AM/PM toggle.
   Values are mirrored into hidden inputs so Web3Forms still receives them.
   ------------------------------------------------------------------ */

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MON_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Time = { h: number; m: number; ap: 'AM' | 'PM' };

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const fmtDateShort = (d: Date) =>
  `${WEEKDAYS[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')} ${MON_SHORT[d.getMonth()]} ${d.getFullYear()}`;
const fmtDateValue = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')} ${MON_SHORT[d.getMonth()]} ${d.getFullYear()}`;
const fmtTime = (t: Time) => `${String(t.h).padStart(2, '0')}:${String(t.m).padStart(2, '0')} ${t.ap}`;

export default function DateTimePicker() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [open, setOpen] = useState<'date' | 'time' | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const dateValue = date ? `${fmtDateValue(date)}` : '';
  const timeValue = time ? `${fmtTime(time)} IST` : '';

  return (
    <div ref={rootRef} className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 pt-1">
      <input type="hidden" name="call_date" value={dateValue} />
      <input type="hidden" name="call_time" value={timeValue} />

      {/* DATE */}
      <div className="relative">
        <span className="field-sublabel">Date</span>
        <button type="button" onClick={() => setOpen(open === 'date' ? null : 'date')} className="dtp-trigger">
          <span className={date ? 'ink' : 'ink-faint'}>{date ? fmtDateShort(date) : 'Pick a date'}</span>
          <CalendarGlyph />
        </button>
        {open === 'date' && (
          <Calendar
            value={date}
            onSelect={(d) => { setDate(d); setOpen('time'); }}
          />
        )}
      </div>

      {/* TIME */}
      <div className="relative">
        <span className="field-sublabel">Time (IST)</span>
        <button type="button" onClick={() => setOpen(open === 'time' ? null : 'time')} className="dtp-trigger">
          <span className={time ? 'ink' : 'ink-faint'}>{time ? fmtTime(time) : 'Pick a time'}</span>
          <ClockGlyph />
        </button>
        {open === 'time' && (
          <Clock value={time} onChange={setTime} onDone={() => setOpen(null)} />
        )}
      </div>
    </div>
  );
}

/* ---------------- Calendar ---------------- */
function Calendar({ value, onSelect }: { value: Date | null; onSelect: (d: Date) => void }) {
  const today = startOfDay(new Date());
  const init = value ?? today;
  const [view, setView] = useState(new Date(init.getFullYear(), init.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const step = (delta: number) => setView(new Date(year, month + delta, 1));

  return (
    <div className="dtp-pop w-[19rem] max-sm:w-[17rem]">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => step(-1)} aria-label="Previous month" className="dtp-nav">‹</button>
        <span className="font-display text-lg tracking-tight ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
          {MONTHS[month]} {year}
        </span>
        <button type="button" onClick={() => step(1)} aria-label="Next month" className="dtp-nav">›</button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w) => (
          <span key={w} className="mono ink-faint text-[0.58rem] text-center py-1">{w}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const isPast = d < today;
          const isToday = sameDay(d, today);
          const isSel = value != null && sameDay(d, value);
          return (
            <button
              key={i}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(d)}
              className={`dtp-day ${isSel ? 'dtp-day-sel' : ''} ${isToday && !isSel ? 'dtp-day-today' : ''}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Clock (alarm-style dial) ---------------- */
function Clock({ value, onChange, onDone }: { value: Time | null; onChange: (t: Time) => void; onDone: () => void }) {
  const [h, setH] = useState(value?.h ?? 10);
  const [m, setM] = useState(value?.m ?? 0);
  const [ap, setAp] = useState<'AM' | 'PM'>(value?.ap ?? 'AM');
  const [mode, setMode] = useState<'hour' | 'minute'>('hour');
  const dialRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const SIZE = 232;
  const C = SIZE / 2;
  const NUM_R = C - 26; // number ring radius
  const HAND_R = NUM_R - 2;

  const push = (nh: number, nm: number, nap: 'AM' | 'PM') => onChange({ h: nh, m: nm, ap: nap });

  const angleToValue = (clientX: number, clientY: number) => {
    const el = dialRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = clientX - (r.left + C);
    const dy = clientY - (r.top + C);
    let ang = (Math.atan2(dx, -dy) * 180) / Math.PI; // 0 = top, clockwise
    if (ang < 0) ang += 360;
    if (mode === 'hour') {
      let idx = Math.round(ang / 30) % 12;
      const nh = idx === 0 ? 12 : idx;
      setH(nh); push(nh, m, ap);
    } else {
      const nm = Math.round(ang / 6) % 60;
      setM(nm); push(h, nm, ap);
    }
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    angleToValue(e.clientX, e.clientY);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    angleToValue(e.clientX, e.clientY);
  };
  const onPointerUp = () => {
    if (dragging.current && mode === 'hour') setMode('minute');
    dragging.current = false;
  };

  const selAngle = mode === 'hour' ? (h % 12) * 30 : m * 6;
  const rad = (selAngle * Math.PI) / 180;
  const handX = C + HAND_R * Math.sin(rad);
  const handY = C - HAND_R * Math.cos(rad);

  const nums = mode === 'hour'
    ? Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}`, ang: (i + 1) * 30 }))
    : Array.from({ length: 12 }, (_, i) => ({ label: String(i * 5).padStart(2, '0'), ang: i * 30 }));

  const setAndPushAp = (v: 'AM' | 'PM') => { setAp(v); push(h, m, v); };

  return (
    <div className="dtp-pop dtp-pop-end w-[16.5rem]">
      {/* readout */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button type="button" onClick={() => setMode('hour')}
          className={`font-display text-4xl leading-none tracking-tight ${mode === 'hour' ? 'signal' : 'ink'}`}
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
          {String(h).padStart(2, '0')}
        </button>
        <span className="font-display text-4xl leading-none ink">:</span>
        <button type="button" onClick={() => setMode('minute')}
          className={`font-display text-4xl leading-none tracking-tight ${mode === 'minute' ? 'signal' : 'ink'}`}
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
          {String(m).padStart(2, '0')}
        </button>
        <div className="flex flex-col gap-1 ml-1">
          <button type="button" onClick={() => setAndPushAp('AM')} className={`dtp-ap ${ap === 'AM' ? 'dtp-ap-on' : ''}`}>AM</button>
          <button type="button" onClick={() => setAndPushAp('PM')} className={`dtp-ap ${ap === 'PM' ? 'dtp-ap-on' : ''}`}>PM</button>
        </div>
      </div>

      {/* dial */}
      <div
        ref={dialRef}
        className="dtp-dial relative mx-auto touch-none select-none"
        style={{ width: SIZE, height: SIZE }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <svg width={SIZE} height={SIZE} className="absolute inset-0 pointer-events-none">
          <line x1={C} y1={C} x2={handX} y2={handY} stroke="var(--color-signal-deep)" strokeWidth="2" />
          <circle cx={handX} cy={handY} r="15" fill="var(--color-signal)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <circle cx={C} cy={C} r="3" fill="var(--color-ink)" />
        </svg>
        {nums.map((n) => {
          const a = (n.ang * Math.PI) / 180;
          const x = C + NUM_R * Math.sin(a);
          const y = C - NUM_R * Math.cos(a);
          const active = mode === 'hour' ? (h % 12) * 30 === n.ang % 360 : m * 6 === n.ang % 360;
          return (
            <span
              key={n.label}
              className={`absolute mono text-[0.8rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none ${active ? 'ink font-semibold' : 'ink-mute'}`}
              style={{ left: x, top: y }}
            >
              {n.label}
            </span>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="mono ink-faint text-[0.6rem]">{mode === 'hour' ? 'Pick the hour' : 'Pick the minute'}</span>
        <button type="button" onClick={() => { onChange({ h, m, ap }); onDone(); }} className="dtp-set">Set</button>
      </div>
    </div>
  );
}

/* ---------------- glyphs ---------------- */
function CalendarGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="ink-mute shrink-0">
      <rect x="3.5" y="5" width="17" height="16" rx="1" />
      <path d="M3.5 9h17M8 3v4M16 3v4" />
    </svg>
  );
}
function ClockGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" className="ink-mute shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
