/*
StateManager is responsible for managing map states, providing context
for generators.

*/

import { packages } from './registry.js'

class GeneratorContext {
  constructor(package, generatorName, mapState, config) {
    this.info = package.generatorInfo(generatorName)
    const { requires, uses, provides } = this.info

    // all required details must be present in mapState
    for (detail of requires)
      if (!mapState.has(detail))
        throw new Error(`${package}:${generatorName} requires ${detail}`)

    this.resources = mapState
    this.config = config
    this.name = generatorName
  }

  // return resource name
  getResources(...resourceNames) {

  }

  timer(name) {
    console.time(`${this.name}:${name}`);
  }

  endTimer(name) {
    console.timeEnd(`${this.name}:${name}`)
  }

}
