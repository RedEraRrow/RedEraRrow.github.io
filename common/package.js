export default class Package {
  constructor(path, init) {
    if (!init.generators)
      throw new Error(`Package ${init.name} should have "generators" prop.`)

    if (!init.renderers)
      throw new Error(`Package ${init.name} must have "renderers" prop.`)

    this._path = path
    this.name = init.name
    this.generators = init.generators
    this.renderers = init.renderers
    this.description = normalize(init.description)
  }

  async loadRenderer(name) {
    const rend = this.renderers.find(x => x.name === name)
    if (!rend) throw new Error(`No such renderer in ${this.name}: ${name}`)
    const from = rend?.src.from ? rend.src.from : `renderers/${name}.js`
    const tab = rend?.src.import ? rend.src.import : 'default'
    const mod = await import(`../packages/${this._path}/${from}`)
    return mod[tab]
  }

  async loadGenerator(name) {
    const gen = this.generators.find(x => x.name === name)
    if (!gen) throw new Error(`No such generator in ${this.name}: ${name}`)
    const from = gen?.src.from ? gen.src.from : `generators/${name}.js`
    const tab = gen?.src.import ? gen.src.import : 'default'
    const mod = await import(`../${this._path}/${from}`)
    return mod[tab]
  }
}

const normalize = s => s.split('\n').map(t => t.trim()).join(' ')
