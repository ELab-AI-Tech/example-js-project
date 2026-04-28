// "Service" that ties calc + discount together. Boundary is fuzzy.
// Demo target for Failure mode 4 — refactor toward a deep pricing module.

import { sumLineSubtotals, round2 } from "../utils/calc";
import { discountFor } from "../helpers/discount";

export function computeOrderTotal(order) {
  const subtotal = sumLineSubtotals(order.lines);
  const discount = discountFor(subtotal, order.appliedPromotions);
  // No cap is enforced. A future "loyalty discount that caps at 30%" change
  // would have to touch this file, helpers/discount.js, and probably calc.js.
  return {
    subtotal: round2(subtotal),
    discountTotal: round2(discount),
    finalPrice: round2(subtotal - discount - order.creditedAmount),
  };
}
