
import PriorityQueue from './FastPriorityQueue.js'
import BitSet from './TypedFastBitSet.js'

/*
Utility class to help extend CellGrids with new API
*/
class GridBuilder {
  constructor(oldGrid) {
    if (!oldGrid.baseCell)
      throw new Error("Invalid CellGrid. baseCell property required.")

    // create copy of the old grid (only enumerable props are copied!)
    // setting prototype is also possible but less performant
    this.grid = new oldGrid.constructor()
    Object.assign(this.grid,  oldGrid)

    // replace baseCell with another using the extended API
    this.grid.baseCell = new oldGrid.baseCell.constructor()
    Object.assign(this.grid.baseCell, oldGrid.baseCell)

    // replace maps with new object
    this.grid.maps = { ...oldGrid.maps }

    // replace flags with new object
    this.grid.maps = { ...oldGrid.flags }
  }

  // Add generic cell property (function getter)
  addCellProp(propName, f) {
    // register new property accessor of type Id => Any
    if (Object.keys(this.grid.baseCell).includes(propName))
      throw new Error(`${propName} already registered`)

    Object.defineProperty(this.grid.baseCell, propName, {
        enumerable: true,
        get: f,
    })
    return this
  }

  // register new bitset for the grid and add it to the cell as prop
  // initialized by iterable returning cellIds where the flag is true
  addCellFlag(flagName, iterable) {
    if (this.grid.flags[flagName])
      throw new Error(`Flag ${flagName} is already exist in grid.`)
    this.grid.flags[flagName] = new BitSet(iterable)
    f = function() { return this.grid.flags[flagName].has(this.id)}
    this.addCellProp(flagName, Object.bind(f, this.grid.baseCell))
    return this
  }

  // Register indexed map for cells.
  // mapArray must be indexable by CellId
  addCellMap(mapName, mapArray) {
    this.grid.maps[mapName] = mapArray
    this.grid.addCellProp(mapName, cid => this.grid.maps[mapName][cid])
    return this
  }

  // after modifying the grid make it immutable with freeze. eg:
  // const newCellGrid = new GridBuilder(oldCellGrid)
  //    .addCellProp('road', getRoadFunction)
  //    .addCellFlag('hasRoad')
  //    .addCellFlag('hasCrossings')
  //    .freeze()
  freeze() {
    Object.freeze(this.grid.flags)
    Object.freeze(this.grid.maps)
    Object.freeze(this.grid.baseCell)
    return Object.freeze(this.grid)
  }
}

export class AbstractCellGrid {
  constructor() {
    this.baseCell = new BaseCell(this)
    this.maps = {}
  }

  getMap(mapName) {
    if (!this.maps[mapName]) throw new Error(`Unknown map ${mapName} in Grid`)
    return this.maps[mapName]
  }

  mapOn(mapName, f) {
    return this.maps[mapName].map(f)
  }

  // access cell by id/reference
  cell(id) {
    return Object.create(this.baseCell, { id: { value: id, enumerable: true } })
  }

  // find cell by coordinate
  cellAt(x, y) {
    throw new Error('cellAt not implemented!')
  }

  // find neighboring cells of a given cell
  // Cell can be an object or an id.
  // returns an iterable
  neighborsOf(cell) {
    if (typeof cell !== 'number') id = cell.id
    throw new Error('neighborsOf not implemented!')
  }

  // Iterate along rings around a specific cell,
  // starting with ring0 which is the cell itself.
  // Cell can be an object or an id.
  // iteration stops after max rings.
  // next(true) can be called to skip the previous cell's neighbors
  * rings(cell, max=3) {  // -> Iterator<Iterator<Cell>>
    if (typeof cell === 'number') cell = this.cell(cell)
    let cells = new Set(cell)
    let prevCells = new Set()
    for (ring = 0; ring < max; ring++) {
      let nextCells = new Set()
      for (c of cells) {
        const ret = yield { ring, cell: c }
        if (! ret)
          for (c of this.neighborsOf(cell))
            if (! (prevCells.has(c) || cells.has(c)))
              nextCells.add(c)
      }
      prevCells = cells
      cells = nextCells
    }
  }

  // find best cell based on a weight function w.
  // w has a type: Cell => Comparable<T>
  findBestAt(w){
    return cell => { throw new Error('TODO') }
  }
  // find chain of cells from source to target weighted by w
  // weight must return a weight for an edge (tuple of neighboring cells)
  findPath(source, target, w=(s,t)=>1) {
    prio = new PriorityQueue((a,b) => a.w > b.w)
    throw new Error('TODO')
  }

  // filter values by f in the first ring around centerId,
  // if it's empty use the next ring and so on up tu max
  findNearest(f, max=3) {
    return centerId => {
      if (max<1) return [];
      const used = new Set([centerId]);
      const propers = id => cells.c[id].filter(c=>!used.has(c).filter(f))
      const ring = Array.isArray(centerId)
        ? centerId.map(c => propers(c)).flat()
        : propers(centerId);
      if (ring.length) return valid;
      return findNearest(f, max-1)(ring)
    }
  }
}

class BaseCell {
  constructor(grid) {
    // this.id =
    this.grid = grid
  }

  get neighbors() {
    return this.grid.neighborsOf(this.id)
  }
}

export class CellGrid extends AbstractCellGrid {
  constructor(cellNumber) {
    super()
    this.grid = [] // TODO: create voronoi
  }
}
