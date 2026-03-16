import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, locals }) => {
  const PAYLOAD_URL = locals.runtime?.env?.PAYLOAD_URL || import.meta.env.PAYLOAD_URL || 'http://localhost:3000'
  const TENANT_ID = locals.runtime?.env?.TENANT_ID || import.meta.env.TENANT_ID || ''

  try {
    const { id } = params
    if (!id) {
      return new Response('Certificate ID required', { status: 400 })
    }

    const res = await fetch(
      `${PAYLOAD_URL}/api/certificates/download/${id}?tenant=${TENANT_ID}`,
    )

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Not found' }))
      return new Response(JSON.stringify(err), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const pdfBuffer = await res.arrayBuffer()
    const contentDisposition = res.headers.get('Content-Disposition') ?? 'attachment; filename="certificate.pdf"'

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': contentDisposition,
      },
    })
  } catch (err) {
    console.error('certificate download proxy error:', err)
    return new Response('Download failed', { status: 500 })
  }
}
