const KEY = "abtalks_prompt_vault";

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
}

export function getPrompts() {
  return readAll().sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
}

export function savePrompt({ title, text, day }) {
  if (!text?.trim()) return null;
  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: title?.trim() || "Untitled prompt",
    text: text.trim(),
    day: day || null,
    savedAt: new Date().toISOString(),
  };
  const all = readAll();
  all.push(item);
  writeAll(all);
  return item;
}

export function deletePrompt(id) {
  writeAll(readAll().filter((p) => p.id !== id));
}