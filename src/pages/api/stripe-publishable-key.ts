import type { APIRoute } from 'astro';

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || 'http://localhost:3000';
const TENANT_ID = import.meta.env.TENANT_ID || '';

export const GET: APIRoute = async () => {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/stripe/publishable-key?tenant=${TENANT_ID}`);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch Stripe config' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
