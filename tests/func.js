import { map, filter, reduce, iter, fst, snd, id } from '../common/func.js'
import test from 'ava'



test("test functionals", t => {

  const test = { a:1, b:2, c:5 }

  t.deepEqual([...iter(test)], Object.entries(test), "iter should return entries")

  const a = [1,3,9,3,1,2,7]
  function* aiter(a) {
    for (const e of a) yield e
  }

  const f = x => x > 2
  t.deepEqual([...filter(f, aiter(a))], a.filter(f), "filter is the same")

  const m = x => x*x
  t.deepEqual([...map(m, aiter(a))], a.map(m), "map is same")
})
