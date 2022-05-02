/*
Managing custom flags

API demo:
const fm = new FlagManager(1000)
const sea = fm.flag('sea')
fm.set(sea, 56)
fm.set(sea, 100)

const river = fm.flag('river')
fm.set(river, 56)
fm.set(river, 110)

...later
const sea = fm.flag('sea')
const river = fm.flag('river')
for(id of fm.all(sea & river)) console.log('both', id)
*/
class FlagManager {
  constructor(size) {
    this.size = size
    this.stripSize = 8
    this.flagMap = Uint8Array(size)
    this.flags = {}
  }

  register(flagName) {
    /* Add new flag, return the flag*/
    const flagNum = Object.keys(this.flags).length
    if (flagNum > this.stripSize) this.resize()
    const nextFlagMask = 1 << flagNum
    this.flags[flagName] = nextFlagMask
    return nextFlagMask
  }

  flag(flagName) {
    /* get the desired flag mask */
    const mask = this.flags[flagName]
    return mask ? mask : this.register(flagName)
  }

  set(mask, id) {
    this.flagsMap[id] &= mask
  }

  clear(mask, id) {
    this.flagsMap[id] &= ~mask
  }

  hasSome(mask) {
    return id => this.flagMap[id] & mask
  }

  hasAll(mask) {
    return id => this.flagMap[id] & mask === mask
  }

  hasNot(mask) {
    return id => !(~this.flagMap[id] & mask)
  }

  *filterAny(mask) {
    this.flagsMap.forEach((v, i) => { if(v & mask) yield i })
  }

  *filterAll(mask) {
    this.flagsMap.forEach((v, i) => { if(v & mask === mask) yield i })
  }

  resize() {
    /* resize internal bitmap if required */
    const stripTypes = {
      16: Uint16Array,
      32: Uint32Array,
      64: BigUint64Array,
    }

    this.stripSize = this.stripSize << 1
    const newType = stripTypes[this.stripSize]
    if (! newType)
      throw new Error("Maximum flag number reached. Flag registration rejected.")

    const newFlags = new newType(this.size)
    this.flagMap.forEach((v,i) => newFlags[i] = v)
    this.flagMap = newFlags
  }
}


class LegacyFlagManager {
  constructor(size) {
    this.size = size
    this.flags = {}
    this.maps = {}
  }

  /* Add new flag, return the flag*/
  register(flagName, legacyMap) {
    const flagNum = Object.keys(this.flags).length
    const nextFlagMask = 1 << flagNum
    this.flags[flagName] = nextFlagMask
    this.maps[flagName] = legacyMap
    return nextFlagMask
  }

  /* get the desired flag mask */
  flag(flagName) {
    const mask = this.flags[flagName]
    if (!mask)
      throw new Error(`Flag "${flagName}" must be registered before usage (legacy).`)
    return mask
  }

  // convert mask to backend storages
  // returns generator of storages
  _getStorages(mask) {
    const oi = iter(this.flags.filter)
    const isTrue = ([_, v]) => v & mask
    return map(snd, filter(isTrue, oi))
  }

  set(mask, id) {
    for (storage of this._getStorages(mask)) storage[id] = true
  }

  clear(mask, id) {
    for (storage of this._getStorages(mask)) storage[id] = false
  }

  has(mask, id) {
    const storages = this._getStorages(mask)
    return reduce((cont, s) => s[id] && cont, storages, false)
  }

  *any(mask) {
    this.flagsMap.forEach((v, i) => { if(v & mask) yield i })
  }

  *all(mask) {
    this.flagsMap.forEach((v, i) => { if(v & mask === mask) yield i })
  }

  resize() {
    /* resize internal bitmap if required */
    const stripTypes = {
      16: Uint16Array,
      32: Uint32Array,
      64: BigUint64Array,
    }

    this.stripSize = this.stripSize << 1
    const newType = stripTypes[this.stripSize]
    if (! newType)
      throw new Error("Maximum flag number reached. Flag registration rejected.")

    const newFlags = new newType(this.size)
    this.flagMap.forEach((v,i) => newFlags[i] = v)
    this.flagMap = newFlags
  }
}
