export default generatorContext => {

  // First we import optional and required dependencies (resources)
  // from GeneratorContext. If the resource was marked as required, exception
  // will be thrown if the resource is missing.
  // If the resource was marked optional the variable might be undefined
  // and we are responsible to test for availability in the code.
  // Resource can be missing two ways: if it's not generated yet or usage is
  // denied by the user (set to ingore).

  cellGrid = generatorContext.resource('CellGrid')
  burgs = generatorContext.resource('Burgs')
  sea = generatorContext.resource('Sea')
  rivers = generatorContext.resource('Rivers') // optional!
  control = generatorContext.resource('ControlZones') // optional!
  economy = generatorContext.resource('Economy') // optional!
  routes = generatorContex.resource('Routes') // we can re-use existing data!

  // find available land cells
  const land = cellGrid.cellSet.new_difference(water.cellSet)

  // if we have no-route control zones exclude them from the land set
  if (control && control.noRoutes) land.difference(control.noRoutes)

  // use the Burgs API to iterate over burgs, burgs are required, we don't
  // have to check its availability.
  const burgs.cellSet
  for (b of burgs.c()) {

  }


  /* generate water-routes
  */
  waterCells = sea.set()


}
