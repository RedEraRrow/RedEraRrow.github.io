// export legaxy global data structures

export const pack = window.pack
export const grid = window.grid


export const sizes = {
  // voronoi graph extension, cannot be changed after generation
  get grapWidth() { return window.grapWidth },
  get grapHeight() { return window.grapHeight },
  // svg canvas resolution, can be changed
  get svgWidth() { return window.svgWidth },
  get svgHeight() { return window.svgHeight },
}

export const getSeed = _ => window.seed

export const mapHistory = window.mapHistory
export const notes = window.notes

export const biomesData = window.biomesData
export const nameBases = window.nameBases // cultures-related data

export const mapCoordinates = window.mapCoordinates // map coordinates on globe
