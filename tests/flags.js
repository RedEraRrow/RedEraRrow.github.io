import { FlagManager } from '../packages/cells/flags.js'
import { LegacyFlagManager } from '../packages/cells/legacyFlags.js'

const assert = console.assert

function testFlagMap(fm) {
  // set green flag for all
  const green = fm.flag('green')
  fm.setAll(green)
  const isGreen = fm.has(green)
  assert(isGreen(0), fm, green)
  assert(isGreen(9), fm, green)

  // set some to red
  const red = fm.flag('red')
  const reds = new Set([0, 5, 9])
  const isRed = fm.has(red)
  fm.set(red, ...reds)
  assert(isRed(0), "0 must be red", fm)
  assert(isRed(9), "9 must be red", fm)
  assert(!isRed(1), "1 is not set to red", fm)

  // set 0 and 1 to not green
  fm.clear(green, 0, 1)
  assert(!isGreen(0), "0 is not green anymore!", fm)
  assert(!isGreen(1), "1 is not green anymore!", fm)
  assert(isGreen(2), "2 is still green.", fm)

  const yellow = fm.flag('green') | fm.flag('red')
  const isYellow = fm.hasAll(yellow)
  const redOrGreen = fm.has(yellow)
  assert(!isYellow(0), "0 has red but no green it's not yellow", fm)
  assert(!isYellow(1), "1 has neither red nor green it's not yellow", fm)
  assert(!isYellow(3), "3 has green but no red it's not yellow", fm)
  assert(isYellow(5), "5 has both green and red, it must be yellow", fm)
  assert(isYellow(9), "9 has both green and red, it must be yellow", fm)
  assert(redOrGreen(0), "0 has red it's one of them", fm)
  assert(!redOrGreen(1), "1 has neither red nor green it's none of them", fm)
  assert(redOrGreen(3), "3 has green it's one of them", fm)

  assert(!isRed(10), 'out of bounds access is always false', fm)

  // Two sets are the same
  let sameSet = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
  assert(sameSet(new Set(), new Set()), "nullarrays are same")
  assert(sameSet(new Set([1,2]), new Set([1,2])), "same arrays are same")
  assert(sameSet(new Set([2,1]), new Set([1,2])), "order indifferent")
  assert(!sameSet(new Set([1]), new Set([1,2])), "different size")
  assert(!sameSet(new Set([1,3]), new Set([1,2])), "different elements")

  const blue = fm.flag('blue')
  const blues = new Set([1, 5, 6, 7])
  fm.set(blue, ...blues)

  const reds2 = new Set(fm.filterAny(red))
  assert(sameSet(reds2, new Set(reds)), "filterAny must return reds", fm, reds2, reds)

  let real, check
  real = new Set(fm.filterAny(yellow))
  check = new Set([0,2,3,4,5,6,7,8,9])
  assert(sameSet(real, check), "filterAny yellow must return all except 1", fm)

  real = new Set(fm.filterAll(yellow))
  check = new Set([5, 9])
  assert(sameSet(real, check), "filterAll yellow is 5 and 9", fm, real, check, yellow)

  // this is same as filterAll(yellow|blue)
  real = new Set(fm.filter(x => (x & yellow) && (x & blue)))
  check = new Set([5,6,7])
  assert(sameSet(real, check), "custom filter check", fm, real, check, yellow)

  // removing a flag shouldn't change the others
  fm.remove('green')
  const purple = fm.flag('blue') | fm.flag('red')
  real = new Set(fm.filterAny(purple))
  check = new Set([...blues, ...reds])
  assert(sameSet(real, check), "after removing green, red|blue correctly calculated", real, check, fm)

  real = new Set(fm.filterAll(purple))
  check = new Set([...blues].filter(b => reds.has(b)))
  assert(sameSet(real, check), "after removing green, purples should be correctly calculated", real, check, fm)
}

export default _ =>  {
  console.log('testing Flagmanager')
  let fm
  fm = new FlagManager(10)
  assert(fm.size === 10, fm)
  testFlagMap(fm)

  // many flags should work
  fm = new FlagManager(10)
  for(let i=0; i<9; i++) fm.flag('flag' + i)
  testFlagMap(fm)

  fm = new FlagManager(10)
  for(let i=0; i<60; i++) fm.flag('flag' + i)
  testFlagMap(fm)

  // test legacy map
  console.log('testing Legacy Flagmanager')
  const fmLegacy = new LegacyFlagManager(10)
  assert(fmLegacy.size === 10, "Size must be 10", fm)
  fmLegacy.register('green', new Uint8Array(10))
  fmLegacy.register('blue', new Uint8Array(10))
  fmLegacy.register('red', new Uint8Array(10))
  testFlagMap(fmLegacy)
}
