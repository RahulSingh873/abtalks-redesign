// Thin client for Breeth's REST API (https://docs.thebreeth.com).
// Breeth is the hackathon's sponsored memory layer: we write a short prose
// "episode" every time a student completes a day, and read it back on the
// dashboard so progress survives a refresh / a new device / a judge
// revisiting the deployed link — without standing up our own database.
//
// Set VITE_BREETH_API_KEY in a local .env file (never commit it).
// If the key is missing, every call resolves to a harmless no-op so the
// rest of the app keeps working with purely local/mock data.

const BASE_URL = "https://api.thebreeth.com/v1";
const API_KEY = import.meta.env.VITE_BREETH_API_KEY;

export const breethEnabled = Boolean(API_KEY);

async function request(path, body) {
  if (!API_KEY) {
    return { ok: false, disabled: true };
  }
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      return { ok: false, error: errBody.error || res.status, message: errBody.message };
    }
    return await res.json();
  } catch (err) {
    return { ok: false, error: "network_error", message: err.message };
  }
}

export function writeEpisode(content, { groupId = "default", extractIntent = false } = {}) {
  return request("/episodes", {
    content,
    group_id: groupId,
    source_description: "abtalks-web",
    extract_intent: extractIntent,
  });
}

export function searchMemory(query, { groupId = "default", limit = 10 } = {}) {
  return request("/search", { query, group_id: groupId, limit });
}

export function groupIdFor(student) {
  return `abtalks-${student.github || student.name.replace(/\s+/g, "-").toLowerCase()}`;
}