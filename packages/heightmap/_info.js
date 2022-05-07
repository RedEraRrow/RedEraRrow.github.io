export default {
  name: "HeightMap",
  description: `
    HeightMap package contains numeric height data and height specific methods
  `,

  generators: [
    {
      name: "FractalHeightMap", // an example
      info: "Fractal heightmap generator",
      requires: ['Cells'],
      uses: ['HeightMap'], // this heightmap can reuse (extend) existing height data
      provides: ['HeightMap'],
      src: { from: 'to_be_implemented.js' },
    },
    {
      name: "LegacyHeightMap",
      info: "A proxy providing HeightMap API for legacy data structure",
      requires: ['Cells'],
      uses: [],
      provides: ['HeightMap'],
    },
  ],

  renderers: [
    {
      name: "LegacyHeightMap",
      image: "SVG",
      info: "This renderer renders to the legacy SVG object",
      src: {
        import: 'render',
        from: './legacyHeightMapRdr.js',
      },
    },
  ],

  editors: [

  ],

}
