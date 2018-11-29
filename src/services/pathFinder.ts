const findLowestCostNode = (costs: Graph, processed: string[]) => {
  const knownNodes = Object.keys(costs)

  const lowestCostNode = knownNodes.reduce(
    (lowest: string | null, node: string) => {
      if (lowest === null && !processed.includes(node)) {
        lowest = node
      }
      if (costs[node] < costs[lowest as string] && !processed.includes(node)) {
        lowest = node
      }
      return lowest
    },
    null
  )

  return lowestCostNode
}

export type Graph = { [key: string]: { [key: string]: number } }

// function that returns the minimum cost and path to reach Finish
export const dijkstra = (graph, finish: string) => {
  // track lowest cost to reach each node
  const trackedCosts: Graph = Object.assign({ [finish]: Infinity }, graph.start)

  // track paths
  const trackedParents: {[key: string]: string | null } = { [finish]: null }
  for (let child in graph.start) {
    trackedParents[child] = 'start'
  }

  // track nodes that have already been processed
  const processedNodes: string[] = []

  // Set initial node. Pick lowest cost node.
  let node = findLowestCostNode(trackedCosts, processedNodes)

  while (node) {
    let costToReachNode = trackedCosts[node]
    let childrenOfNode = graph[node]

    for (let child in childrenOfNode) {
      let costFromNodetoChild = childrenOfNode[child]
      let costToChild = costToReachNode + costFromNodetoChild

      if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
        trackedCosts[child] = costToChild
        trackedParents[child] = node
      }
    }

    processedNodes.push(node)

    node = findLowestCostNode(trackedCosts, processedNodes)
  }

  let optimalPath = [finish]
  let parent = trackedParents[finish]
  while (parent) {
    optimalPath.push(parent)
    parent = trackedParents[parent]
  }
  optimalPath.reverse()

  const results = {
    distance: trackedCosts[finish],
    path: optimalPath,
  }

  return results
}
