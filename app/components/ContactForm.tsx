'use client';

import { useState, type FormEvent } from 'react';

type Status = { kind: 'idle' | 'success' | 'error'; message?: string };

// Web3Forms' free plan only accepts submissions from the client (browser).
// The access key is meant to be public, so it ships as a NEXT_PUBLIC_* var.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const CONTACT_FALLBACK = 'Please email us directly at ash@codio.co.in.';

const TIMING = ['As soon as possible', 'Within 30 days', '1 — 3 months', '3 — 6 months', '6 months or later'];

const BUDGET_MIN = 10000; // ₹10k
const BUDGET_MAX = 200000; // ₹2L
const BUDGET_STEP = 10000; // multiples of ₹10k
const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const formatL = (n: number) => {
  const l = n / 100000;
  return `${Number.isInteger(l) ? l : l.toFixed(1)}L`;
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [budget, setBudget] = useState(50000);
  const [timing, setTiming] = useState('');

  const validate = (form: HTMLFormElement) => {
    const errors: Record<string, boolean> = {};
    const required = ['name', 'email', 'message'];
    for (const name of required) {
      const input = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!input) continue;
      const value = (input.value || '').trim();
      if (!value) errors[name] = true;
      if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[name] = true;
      }
    }
    // Phone is optional, but validate the format when it is provided.
    const phone = (form.elements.namedItem('phone') as HTMLInputElement | null)?.value?.trim();
    if (phone && (!/^[+()\-\s\d]{7,20}$/.test(phone) || (phone.match(/\d/g) || []).length < 7)) {
      errors.phone = true;
    }
    setInvalid(errors);
    return Object.keys(errors).length === 0;
  };

  const clearError = (name: string) => {
    if (!invalid[name]) return;
    setInvalid((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) {
      setStatus({ kind: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }
    if (!ACCESS_KEY || ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus({ kind: 'error', message: `The contact form is not configured yet. ${CONTACT_FALLBACK}` });
      return;
    }
    setSending(true);
    setStatus({ kind: 'idle' });
    try {
      // Submit as multipart FormData (a CORS-simple request). Sending JSON
      // would trigger a preflight that Web3Forms' free endpoint rejects.
      const fd = new FormData(form);
      fd.append('access_key', ACCESS_KEY);
      fd.append('subject', `New project enquiry — ${String(fd.get('name') || '').trim() || 'Codio website'}`);
      fd.append('from_name', 'Codio Website');
      const email = String(fd.get('email') || '').trim();
      if (email) fd.append('replyto', email); // replies go straight to the sender

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });

      // Web3Forms returns 200 (an HTML success page) on delivery and a JSON
      // body only on errors — so use the status, not the response body.
      if (res.ok) {
        setStatus({ kind: 'success', message: "Thanks — we'll get back to you within one business day." });
        form.reset();
        setBudget(50000);
        setTiming('');
      } else {
        const data = await res.json().catch(() => ({} as { message?: string }));
        setStatus({ kind: 'error', message: data.message || `Submission failed. ${CONTACT_FALLBACK}` });
      }
    } catch {
      setStatus({
        kind: 'error',
        message: `Something went wrong. ${CONTACT_FALLBACK}`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-1">
      <div className="grid grid-cols-2 gap-x-8 gap-y-1 max-sm:grid-cols-1">
        <Line name="name" label="01 — your name" placeholder="Your full name" invalid={!!invalid.name} onValueChange={() => clearError('name')} required />
        <Line name="email" type="email" label="02 — your email" placeholder="you@company.com" invalid={!!invalid.email} onValueChange={() => clearError('email')} required />
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-1 max-sm:grid-cols-1">
        <Line name="phone" type="tel" label="03 — phone (optional)" placeholder="+91 90000 00000" invalid={!!invalid.phone} onValueChange={() => clearError('phone')} />
        <Line name="company" label="04 — company (optional)" placeholder="Your company" />
      </div>

      {/* Budget — scrolling scale, ₹10k → ₹2L in steps of ₹10k */}
      <fieldset className="field-line hairline-b">
        <label htmlFor="budget-range">05 — budget</label>
        <input type="hidden" name="budget" value={`${formatINR(budget)} (${formatL(budget)})`} />
        <div className="flex items-baseline justify-between pt-2 mb-3">
          <span
            className="font-display text-3xl tracking-tight ink"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
          >
            {formatINR(budget)}
          </span>
          <span className="mono signal">{formatL(budget)}</span>
        </div>
        <input
          id="budget-range"
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          aria-valuetext={formatINR(budget)}
          className="budget-range w-full"
        />
        <div className="flex justify-between mono ink-faint mt-2">
          <span>{formatINR(BUDGET_MIN)}</span>
          <span>{formatINR(BUDGET_MAX)}</span>
        </div>
        <p className="mt-3 flex items-start gap-2 bg-paper-2 border border-[var(--color-rule)] px-3 py-2 mono ink-mute leading-relaxed">
          <span aria-hidden="true" className="signal shrink-0">↔</span>
          <span>Drag the slider to set your budget — in steps of ₹10,000</span>
        </p>
      </fieldset>

      {/* Timing pills */}
      <fieldset className="field-line hairline-b" aria-label="Timeline">
        <span className="field-legend">06 — timeline</span>
        <input type="hidden" name="timing" value={timing} />
        <div role="group" aria-label="Timeline" className="flex flex-wrap gap-2 pt-2">
          {TIMING.map((t) => {
            const active = timing === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTiming(active ? '' : t)}
                className={`px-4 py-1.5 mono border transition-colors ${
                  active
                    ? 'bg-signal border-[var(--color-ink)] ink'
                    : 'bg-transparent border-[var(--color-rule-strong)] ink-mute hover:ink hover:border-[var(--color-ink)]'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className={`field-line ${invalid.message ? 'invalid' : ''}`}>
        <label htmlFor="message">07 — about your project *</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="What are you building? What would make this project a success for you?"
          onChange={() => clearError('message')}
        />
      </div>

      {/* honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="pt-10 flex flex-wrap items-baseline justify-between gap-6">
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? 'Sending…' : 'Send message'}
        </button>
        <span className="mono ink-mute">We reply within one working day</span>
      </div>

      {status.kind !== 'idle' && (
        <div
          role={status.kind === 'error' ? 'alert' : 'status'}
          className={
            status.kind === 'success'
              ? 'mt-8 p-5 border border-[var(--color-ink)] bg-signal ink text-base'
              : 'mt-8 p-5 border text-base'
          }
          style={
            status.kind === 'error'
              ? {
                  borderColor: 'var(--color-warn)',
                  background: 'var(--color-warn-tint)',
                  color: 'var(--color-warn)',
                }
              : undefined
          }
        >
          {status.message}
        </div>
      )}
    </form>
  );
}

function Line({
  name, label, type = 'text', invalid, required, placeholder, onValueChange,
}: {
  name: string;
  label: string;
  type?: string;
  invalid?: boolean;
  required?: boolean;
  placeholder?: string;
  onValueChange?: () => void;
}) {
  return (
    <div className={`field-line ${invalid ? 'invalid' : ''}`}>
      <label htmlFor={name}>{label}{required ? ' *' : ''}</label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={onValueChange}
        inputMode={type === 'tel' ? 'tel' : undefined}
        autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : name === 'phone' ? 'tel' : 'organization'}
      />
    </div>
  );
}
