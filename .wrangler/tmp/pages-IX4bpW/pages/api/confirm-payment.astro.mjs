globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const PAYLOAD_URL = "http://localhost:3000";
const TENANT_ID = "698365970695a7eb198f40f9";
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const res = await fetch(`${PAYLOAD_URL}/api/stripe/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        tenantId: TENANT_ID
      })
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Confirm payment error from Payload:", res.status, data);
    }
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Confirm payment proxy failed:", err);
    return new Response(JSON.stringify({ error: "Failed to confirm payment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
