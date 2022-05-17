/*
Package registry
*/
import Package from '../common/package.js'

const packageDirs = [
  'burgs',
  'cells',
  'routes',
]

export const packages = {}
const commands = {}

// load all packages from packagesDirs,
// do some sanity check
export async function load() {
  const res = await Promise.allSettled(packageDirs.map(d => import(`./${d}/_info.js`)))
  res.forEach((r, i) => {
    const path = packageDirs[i]
    if (r.status === "rejected") {
      console.warn(`Can not load module from ${path}.`, r.reason)
      return
    }

    const pkg = r.value.default
    if (!pkg) {
      console.warn(`Package ${path}/_info.js must have a default export!`)
      return
    }

    if (!pkg.name) {
      console.warn(`Package ${path} must have a name property!`)
      return
    }

    packages[pkg.name] = new Package(path, pkg)
  })
  // do whatever is need to be done after package init here
  return packages
}

// Install FMG console to global namespace.
// for now, all comands namespaced with "fmg" to avoid clash with legacy
// functions. Can be moved to window in the future.
export function startConsole() {
  console.log("%c🗺 FMG console\n", "font-size:14px; text-align:center; color:yellow; ")
  window.fmg = commands
  commands.fhelp()
}

// global console command registration
export function registerCommand(name, f, description) {
  if (commands[name]) throw new Error('command already exists:', name, 'Registration rejected.')
  commands[name] = f
  commands[name].description = description
}

/*
Register default global commands here
*/
function fhelp() {
  for (const [cn, co] of Object.entries(commands)) {
    console.log(`%c${cn}\n%c${co.description}`,
      "font-size:12px; font-weight:bold;",
      "font-size:8px; font-weight:normal;",
    )
  }
}
registerCommand("fhelp", fhelp, "Show help about fmg commands")

export async function renderer(packageName, rendererName) {
  const pck = packages[packageName]
  if (!pck) throw new Error("No such package in registry:", packageName)
  return pck.loadRenderer(rendererName)
}
registerCommand("renderer", renderer, "Dynamically load renderer for a given package")

const plist = () => Object.values(packages)
  .forEach(p => console.log(
    `${p.name} (rendr: ${p.renderers.length}, gens: ${p.generators.length})\n%c${p.description}`, "font-size:8px;"))
registerCommand("plist", plist, "Show current status of packages")
