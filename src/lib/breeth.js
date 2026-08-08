const PROXY_URL = "/api/breeth";

async function request(action, body) {
  try {
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...body }),
    });
    const data = await res.json().catch(() => ({}));
    if (data?.error === "breeth_not_configured") {
      return { ok: false, disabled: true };
    }
    if (!res.ok) {
      return { ok: false, error: data.error || res.status, message: data.message };
    }
    return { ok: true, ...data };
  } catch (err) {
    return { ok: false, error: "network_error", message: err.message };
  }
}

export function writeEpisode(content, { groupId = "default", extractIntent = false } = {}) {
  return request("episode", {
    content,
    group_id: groupId,
    source_description: "abtalks-web",
    extract_intent: extractIntent,
  });
}

export function searchMemory(query, { groupId = "default", limit = 10 } = {}) {
  return request("search", { query, group_id: groupId, limit });
}

export function groupIdFor(student) {
  return `abtalks-${student.github || student.name.replace(/\s+/g, "-").toLowerCase()}`;
}