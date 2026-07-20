export function getDiscountPercent(price: number, originalPrice: number) {
  if (originalPrice <= 0 || price >= originalPrice) return 0
  return Math.round((1 - price / originalPrice) * 100)
}

export function formatInr(amount: number) {
  return `\u20B9${amount.toLocaleString('en-IN')}`
}
