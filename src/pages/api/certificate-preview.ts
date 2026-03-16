import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request, locals }) => {
  const PAYLOAD_URL = locals.runtime?.env?.PAYLOAD_URL || import.meta.env.PAYLOAD_URL || 'http://localhost:3000'

  try {
    const incomingUrl = new URL(request.url)
    const previewUrl = new URL(`${PAYLOAD_URL}/api/certificates/preview`)

    for (const [key, value] of incomingUrl.searchParams.entries()) {
      previewUrl.searchParams.set(key, value)
    }

    const res = await fetch(previewUrl.toString())

    if (!res.ok) {
      return new Response('Preview failed', { status: 500 })
    }

    const pdfBuffer = await res.arrayBuffer()

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('certificate preview proxy error:', err)
    return new Response('Preview failed', { status: 500 })
  }
}
