// Small hand-drawn style SVG icons. Chunky outlines to match the HUD.
const S = (body, vb = '0 0 24 24') =>
  `<svg class="ico" viewBox="${vb}" aria-hidden="true" fill="none" stroke="#4a3b33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const ICON = {
  leaf: S('<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" fill="#6cc04a"/><path d="M5 19l8-8"/>'),
  book: S('<path d="M4 5c3-1 6-1 8 1v14c-2-2-5-2-8-1z" fill="#3fa7b8"/><path d="M20 5c-3-1-6-1-8 1v14c2-2 5-2 8-1z" fill="#6fc6d4"/>'),
  journal: S('<rect x="5" y="3" width="14" height="18" rx="2.5" fill="#e5483b"/><path d="M9 3v18" /><path d="M12 8h4M12 11h4"/>'),
  dumbbell: S('<path d="M7 12h10"/><rect x="3" y="8" width="4" height="8" rx="1.2" fill="#e5483b"/><rect x="17" y="8" width="4" height="8" rx="1.2" fill="#e5483b"/>'),
  shoe: S('<path d="M3 16c0-3 1-7 3-9l3 2c2 2 4 3 8 4 2 .5 4 1.5 4 3v1H3z" fill="#3fa7b8"/><path d="M3 17h18"/>'),
  pan: S('<circle cx="10" cy="13" r="6" fill="#4a4f5a"/><path d="M16 13h6"/><circle cx="10" cy="13" r="2.4" fill="#ffd23f" stroke="none"/>'),
  hammer: S('<path d="M13 9l-8 8 2 2 8-8" fill="#c98f55"/><path d="M12 5l3-2 6 6-2 3z" fill="#a7a39a"/>'),
  sun: S('<circle cx="12" cy="12" r="4.5" fill="#ffd23f"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/>'),
  sunset: S('<path d="M6 16a6 6 0 0112 0z" fill="#ff9f5a"/><path d="M3 16h18M12 4v3M5 8l1.5 1.5M19 8l-1.5 1.5"/>'),
  moon: S('<path d="M19 15A8 8 0 019 5a7 7 0 1010 10z" fill="#f6e7a8"/>'),
  lock: S('<rect x="5" y="11" width="14" height="10" rx="2" fill="#c7c0b3"/><path d="M8 11V8a4 4 0 018 0v3"/>'),
  check: S('<path d="M5 12.5l4.5 4.5L19 7" stroke-width="3"/>'),
};

export const leafAmt = (n) => `<span class="amt">${ICON.leaf}${n}</span>`;
