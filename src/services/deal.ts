import { Deal } from './dtos/PathsResponse'

export const applyDiscount = (discount: number, price: number) => {
  return price - price * (discount / 100)
}

export const hasDiscount = (deal: Deal) => {
  return deal.discount > 0
}
