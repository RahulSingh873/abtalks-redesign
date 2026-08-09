const BASE_URL = "https://api.thebreeth.com/v1";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const apiKey = process.env.BREETH_API_KEY;
  if (!apiKey) {
    res.status(200).json({ error: "breeth_not_configured" });
    return;
  }

  const { action, ...body } = req.body || {};
  const path = action === "search" ? "/search" : action === "episode" ? "/episodes" : null;
  if (!path) {
    res.status(400).json({ error: "unknown_action" });
    return;
  }

  try {
    const upstream = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await upstream.json().catch(() => ({}));
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: "upstream_error", message: err.message });
  }
}