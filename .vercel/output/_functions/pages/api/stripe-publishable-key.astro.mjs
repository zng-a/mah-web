export { renderers } from '../../renderers.mjs';

const PAYLOAD_URL = "http://localhost:3000";
const TENANT_ID = "698365970695a7eb198f40f9";
const GET = async () => {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/stripe/publishable-key?tenant=${TENANT_ID}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch Stripe config" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
