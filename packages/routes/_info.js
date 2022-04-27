export default {
  name: "Routes",
  description: `
    Routes package creates network of linear structures on the map like Highways,
    roads, paths, searoutes etc.

    Routes are drawn along a chain of Targets. Targets can be Cell centers, Burgs
    or Points. Routes sharing the same Target are connected.
  `,

  generators: [
    {
      name: "MultiRoads", // generator identifier
      description: "Multi level road generator",
      requires: ['Cells'], // required data interfaces
      uses: ['HeightMap', 'Water', 'Biomes'], // optional data interfaces
      provides: ['Roads'], // provided data interfaces
      import: 'routes', // imported object defaults to 'default'
      from: 'routeGenerator.js', // import from file (relative to package root)
    },
    {
      name: "LegacyRoads",
      description: "Multi level road generator with legacy data injection",
      requires: ['Cells'],
      uses: ['HeightMap', 'Water'],
      provides: ['Roads'],
      import: 'legacyRoutes',
      from: 'routeGenerator.js',
    },
  ],

  renderers: [
    {
      name: "LegacyRoads",
      description: "This renderer renders to the legacy SVG object",
      import: 'render',
      from: './legacyRoadRenderer.js',
    },
  ],

  editors: [

  ],

}
