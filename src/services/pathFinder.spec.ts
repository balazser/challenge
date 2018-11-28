import { Graph, dijkstra } from './pathFinder'

describe('pathFinder', () => {
  it('should initially fetch all pets', () => {
    const graph: Graph = {
      start: { A: 5, B: 2 },
      A: { C: 4, D: 2 },
      B: { A: 8, D: 7 },
      C: { D: 6, finish: 3 },
      D: { finish: 1 },
      finish: {},
    }
    const result = {
      distance: 8,
      path: ['start', 'A', 'D', 'finish'],
    }

    expect(dijkstra(graph)).toEqual(result)
    console.log('dijkstra', dijkstra(graph))
  })
})
