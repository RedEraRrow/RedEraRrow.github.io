// simulate legacy data structures

import test from "ava"
import testmap from './_maploader.js'
import legacyCells from '../packages/cells/legacyCells.js'

test.before(async t => { t.context.data = await testmap() })


test("test demo data unpack algorithm and input", t =>{
  const cells = t.context.data.pack.cells
  t.assert( !cells.i.flag, "json is unpacked")
})
