export function formatCurrency(price_cents) {
  return (Math.round(price_cents) / 100).toFixed(2);
}
