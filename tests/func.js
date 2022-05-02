import { map, filter, reduce, iter, fst, snd, id } from '../common/func.js'

const assert = console.assert

const sameArray = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export default _ => {

  const test = { a:1, b:2, c:5 }

  assert(sameArray([...iter(test)], Object.entries(test)), "iter should return entries", test, [...iter(test)])

  const a = [1,3,9,3,1,2,7]
  function* aiter(a) {
    for (const e of a) yield e
  }

  const f = x => x > 2
  assert(sameArray([...filter(f, aiter(a))], a.filter(f)), "filter is the same")

  const m = x => x*x
  assert(sameArray([...map(m, aiter(a))], a.map(m)), "map is same")
}
