import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Dx2RyJf4.mjs';
import { manifest } from './manifest_2TP7P5H8.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/confirm-payment.astro.mjs');
const _page3 = () => import('./pages/api/create-checkout-session.astro.mjs');
const _page4 = () => import('./pages/api/stripe-publishable-key.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/donate/adopt-a-brick.astro.mjs');
const _page7 = () => import('./pages/donate/cancel.astro.mjs');
const _page8 = () => import('./pages/donate/complete.astro.mjs');
const _page9 = () => import('./pages/donate/ramadan-giving.astro.mjs');
const _page10 = () => import('./pages/donate/success.astro.mjs');
const _page11 = () => import('./pages/donate/thousand-twelve.astro.mjs');
const _page12 = () => import('./pages/donate.astro.mjs');
const _page13 = () => import('./pages/mobile.astro.mjs');
const _page14 = () => import('./pages/mobile-donate.astro.mjs');
const _page15 = () => import('./pages/news-mobile.astro.mjs');
const _page16 = () => import('./pages/salah-times.astro.mjs');
const _page17 = () => import('./pages/services.astro.mjs');
const _page18 = () => import('./pages/index.astro.mjs');
const _page19 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/confirm-payment.ts", _page2],
    ["src/pages/api/create-checkout-session.ts", _page3],
    ["src/pages/api/stripe-publishable-key.ts", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/donate/adopt-a-brick.astro", _page6],
    ["src/pages/donate/cancel.astro", _page7],
    ["src/pages/donate/complete.astro", _page8],
    ["src/pages/donate/ramadan-giving.astro", _page9],
    ["src/pages/donate/success.astro", _page10],
    ["src/pages/donate/thousand-twelve.astro", _page11],
    ["src/pages/donate/index.astro", _page12],
    ["src/pages/mobile.astro", _page13],
    ["src/pages/mobile-donate.astro", _page14],
    ["src/pages/news-mobile.astro", _page15],
    ["src/pages/salah-times.astro", _page16],
    ["src/pages/services.astro", _page17],
    ["src/pages/index.astro", _page18],
    ["src/pages/[...slug].astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d3455648-efb3-487c-9ca1-2564cd3c85d2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
