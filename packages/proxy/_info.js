export default {
  name: "Proxy",
  description: `
    Proxy package for legacy data structures.
    No dependencies calculated, you are responsible for data consistency.
  `,

  generators: [
    {
      name: "pack",
      info: "Legacy CellGrid Proxy for CellGrid API",
      requires: [],
      uses: [],
      provides: ['Burgs', 'Roads', 'Cells', 'HeightMap', 'Temperature', ],
      from: 'legacyProxy.js',
    },
  ],

  renderers: [
    {
      name: "LegacyRenderer",
      info: "Legacy data renderer. Not implemented.",
      import: 'render',
      from: 'legacyRenderer.js',
    },
  ],

  editors: [

  ],

}
