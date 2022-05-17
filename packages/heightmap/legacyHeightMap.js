/*
Legacy heightmap proxy object
implementing HeightMap API
*/

import legacy from '../../common/legacy.js'

class HeightState {
  height: id => legacy.pack.cells.h[id]
  descend(id, f) {
    // descend starting from id, while f(id) is true
    // returns chain of ids

  }
}

export default {
}
