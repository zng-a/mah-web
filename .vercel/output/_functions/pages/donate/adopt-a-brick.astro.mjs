import { e as createComponent, r as renderTemplate, n as defineScriptVars, k as renderComponent, h as createAstro, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_DUCctX1J.mjs';
import 'piccolore';
import { $ as $$Base } from '../../chunks/Base_CVtgPXyw.mjs';
import { $ as $$DonationForm } from '../../chunks/DonationForm_l-ecpdFs.mjs';
import { b as getCampaignBySlug } from '../../chunks/payload_CTOlXju1.mjs';
import { l as lexicalToHtml } from '../../chunks/lexical_DiEAmPbb.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$AdoptABrick = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdoptABrick;
  const campaign = await getCampaignBySlug("adopt-a-brick");
  if (!campaign || !campaign.active) {
    return Astro2.redirect("/donate");
  }
  const PAYLOAD_URL = "http://localhost:3000";
  const TENANT_ID = "698365970695a7eb198f40f9";
  const stripeRes = await fetch(`${PAYLOAD_URL}/api/stripe/publishable-key?tenant=${TENANT_ID}`).then((r) => r.json()).catch(() => ({ publishableKey: "" }));
  const publishableKey = stripeRes?.publishableKey ?? "";
  const pricePerBrick = campaign.fixedUnitConfig?.pricePerUnit || 20;
  const maxQuantity = campaign.fixedUnitConfig?.maxQuantity || 100;
  const descriptionHtml = campaign.description ? lexicalToHtml(campaign.description) : "";
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", `
  // Wait for DOM and donation form to be ready
  document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.querySelector('.donation-form');
    if (!donationForm) return;

    // Find amount buttons in the donation form
    const amountBtns = donationForm.querySelectorAll('.df-amount');

    // Replace amount grid with brick quantity selector
    const amountGrid = donationForm.querySelector('.df-amount-grid');
    if (amountGrid) {
      // Create brick selector HTML
      const brickSelector = \`
        <div class="mb-3">
          <label class="df-label">Number of Bricks</label>
          <div class="grid grid-cols-4 gap-[6px] mb-3">
            \${[1, 5, 10, 25].map((qty, idx) => \`
              <button
                type="button"
                data-brick-qty="\${qty}"
                class="brick-qty-btn font-bold text-[17px] rounded-[14px] h-[52px] transition-all duration-200 \${
                  idx === 0
                    ? 'bg-teal text-white shadow-[0_2px_12px_rgba(68,131,158,0.3)]'
                    : 'bg-navy/[0.04] text-navy hover:bg-navy/[0.08]'
                }"
              >
                \${qty}
              </button>
            \`).join('')}
            <button
              type="button"
              data-brick-qty="custom"
              class="brick-qty-btn bg-navy/[0.04] text-navy font-bold text-[15px] rounded-[14px] h-[52px] hover:bg-navy/[0.08] transition-all duration-200"
            >
              Custom
            </button>
          </div>
          <div id="brick-custom-row" style="display:none;">
            <input
              type="number"
              min="1"
              max="\${maxQuantity}"
              value="1"
              id="brick-quantity"
              class="w-full h-[52px] px-4 rounded-[14px] bg-navy/[0.04] border-2 border-transparent font-bold text-[18px] text-navy focus:border-teal focus:outline-none transition-all mb-3"
              placeholder="Enter quantity"
            />
          </div>
          <p class="text-[14px] text-navy/60">
            £\${pricePerBrick} per brick • Total: <span id="brick-total" class="font-bold text-teal">£\${pricePerBrick}</span>
          </p>
        </div>
      \`;

      // Replace the amount grid with brick selector
      const parentDiv = amountGrid.parentElement;
      if (parentDiv) {
        parentDiv.innerHTML = brickSelector;
      }

      // Set up brick quantity handlers
      setTimeout(() => {
        const brickButtons = donationForm.querySelectorAll('.brick-qty-btn');
        const quantityInput = document.getElementById('brick-quantity');
        const customRow = document.getElementById('brick-custom-row');
        const totalDisplay = document.getElementById('brick-total');

        function updateBrickAmount(quantity) {
          const amount = quantity * pricePerBrick;
          if (totalDisplay) totalDisplay.textContent = \`£\${amount}\`;

          // Update button states
          brickButtons.forEach(btn => {
            const isActive = btn.dataset.brickQty == quantity || (btn.dataset.brickQty === 'custom' && customRow?.style.display !== 'none');
            if (isActive) {
              btn.classList.remove('bg-navy/[0.04]', 'text-navy', 'hover:bg-navy/[0.08]');
              btn.classList.add('bg-teal', 'text-white', 'shadow-[0_2px_12px_rgba(68,131,158,0.3)]');
            } else {
              btn.classList.remove('bg-teal', 'text-white', 'shadow-[0_2px_12px_rgba(68,131,158,0.3)]');
              btn.classList.add('bg-navy/[0.04]', 'text-navy', 'hover:bg-navy/[0.08]');
            }
          });

          // Update form campaign metadata
          donationForm.setAttribute('data-campaign-quantity', quantity.toString());

          // Dispatch event to update the donation form
          donationForm.dispatchEvent(new CustomEvent('campaign-amount-update', {
            detail: { amount, quantity },
            bubbles: true
          }));
        }

        // Button click handlers
        brickButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            const qtyValue = btn.dataset.brickQty;

            if (qtyValue === 'custom') {
              // Show custom input
              if (customRow) customRow.style.display = '';
              setTimeout(() => quantityInput?.focus(), 50);

              // Update to current input value or default to 1
              const currentQty = parseInt(quantityInput?.value || '1');
              updateBrickAmount(currentQty);
            } else {
              // Hide custom input
              if (customRow) customRow.style.display = 'none';

              // Set quantity from button
              const qty = parseInt(qtyValue);
              if (quantityInput) quantityInput.value = qty.toString();
              updateBrickAmount(qty);
            }
          });
        });

        // Custom input handler
        if (quantityInput) {
          quantityInput.addEventListener('input', () => {
            const qty = Math.max(1, parseInt(quantityInput.value) || 1);
            updateBrickAmount(qty);
          });
        }

        // Initialize with 1 brick
        updateBrickAmount(1);
      }, 100);
    }
  });
})();</script>`], ["", " <script>(function(){", `
  // Wait for DOM and donation form to be ready
  document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.querySelector('.donation-form');
    if (!donationForm) return;

    // Find amount buttons in the donation form
    const amountBtns = donationForm.querySelectorAll('.df-amount');

    // Replace amount grid with brick quantity selector
    const amountGrid = donationForm.querySelector('.df-amount-grid');
    if (amountGrid) {
      // Create brick selector HTML
      const brickSelector = \\\`
        <div class="mb-3">
          <label class="df-label">Number of Bricks</label>
          <div class="grid grid-cols-4 gap-[6px] mb-3">
            \\\${[1, 5, 10, 25].map((qty, idx) => \\\`
              <button
                type="button"
                data-brick-qty="\\\${qty}"
                class="brick-qty-btn font-bold text-[17px] rounded-[14px] h-[52px] transition-all duration-200 \\\${
                  idx === 0
                    ? 'bg-teal text-white shadow-[0_2px_12px_rgba(68,131,158,0.3)]'
                    : 'bg-navy/[0.04] text-navy hover:bg-navy/[0.08]'
                }"
              >
                \\\${qty}
              </button>
            \\\`).join('')}
            <button
              type="button"
              data-brick-qty="custom"
              class="brick-qty-btn bg-navy/[0.04] text-navy font-bold text-[15px] rounded-[14px] h-[52px] hover:bg-navy/[0.08] transition-all duration-200"
            >
              Custom
            </button>
          </div>
          <div id="brick-custom-row" style="display:none;">
            <input
              type="number"
              min="1"
              max="\\\${maxQuantity}"
              value="1"
              id="brick-quantity"
              class="w-full h-[52px] px-4 rounded-[14px] bg-navy/[0.04] border-2 border-transparent font-bold text-[18px] text-navy focus:border-teal focus:outline-none transition-all mb-3"
              placeholder="Enter quantity"
            />
          </div>
          <p class="text-[14px] text-navy/60">
            £\\\${pricePerBrick} per brick • Total: <span id="brick-total" class="font-bold text-teal">£\\\${pricePerBrick}</span>
          </p>
        </div>
      \\\`;

      // Replace the amount grid with brick selector
      const parentDiv = amountGrid.parentElement;
      if (parentDiv) {
        parentDiv.innerHTML = brickSelector;
      }

      // Set up brick quantity handlers
      setTimeout(() => {
        const brickButtons = donationForm.querySelectorAll('.brick-qty-btn');
        const quantityInput = document.getElementById('brick-quantity');
        const customRow = document.getElementById('brick-custom-row');
        const totalDisplay = document.getElementById('brick-total');

        function updateBrickAmount(quantity) {
          const amount = quantity * pricePerBrick;
          if (totalDisplay) totalDisplay.textContent = \\\`£\\\${amount}\\\`;

          // Update button states
          brickButtons.forEach(btn => {
            const isActive = btn.dataset.brickQty == quantity || (btn.dataset.brickQty === 'custom' && customRow?.style.display !== 'none');
            if (isActive) {
              btn.classList.remove('bg-navy/[0.04]', 'text-navy', 'hover:bg-navy/[0.08]');
              btn.classList.add('bg-teal', 'text-white', 'shadow-[0_2px_12px_rgba(68,131,158,0.3)]');
            } else {
              btn.classList.remove('bg-teal', 'text-white', 'shadow-[0_2px_12px_rgba(68,131,158,0.3)]');
              btn.classList.add('bg-navy/[0.04]', 'text-navy', 'hover:bg-navy/[0.08]');
            }
          });

          // Update form campaign metadata
          donationForm.setAttribute('data-campaign-quantity', quantity.toString());

          // Dispatch event to update the donation form
          donationForm.dispatchEvent(new CustomEvent('campaign-amount-update', {
            detail: { amount, quantity },
            bubbles: true
          }));
        }

        // Button click handlers
        brickButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            const qtyValue = btn.dataset.brickQty;

            if (qtyValue === 'custom') {
              // Show custom input
              if (customRow) customRow.style.display = '';
              setTimeout(() => quantityInput?.focus(), 50);

              // Update to current input value or default to 1
              const currentQty = parseInt(quantityInput?.value || '1');
              updateBrickAmount(currentQty);
            } else {
              // Hide custom input
              if (customRow) customRow.style.display = 'none';

              // Set quantity from button
              const qty = parseInt(qtyValue);
              if (quantityInput) quantityInput.value = qty.toString();
              updateBrickAmount(qty);
            }
          });
        });

        // Custom input handler
        if (quantityInput) {
          quantityInput.addEventListener('input', () => {
            const qty = Math.max(1, parseInt(quantityInput.value) || 1);
            updateBrickAmount(qty);
          });
        }

        // Initialize with 1 brick
        updateBrickAmount(1);
      }, 100);
    }
  });
})();</script>`])), renderComponent($$result, "Base", $$Base, { "title": campaign.name }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="px-5 md:px-10 py-4"> <div class="flex items-center gap-3 text-[13px] md:text-[14px]"> <a href="/donate" class="inline-flex items-center gap-2 text-teal hover:text-navy transition-colors font-medium"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path> </svg> <span>Back</span> </a> <span class="text-muted">/</span> <a href="/donate" class="text-teal hover:text-navy transition-colors font-medium">Donate</a> <span class="text-muted">/</span> <span class="text-navy">${campaign.name}</span> </div> </div> <div class="max-w-[1200px] mx-auto px-5 md:px-10 py-12"> <div class="text-center mb-8"> <h1 class="text-navy text-[32px] md:text-[38px] font-bold mb-3">${campaign.name}</h1> ${descriptionHtml ? renderTemplate`<div class="text-[15px] md:text-[16px] text-muted max-w-[680px] mx-auto">${unescapeHTML(descriptionHtml)}</div>` : renderTemplate`<p class="text-[15px] md:text-[16px] text-muted max-w-[680px] mx-auto">
Leave a lasting legacy by sponsoring bricks for our new masjid building.
          Each brick represents your contribution to this blessed project.
</p>`} </div> <div class="max-w-[900px] mx-auto">  <div class="flex flex-wrap items-center justify-center gap-2 mb-6"> ${[
    "One-time payment",
    "Lasting legacy",
    "Gift Aid eligible",
    "Secure payment"
  ].map((feature) => renderTemplate`<div class="inline-flex items-center gap-1.5 bg-teal/[0.08] border border-teal/20 rounded-full px-3 md:px-4 py-1.5 text-[12px] md:text-[13px] font-medium text-navy"> <svg class="w-3.5 h-3.5 text-teal shrink-0" fill="currentColor" viewBox="0 0 16 16"> <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path> </svg> <span>${feature}</span> </div>`)} </div> <!-- Integrated brick selector within the donation flow --> <div class="mb-6"> ${renderComponent($$result2, "DonationForm", $$DonationForm, { "block": {
    heading: "Adopt Your Bricks",
    description: `£${pricePerBrick} per brick`,
    funds: campaign.fund ? [campaign.fund] : [],
    amounts: [pricePerBrick].map((v) => ({ value: v })),
    frequencies: [{ label: "One-off", value: "one-off" }],
    style: "card",
    publishableKey,
    campaign,
    campaignType: "fixed-unit",
    hideFundSelector: true,
    hideFrequencySelector: true
  } })} </div> </div> </div> ` }), defineScriptVars({ pricePerBrick, maxQuantity }));
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/adopt-a-brick.astro", void 0);
const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/adopt-a-brick.astro";
const $$url = "/donate/adopt-a-brick";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AdoptABrick,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
