export const currencySign = (iso: string) => {
  if (iso.toLocaleLowerCase() === 'eur') {
    return '€'
  }
  throw new Error('currency map must be defined')
}
