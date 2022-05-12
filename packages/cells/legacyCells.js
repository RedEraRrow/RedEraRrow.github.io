/*
Proxy CellGrid Generator for legacy data structures
*/

import { AbstractCellGrid } from './cellGrid.js'

class LegacyCellGrid extends AbstractCellGrid {

  // only parameter is the global object
  constructor(glbl) {
    super()
    this.grid = glbl.grid
    this.pack = glbl.pack
    this.vertices = glbl.pack.vertices
    this.isBorder = id => glbl.pack.cells.b[id]
    Object.defineProperties(this.baseCell, {
      x: {
        enumerable: true,
        get: function() { return this.grid.pack.cells.p[this.id][0]}
      },
      y: {
        enumerable: true,
        get: function() { return this.grid.pack.cells.p[this.id][1]}
      }
    })
  }

  cellAt(x, y, maxRadius = Infinity) {
    const found = glbl.pack.cells.q.find(x, y, maxRadius);
    return found ? found[2] : undefined;
  }

  // probably slow, use for mockups only
  * [Symbol.iterator]() {
    const cell = Object.create(this.baseCell)
    for (i=0; i<glbl.pack.cells.i.length; i++)
      yield Object.assign(cell, { id: c })
  }

  // find neighboring cells of a given cell
  // Cell can be an object or an id.
  // returns an iterable
  neighborsOf(cellId) {
    if (typeof cellId !== 'number') cellId = cellId.id
    return this.pack.cells.c[cellId]
  }

}

// generators must be factory functions
export default p => new LegacyCellGrid(p)
