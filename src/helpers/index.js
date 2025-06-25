export const priceFormat = (price) =>
    Number(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
