const store = new Map<string, { data: Record<string, unknown>; ts: number }>();

const TTL = 30_000; // 30 seconds

export function setPreviewData(slug: string, data: Record<string, unknown>) {
  store.set(slug, { data, ts: Date.now() });
}

export function getPreviewData(slug: string): Record<string, unknown> | null {
  const entry = store.get(slug);
  if (!entry || Date.now() - entry.ts > TTL) {
    store.delete(slug);
    return null;
  }
  return entry.data;
}
