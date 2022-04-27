export default {
  name: "Roads",
  description: `
    Long description of the Roads package...
    goes here.
  `,

  generators: [
    {
      name: "Road generator",
      import: 'roads',
      from: _ => import('./roads.js'),
    },
  ],

  renderers: [
    {
      name: "Legacy Road Renderer",
      description: "This renderer renders to the legacy SVG object",
      import: 'render',
      from: _ => import('./legacyRoadRenderer.js'),
    },
  ],

  editors: [

  ],

}
