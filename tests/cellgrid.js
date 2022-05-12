import test from 'ava'
import testmap from './_maploader.js'
import legacyCellGrid from '../packages/cells/legacyCells.js'

test.before(async t => {
  t.context.data = await testmap()
  Object.assign(globalThis, t.context.data)
})

test('cellgrid API basic props and symmetry', t => {

  let grid = legacyCellGrid(t.context.data)
  t.assert(grid.size === globalThis.pack.cells.length, "grid size must match cell count")

  // cell must have some properties
  const c = grid.cell(1)
  t.assert(c.id, "Cell must have an id")
  t.assert(c.neighbors, "Cell must have neighborhood")
  t.assert(c.x, "Cell must provide Pointlike interface")
  t.assert(c.y, "Cell must provide Pointlike interface")

  // neighborhood graph must not be directed
  // all neighbors must have this cell as a neighbor
  for (const nb of c.neighbors) {
    t.assert(
      [...grid.cell(nb).neighbors].includes(c.id),
      `all neighbors must have this cell as their neighbor: ${c.id} - ${nb}`
    )
  }
})
