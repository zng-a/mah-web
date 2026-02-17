import type { AstroGlobal } from 'astro';
import { setRuntimeConfig } from './payload';

/**
 * Initialize runtime environment variables for Cloudflare Workers.
 * Call this at the top of every page that uses the Payload API.
 */
export function initRuntimeEnv(Astro: AstroGlobal) {
  // Cloudflare Workers env can be accessed via locals.runtime.env
  const env = Astro.locals.runtime?.env;

  if (env) {
    setRuntimeConfig({
      PAYLOAD_URL: env.PAYLOAD_URL,
      TENANT_ID: env.TENANT_ID,
    });
  }
}
