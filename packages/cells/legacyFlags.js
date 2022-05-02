/*
Flagmanager implementation for legacy arrays
*/

import { snd, iter, map, filter, reduce } from '../../common/func.js'

export class LegacyFlagManager {
  constructor(size) {
    this.size = size
    this.flags = {}
    this.maps = {}
  }

  register(flagName, legacyMap) {
    /* Add new flag, return the flag*/
    let nextFree = 0
    const used = Object.values(this.flags)
    while (used.includes(nextFree)) nextFree++
    if (nextFree >= 64) throw new Error("max 64 flags supported")
    this.flags[flagName] = nextFree
    const mask = this.flag(flagName)
    this.maps[mask] = legacyMap
    return mask
  }

  // convert mask to backend storages
  // returns generator of storages
  _getMaps(mask) {
    const oi = iter(this.flags)
    const isTrue = this.flags.length < 32
      ? ([_, v]) => (1 << v) & mask
      : ([_, v]) => (BigInt(1) << BigInt(v)) & mask
    const getMap = ([k, _]) => this.maps[this.flag(k)]
    const maps = [...map(getMap, filter(isTrue, oi))]
    return maps
  }

  _getShift() {
    return this.flags.length < 32 ? v => 1 << v : v => 1n << BigInt(v)
  }

  flag(flagName) {
    /* get the desired flag mask */
    const shift = this._getShift()
    if (this.flags[flagName] === undefined)
      throw new Error(`Flag "${flagName}" must be registered before usage (legacy).`)
    return shift(this.flags[flagName])
  }

  remove(flagName) { // :void
    /* remove the flag*/
    if (this.flags[flagName] === undefined) return
    const mask = this.flag(flagName)
    this.clearAll(mask)
    delete this.flags[flagName]
    delete this.maps[mask]
  }

  set(mask, ...ids) {
    for (const storage of this._getMaps(mask))
      for (const id of ids) storage[id] = true
  }

  setAll(mask) {
    for (const storage of this._getMaps(mask))
      for (let i=0; i<this.size; i++) storage[i] = true
  }

  clear(mask, ...ids) {
    for (const storage of this._getMaps(mask))
      for (const id of ids) storage[id] = false
  }

  clearAll(mask) {
    for (const storage of this._getMaps(mask))
      for (let i=0; i<this.size; i++) storage[i] = false
  }

  /* ------------------ tests ------------------- */
  _all(mask, id) {
    const maps = [...this._getMaps(mask)]
    let r = true
    for (const m of maps) r = r && m[id]
    return r
  }

  _any(mask, id) {
    const maps = [...this._getMaps(mask)]
    let r = false
    for (const m of maps) r = r || m[id]
    return r
  }

  _combine(id) {
    const oi = iter(this.flags)
    const zero = this.flags.length < 32 ? 0 : 0n
    const shift = this._getShift()
    const reducer = (c, [k, v]) => {
      const m = shift(v)
      return c | (this.maps[m][id] ? m : zero)
    }
    return reduce(reducer, oi, zero)
  }

  has(mask) {
    return id => this._any(mask, id)
  }

  hasAll(mask) {
    return id => this._all(mask, id)
  }

  hasNot(mask) {
    return id => !this._any(mask, id)
  }

  * filterAny(mask) {
    for (let c=0; c<this.size; c++)
      if (this._any(mask, c)) yield c
  }

  * filterAll(mask) {
    for (let c=0; c<this.size; c++)
      if (this._all(mask, c)) yield c
  }

  * filter(f) {
    for (let c=0; c<this.size; c++)
      if (f(this._combine(c))) yield c
  }
}
