// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_astro/*",
    "/.DS_Store",
    "/favicon.ico",
    "/favicon.svg",
    "/images/courage-carry-islam.png",
    "/images/elm-courses.png",
    "/images/gift-aid-logo.png",
    "/images/hero.jpeg",
    "/images/logo-white.png",
    "/images/logo.png",
    "/images/quran-revision.png",
    "/images/section-bg.png"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/ameen/Development/masjidco-web/tenants/mah/.wrangler/tmp/pages-IX4bpW/bundledWorker-0.5755693563003421.mjs";
import { isRoutingRuleMatch } from "/Users/ameen/Development/masjidco-web/tenants/mah/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/Users/ameen/Development/masjidco-web/tenants/mah/.wrangler/tmp/pages-IX4bpW/bundledWorker-0.5755693563003421.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=spdu7kv83p.js.map
