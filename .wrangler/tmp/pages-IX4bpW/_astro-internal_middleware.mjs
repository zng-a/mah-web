globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_s4D8nt6C.mjs';
import './chunks/astro/server_M2etQWHN.mjs';
import { s as sequence } from './chunks/index_BE0X2gnN.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
