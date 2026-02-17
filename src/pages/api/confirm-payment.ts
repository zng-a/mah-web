import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const PAYLOAD_URL = locals.runtime?.env?.PAYLOAD_URL || import.meta.env.PAYLOAD_URL || 'http://localhost:3000';
  const TENANT_ID = locals.runtime?.env?.TENANT_ID || import.meta.env.TENANT_ID || '';

  try {
    const body = await request.json();

    const res = await fetch(`${PAYLOAD_URL}/api/stripe/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        tenantId: TENANT_ID,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Confirm payment error from Payload:', res.status, data);
    }

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Confirm payment proxy failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to confirm payment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
