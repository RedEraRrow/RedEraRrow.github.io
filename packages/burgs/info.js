export default {
  name: "Burgs",
  description: `
    Long description of the Burg package...
    goes here.
  `,

  generators: [
    {
      name: "Legacy Burg Generator",
      import: 'legacyState',
      from: _ => import('./legacyBurgs.js'),
    },
  ],

  renderers: [
    {
      name: "Legacy Burg Renderer",
      import: 'render',
      from: _ => import('./legacyBurgRenderer.js'),
    },
  ],

  editors: [

  ],

}
