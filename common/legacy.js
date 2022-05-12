// export legaxy global data structures

export default {
  get pack() { return globalThis.pack },
  get grid() { return globalThis.grid },
  get getSeed() { return globalThis.seed },
  get mapHistory() { return globalThis.mapHistory },
  get notes() { return globalThis.notes },
  get biomesData() { return globalThis.biomesData },
  get nameBases() { return globalThis.nameBases }, // cultures-related data
  get mapCoordinates() { return globalThis.mapCoordinates }, // map coordinates on globe
  sizes: {
    // voronoi graph extension, cannot be changed after generation
    get grapWidth() { return globalThis.grapWidth },
    get grapHeight() { return globalThis.grapHeight },
    // svg canvas resolution, can be changed
    get svgWidth() { return globalThis.svgWidth },
    get svgHeight() { return globalThis.svgHeight },
  },
  pack2: globalThis.pack,
}
