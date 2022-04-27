/*
This file stores the state of the Feature.
State must implement Serializable
please implement serialize, deserialize where compose(serialize,deserialize) == id

State can (and should) have standard API.
API functions must not have side-effects.
*/

const route_types = []
const routes = []

class Road

// State object
export default {
  depends: {
    require: ['Cells'],
    use: ['Burgs', 'HeightMap', 'Rivers', 'Roads'],
  },
  getTypes,
  reset

}
