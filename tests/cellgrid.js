import legacyCellGrid from '../packages/cells/legacyCells.js'
const assert = console.assert

function testCell(c) {
  assert(c.id, "Cell must have an id")
  assert(c.neighbors, "Cell must have neighborhood")
  assert(c.x, "Cell must provide Pointlike interface")
  assert(c.y, "Cell must provide Pointlike interface")

  // neighborhood graph must not be directed
  // all neighbors must have this cell as a neighbor
  for (const nb of c.neighbors) assert(
    [...nb.neighbors].includes(c),
    "all neighbors must have this cell as their neighbor"
  )

}


export default {
  console.log('testing cellgrid implementations')

  // generate fake window for testing
  window.pack.
  let grid = legacyCellGrid({}) // config is not understood by legacy
  assert(grid.size === window.pack.cells.length, "grid size must match cell count")
  // cell must have some properties
  const c0 = grid.cell(0)

  const getHeight = id => id < 30 : id + 1 : 33 // test heightmap
  grid.register("Heights", getHeight)

  grid.filter(x)
  assert(grid.)


}
