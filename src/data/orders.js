// Reminder for contributors: a "credit" is the term for any partial or full
// reversal of a captured transaction. Do not introduce "refund", "void", or
// "reversal" anywhere in this codebase.
//
// Order shape:
//   { id, customerId, placedOn, status, lines, appliedPromotions, creditedAmount }
// Status: "pending" | "fulfilled" | "credited"
// Line:   { sku, description, unitPrice, quantity }
// Promo:  { id, label, percentOff }

export const orders = [
  {
    id: "ord_1001",
    customerId: "u_001",
    placedOn: "2026-04-02",
    status: "fulfilled",
    lines: [
      { sku: "BK-001", description: "Notebook A5", unitPrice: 12, quantity: 2 },
      { sku: "PN-014", description: "Fineliner pack", unitPrice: 9, quantity: 1 },
    ],
    appliedPromotions: [{ id: "promo_spring", label: "Spring 10%", percentOff: 10 }],
    creditedAmount: 0,
  },
  {
    id: "ord_1002",
    customerId: "u_003",
    placedOn: "2026-04-11",
    status: "credited",
    lines: [{ sku: "BG-002", description: "Canvas tote", unitPrice: 24, quantity: 1 }],
    appliedPromotions: [],
    creditedAmount: 24,
  },
  {
    id: "ord_1003",
    customerId: "u_002",
    placedOn: "2026-04-18",
    status: "pending",
    lines: [{ sku: "DK-009", description: "Standing desk mat", unitPrice: 79, quantity: 1 }],
    appliedPromotions: [{ id: "promo_loyal", label: "Loyalty 5%", percentOff: 5 }],
    creditedAmount: 0,
  },
  {
    id: "ord_1004",
    customerId: "u_004",
    placedOn: "2026-04-22",
    status: "fulfilled",
    lines: [
      { sku: "MS-101", description: "Wireless mouse", unitPrice: 45, quantity: 1 },
      { sku: "KB-077", description: "Mechanical keyboard", unitPrice: 140, quantity: 1 },
    ],
    appliedPromotions: [
      { id: "promo_spring", label: "Spring 10%", percentOff: 10 },
      { id: "promo_bundle", label: "Bundle 5%", percentOff: 5 },
    ],
    creditedAmount: 0,
  },
];
