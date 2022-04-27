/*

Legacy Burg wrapper providing Burgs interface

*/

const protoBurg = {
  help: "Burg object representing settlements",


  name: undefined,
  cell: undefined, // cell object
  get name() { return pack.burgs[this.id].name },
  get x() { return pack.burgs[this.id].x },
  get y() { return pack.burgs[this.id].y },
  culture: undefined, // culture object
}




get x() { return pack.burgs[this.id].x },
var obj = {};

const newBurg = id => Object.create(protoBurg, { id: { value: id } })
