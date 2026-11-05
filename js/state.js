// All state lives in localStorage on this device. No accounts, no sync.
const KEY = 'island-mentor-v1';

const fresh = () => ({
  version: 1,
  creatureName: 'Pip',
  energy: 0,
  built: [],     // [{ id, ts }]
  lessons: [],   // [{ id, cat, answer, ts }]
  skipped: [],   // lesson ids skipped (shown again later, after unseen ones)
  logs: [],      // [{ kind, note, ts }]
  createdAt: Date.now(),
});

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch (e) { /* storage unavailable — run in memory */ }
  return fresh();
}

export function save(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
}

export function reset() {
  try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  return fresh();
}

export const dayKey = (ts) => {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

// Consecutive days (ending today or yesterday) with any lesson or log.
// Only ever shown when it's > 1 — never as a broken streak.
export function rhythm(s) {
  const days = new Set([...s.lessons, ...s.logs].map((e) => dayKey(e.ts)));
  let n = 0;
  const d = new Date();
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
