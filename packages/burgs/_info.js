export default {
  name: "Burgs",
  description: `
    Long description of the Burg package...
    goes here.
  `,

  generators: [
    {
      name: "legacyBurgs",
      description: "proxy generator for legacy Burg structures",
      requires: ['Cells', 'HeightMap', 'Water'],
      uses: [],
      provides: ['Burgs'],
      import: 'legacyState',
      from: 'legacyBurgs.js',
    },

    {
      name: "burgs",
      description: "Standard Burg Generator",
      requires: ['Cells'],
      uses: ['HeightMap', 'Rivers', 'Water'],
      provides: ['Burgs'],
      import: 'default',
      from: './standardBurgs.js', // relative to the package root
    },
  ],

  renderers: [
    {
      name: "legacyBurgs",
      from: './legacyBurgs.js',
    },
  ],

  editors: [

  ],

}
