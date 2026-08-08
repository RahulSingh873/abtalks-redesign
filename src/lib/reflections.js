const KEY = "abtalks_reflections";

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveReflection(day, text) {
  if (!text?.trim()) return;
  try {
    const all = readAll();
    all[day] = { text: text.trim(), savedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {}
}

export function getReflection(day) {
  return readAll()[day] || null;
}

export function getMostRecentReflection(beforeDay) {
  const all = readAll();
  const days = Object.keys(all)
    .map(Number)
    .filter((d) => d < beforeDay)
    .sort((a, b) => b - a);
  return days.length ? { day: days[0], ...all[days[0]] } : null;
}