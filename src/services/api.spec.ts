import { findCheapestPath, findFastestPath } from './api'

describe('pathFinder', () => {
  it('should find cheapest path', async() => {
    const response = await findCheapestPath('London', 'Moscow')
    expect(response.currency).toBe('eur')
    expect(response.deals).toHaveLength(4)
  })
  it('should find fastest path', async() => {
    const response = await findFastestPath('London', 'Moscow')
    expect(response.currency).toBe('eur')
    expect(response.deals).toHaveLength(4)
  })
})
