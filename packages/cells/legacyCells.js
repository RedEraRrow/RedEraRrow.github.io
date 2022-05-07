/*
Proxy CellGrid Generator for legacy data structures
*/

import { grid, pack } from '../../common/legacy.js'

legacyCellGrid = {

    map(f) {
      return pack.cells.map(c => f(Object.create(protoCell, {id: c})))
    },
 // mégse protocell?
    filter(f) {
      return pack.cells.filter(f => f(Object.create(protoCell, {id: c})))
    },

    vertices: id => pack.cells.v[id],
    isBorder: id => pack.cells.b[id],


    mapOn(prop, f) {

      pack.cells.[prop].
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

// generators must be factory functions
// (this one is a Singleton)
export default _ => legacyCellGrid
