/*
load legacy map data from json file for testing
*/

import {promises as fs} from 'fs'

const decodeSpecJson = jsonStr => JSON.parse(
  jsonStr,
  function( key, value ){
    try{
      if( "flag" in value && value.flag === "TypedArray"){
        return new global[value.constructor](value.data)
      }
    } catch(e) {}
    return value
  }
)

const mapLoader = async () => {
  let data
  try {
    data = await fs.readFile('./tests/map.json')
  } catch(e) {
    console.warn(`
      Test map file (tests/map.json) is not found!
      Please generate one using the 'pached-downloader' branch.
      Last button in the main menu will download the internal data structure
      in our custom json format.
    `)
    throw(e)
  }
  return decodeSpecJson(data)
}

export default mapLoader
