export default {
  name: "Cells",
  description: `
    Cell is a object representing smallest unit of area storing
    neighborhood information to other cells. CellGrid is a set of connected
    Cells. Different properties like height, humidity, population etc.
    may be attached by other packages.
  `,

  generators: [
    {
      name: "LegacyCells",
      info: "Legacy CellGrid Proxy for CellGrid API",
      requires: [],
      uses: ['Cells'], // Cells can update itself
      provides: ['Burgs'],
      import: 'grid',
      from: './legacyCells.js',
    },
  ],

  renderers: [
    {
      name: "LegacyRenderer",
      info: "Legacy CellGrid Renderer. Not implemented.",
      import: 'render',
      from: './legacyRenderer.js',
    },
  ],

  editors: [

  ],

}
