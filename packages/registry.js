/*
Package registry
*/
import Burgs from './burgs/info.js'
import CellGrid from './cells/info.js'
import Roads from './roads/info.js'

const packageList = [
  Burgs,
  CellGrid,
  Roads,
]
packageList.forEach(p => p._loaded = false)

async function load(packageName) {
  const p = packageList.find(x => x.name === packageName)
  if (!p) throw new Error(`No such package: ${packageName}`)
  const from = p.from ? p.from : `${packageName.toLowerCase()}/main.js`
  const tab = p.import ? p.import : 'default'
  const mod = await import(from)
  p._loaded = true
  return mod[tab]
}

const status = () => packageList.forEach(p=>console.log(`module ${p.name}: ${p._loaded? 'loaded': '-'}`))
const commands = {}

// Install FMG console to global namespace
function startConsole() {
  console.log("%cFMG console\n", "font-size:14px; background-color: green; text-align:center; color:black; padding:10px; width:100%")
  window.fmg = commands
  commands.help()
}

function help() {
  for (const [cn, co] of Object.entries(commands)) {
    console.log(`%c${cn}\n%c${co.description}`,
      "font-size:12px; font-weight:bold;",
      "font-size:8px; font-weight:normal;",
    )
  }
}

function registerCommand(name, f, description) {
  if (commands[name]) throw new Error('command already exists:', name)
  commands[name] = f
  commands[name].description = description
}
registerCommand("help", help, "Show help about fmg commands")

export default {
  load,
  list,
  registerCommand,
  startConsole,
}
