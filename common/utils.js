/*
Map over an iterator, return a generator
*/
export function* map(f, iterator) {
  for(item of iterator) yield f(item)
}

/*
Filter an iterator, return a generator
*/
export function* filter(f, iterator) {
  for(item of iterator) if(f(item)) yield item
}

/*
Reduce for iterators (foldl)
*/
export function reduce(f, iterable, collector) {
  for (item of iterable) collector = f(collector, item)
  return collector
}

/*
Create iterator from objects
*/
export function* iter(obj) {
  for (item in obj) yield [item, obj[item]]
}

// first and second element of a 2 tuple
export const fst = ([a, _]) => a
export const snd = ([_, b]) => b

// identitiy
export const id = x => x
