export default generatorContext => {

  // First we import optional and required dependencies (resources)
  // from GeneratorContext. If the resource was marked as required, exception
  // will be thrown if the resource is missing.
  // If the resource was marked optional the variable might be undefined
  // and we are responsible to test for availability in the code.
  // Resource can be missing two ways: if it's not generated yet or usage is
  // denied by the user (set to ingore).

  res = generatorContext.resources
  /* This generator uses:
    'Scale',    // mandatory, the Map's scale
    'CellGrid', // mandatory
    'Burgs',    // mandatory
    'Sea',      // mandatory
    'Rivers',   // optional
    'ControlZones', // optional
    'Economy',  // optional
    'Cultures', // optional
    'Routes',   // optional, we can re-use existing route data!
    */


  /* extract options from the context
   * levels must be a Map() indexed by levelname, providing:
   * {
   * cost: Number,      # cost of building this kind of road
   * minScale: Number,  # minimum map scale to generate this kind of road
   * bridges: boolean,  # can this type of road can cross rivers
   * useRiver: boolean, # this type can use rivers
   * useLand: boolean,  # this type can cross land cells
   * useSea: boolean,   # this type can cross sea cells
   * useMountain: boolean, # this type can cross mountains
   * }
  */
  const { levels,   } = generatorContext.config

  // find available land cells
  const land = res.cellGrid.cellSet.new_difference(water.cellSet)

  // if we have no-route control zones exclude them from the land set
  if (control && control.noRoutes) land.difference(res.ControlZones.noRoutes)


  // if we don't have any routes generate some basis.
  let routes = [];
  if (!res.Routes) {
    routes = generateBaseRoutes(generatorContext)
  } else {
    routes

  }
  // use the Burgs API to iterate over burgs, burgs are required, we don't
  // have to check its availability.
  const burgs.cellSet
  for (b of burgs.c()) {

  }


  /* generate water-routes
  */
  waterCells = sea.set()


}

function generateBaseRoutes(ctx) {
  ctx.timer("Baseroute")
    // we do nothing, but it's quite fast. :-D
  ctx.timerEnd("Baseroute")
}
