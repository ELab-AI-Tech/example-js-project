// Tiny utility helpers. Some pricing logic lives here. Some lives in helpers/discount.
// Some lives in services/cart. (Yes — this is on purpose. See README failure mode 4.)

export function sumLineSubtotals(lines) {
  return lines.reduce((acc, l) => acc + l.unitPrice * l.quantity, 0);
}

export function round2(n) {
  return Math.round(n * 100) / 100;
}

export function applyPercent(amount, percent) {
  return amount * (percent / 100);
}
