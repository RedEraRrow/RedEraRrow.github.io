

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
  }

  registerCellProp(propName, f) {
    // register new property accessor of type Id => Any
    if (Object.keys(this.grid.baseCell).includes(propName))
      throw new Error(`${propName} already registered`)

    Object.defineProperty(this.grid.baseCell, propName, {
        enumerable: true,
        get: f,
    })
    return this
  }

  registerCellFlag(flagName) {
    if (!this.grid.flagManager) throw new Error('Grid has no flagmanager!')
    this.grid.flagManager.register(flagName)
    this.grid.registerCellProp(flagName, this.grid.flagManager.has(flagName))
    return this
  }

  // after modifying the grid make it immutable with freeze. eg:
  // const newCellGrid = new FlagManager(oldGrid)
  //    .addCellProp('road', getRoadFunction)
  //    .addCellFlag('hasRoad')
  //    .freeze()
  freeze() {
    Object.freeze(this.grid.baseCell)
    return Object.freeze(this.grid)
  }
}

class AbstractCellGrid {
  /* CellGrid factory
  return a shallow copy of the old cellgrid replacing it's baseCell
  with an upgraded one effectively extending its API.
  */
  static extend(oldGrid, extension) { // <-- kell az extension???
    if (!oldGrid.baseCell)
      throw new Error("Invalid CellGrid. baseCell property required.")


    const [a, b] = new Set(Object.keys(oldGrid.baseCell)), new Set(Object.keys(extension))
    if ([...a].find(e => b.has(e)))
      throw new Error("baseCell can not be extended with existing props: ", grid.baseCell, extension)

    // create copy of the old grid (only enumerable props are copied!)
    // setting prototype is also possible but less performant
    const newGrid = new oldGrid.constructor()
    Object.assign(grid,  oldGrid)

    // replace baseCell with another using the extended API
    newGrid.baseCell = new oldGrid.baseCell.constructor()
    Object.assign(newGrid.baseCell, extension)

    return newGrid
  }

  constructor() {
    this.baseCell = new BaseCell(this)
    this.flagManager = undefined // must be implemented in derived class
  }

  byId(id) {
    return Object.create({ id }, this.baseCell)
  }

  registerCellProp(propName, f) {
    // register new property accessor of type Id => Any
    if (Object.keys(this.baseCell).includes(propName))
      throw new Error(`${propName} already registered`)

    Object.defineProperty(this.baseCell, propName, {
        enumerable: true,
        get: f,
    })
    return this
  }

  registerCellFlag(flagName) {
    if (!flagManager) throw new Error('Grid has no flagmanager!')
    this.flagManager.register(flagName)
    this.registerCellProp(flagName, this.flagManager.has(flagName))
    return this
  }

  // after modifying the grid make it immutable with freeze. eg:
  // const newCellGrid = CellGrid.extend(oldGrid)
  //    .addCellProp('road', getRoadFunction)
  //    .addCellFlag('hasRoad')
  //    .freeze()
  freeze() {
    Object.freeze(this.baseCell)
    return Object.freeze(this)
  }

  // filter values by f in the first ring around centerId,
  // if it's empty use the next ring and so on up tu max
  findNearest: (f, max=3) => centerId => {
    if (max<1) return [];
    const used = new Set([centerId]);
    const propers = id => cells.c[id].filter(c=>!used.has(c).filter(f)
    const ring = Array.isArray(centerId)
      ? centerId.map(c => propers(c)).flat();
      : propers(centerId);
    if (ring.length) return valid;
    return findNearest(f, max-1)(ring)
  },

}

class BaseCell() {
  constructor(grid) {
    // this.id = // Must be added by the CellGrid implementation
    this.neighbors = function* () {} // null generator, replace it!
    this.grid = grid
  }

  neighbors() {
    return this.grid.findNearest(this.id)
  }
}

class CellGrid extends AbstractCellGrid {
  constructor(cellNumber) {
    super()
    this.grid = [] // create voronoi
    this.flagManager = new FlagManager()
  }
}
