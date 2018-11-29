import { Duration as Dur } from 'luxon'
import * as fp from 'lodash/fp'
import { Graph, dijkstra } from './pathFinder'
import { Deal, PathsResponse } from './dtos/PathsResponse'
const response = require('./response')

const applyDiscount = (discount: number, price: number) => {
  return price - price * (discount / 100)
}

const getDuration = (d: Deal) =>
  Dur.fromObject({
    hours: parseInt(d.duration.h),
    minutes: parseInt(d.duration.m),
  })

const groupByDeparture = fp.groupBy<Deal>('departure')

const findFastestDeal = fp.minBy(getDuration)
// const findCheapestDeal = fp.minBy(fp.prop('cost'))

const findCheapestDeal = fp.minBy<Deal>(d =>
  applyDiscount(fp.propOr(0, 'discount', d), d.cost)
)

const reduceDeals = (
  fn: (deal: ReadonlyArray<Deal>) => Deal | undefined,
  deals: ReadonlyArray<Deal>
) => {
  const groupsDeparture = groupByDeparture(deals)

  // cheapest
  const reducedGroups = Object.values(groupsDeparture).map(d => {
    const groupsArrival = fp.groupBy<Deal>('arrival', d)
    return Object.values(groupsArrival).map(a => {
      if (a.length < 2) {
        return a
      }

      // + if there are more for same price find fastest
      return fn(a)
    })
  })
  return fp.flatten(reducedGroups)
}

export const findBestDeals = (
  from: string,
  to: string,
  deals: ReadonlyArray<Deal>
): ReadonlyArray<Deal> => {
  const graph = buildGraph(deals)

  const result = dijkstra(
    Object.assign(graph, {
      start: graph[from],
    }),
    to
  )

  const lines = fp.zip(result.path, result.path.slice(1)).slice(0, -1)
  return lines.map<Deal>(
    l => deals.find(r => r.departure === l[0] && r.arrival === l[1]) as Deal
  )
}

export const findCheapestPath = (from: string, to: string): Promise<any> => {
  const paths = response as PathsResponse
  const reducedDeals: ReadonlyArray<Deal> = reduceDeals(
    findCheapestDeal,
    paths.deals
  ) as any

  return Promise.resolve({
    currency: paths.currency,
    deals: findBestDeals(from, to, reducedDeals),
  })
}

export const findFastestPath = (from: string, to: string): Promise<any> => {
  const paths = response as PathsResponse
  const reducedDeals: ReadonlyArray<Deal> = reduceDeals(
    findFastestDeal,
    paths.deals
  ) as any

  return Promise.resolve({
    currency: paths.currency,
    deals: findBestDeals(from, to, reducedDeals),
  })
}

export const buildGraph = (v: ReadonlyArray<Deal>) => {
  const mapped = Object.entries(groupByDeparture(v)).map(([k, v]) => {
    return {
      [k]: fp.mergeAll(
        v.map(d => {
          return { [fp.prop('arrival', d)]: d.cost }
        })
      ),
    }
  })
  return fp.mergeAll(mapped)
}
