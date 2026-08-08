const BASE_URL = "https://api.thebreeth.com/v1";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405 });
  }

  const apiKey = process.env.BREETH_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "breeth_not_configured" }), { status: 200 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), { status: 400 });
  }

  const { action, ...body } = payload;
  const path = action === "search" ? "/search" : action === "episode" ? "/episodes" : null;
  if (!path) {
    return new Response(JSON.stringify({ error: "unknown_action" }), { status: 400 });
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "upstream_error", message: err.message }), {
      status: 502,
    });
  }
};

export const config = {
  path: "/api/breeth",
};