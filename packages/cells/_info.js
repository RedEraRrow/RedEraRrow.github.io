export default {
  name: "Cells",
  description: `
    Long description of the Cells package...
    goes here.
  `,

  generators: [
    {
      name: "LegacyCells",
      info: "Legacy CellGrid Proxy for CellGrid API",
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
