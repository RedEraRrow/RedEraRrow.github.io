# CellGrid API (proposal)

## neighborsOf(c: CellId) => Iterable<CellId>

Returns a Iterable yielding neighboring cell ids.


## findRoute(from: CellId, to: CellId | CellId => boolean, cost: CellId => Number)

Find the best route from `from` to `to` using the cost function `cost`.
`to` can be a cellId or a function returnig true if the cellId is valid target.
Numeric `to` is replaced with `c => c === to`. The route will be optimized
for least cost (returned by the cost function) along the cell route.
The cost function should return the cost for passing the cell given by its parameter.
The complete type of cost is (c: CellId, i: Integer) => Number where i is
the length of the route (0 for `from`). If cost is not given  _ => 1 is used.
