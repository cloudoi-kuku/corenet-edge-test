/**
 * Example edge route: reads API_KEY from runtime env (set in CoreNet Site Settings).
 * The browser calls /api/proxy; the secret never leaves the server.
 */
module.exports = async function (context, req) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    context.res = {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
      body: {
        error: 'API_KEY not configured',
        hint: 'Add API_KEY under Site Settings → Environment Variables, then redeploy.',
        route: '/api/proxy',
      },
    };
    return;
  }

  // Demo: use the secret server-side only (never return it to the client).
  const upstreamUrl = process.env.PROXY_UPSTREAM_URL || 'https://httpbin.org/bearer';
  let upstreamStatus = null;
  let upstreamSnippet = null;

  try {
    const response = await fetch(upstreamUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    upstreamStatus = response.status;
    const text = await response.text();
    upstreamSnippet = text.length > 200 ? `${text.slice(0, 200)}…` : text;
  } catch (err) {
    context.log.warn('Upstream request failed:', err.message);
  }

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      message: 'Proxy route used server-side API_KEY (value not exposed)',
      route: '/api/proxy',
      secretConfigured: true,
      upstream: upstreamUrl,
      upstreamStatus,
      upstreamSnippet,
      timestamp: new Date().toISOString(),
    },
  };
};