export default {
  name: "Proxy",
  description: `
    Proxy package for legacy data structures.
    No dependencies are calculated. Provided resources may or may not exists at call time.
    You are responsible for using proxy resources after the corresponding legacy generator
    and keep data consistency.
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
