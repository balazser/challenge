import { fetchAll, buildGraph } from './api'

describe('pathFinder', () => {
  it('should find cheapest path', async() => {
    const response = await fetchAll()
    const graph = buildGraph(response.deals)
  })
})
