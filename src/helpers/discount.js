// Discount helpers. Stacking and capping logic is split between this file
// and services/cart.js — which is the point. See README failure mode 4.

import { applyPercent } from "../utils/calc";

export function totalPercentOff(promotions) {
  // Naive sum. The cap is enforced elsewhere. (Yes, that's the smell.)
  return promotions.reduce((acc, p) => acc + p.percentOff, 0);
}

export function discountFor(subtotal, promotions) {
  const percent = totalPercentOff(promotions);
  return applyPercent(subtotal, percent);
}
