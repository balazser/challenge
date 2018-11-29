import { findCheapestPath, buildGraph, findFastestPath } from './api'

describe('pathFinder', () => {
  it('should find cheapest path', async() => {
    const response = await findCheapestPath('London', 'Moscow')
  })
  it('should find fastest path', async() => {
    const response = await findFastestPath('London', 'Moscow')
  })
})
