import test from 'ava'


test('deepEqual', t => {

  // t.like(new Set([1,2,3]), new Set([1,3,2]))
  t.deepEqual({a: 3, b: 5}, {b: 5, a: 3})
  //t.deepEqual(new Map([['a', 3], ['b', 5]]), new Map([['b', 5], ['a', 3]]))
  const a = {} , b= {}

  a.a = 1
  a.b = 2
  b.b = 2
  b.a = 1
  t.deepEqual(a,b)

})
