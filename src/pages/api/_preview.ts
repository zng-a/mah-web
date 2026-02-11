import type { APIRoute } from 'astro';
import { setPreviewData } from '../../lib/preview-store';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const slug = (data.slug as string) || 'home';
  setPreviewData(slug, data);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
