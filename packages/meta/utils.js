export mod = async (name, fn, loader) => {
  function generator() {
    if (this.generator) return this.generator()
    this.generator = await loader()
    return this.generator()
  }
  return generator.bind(generator)
}
