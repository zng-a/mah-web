#!/bin/bash
# Cloudflare Pages deployment script
npm run build
npx wrangler pages deploy dist --project-name=mah-web
