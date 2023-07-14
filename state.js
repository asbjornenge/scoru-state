import fetch from 'node-fetch'
import { 
  ROLLUP_RPC_URI,
  STATE_LOOP_INTERVAL,
  ROLLUP_RPC_DURABLE_STORAGE_PATH, 
} from './config.js'
import { setObjectProperty } from './utils.js'

export const state = {}

const buildpathstate = async(path, depth) => {
  const subkeys = await fetch(`${ROLLUP_RPC_URI}/${ROLLUP_RPC_DURABLE_STORAGE_PATH}/subkeys?key=${path}`).then(res => res.json())
  if (path.indexOf('kernel') >= 0) return
  for (const subkey of subkeys) {
    if (subkey == '')  {
      const value = await fetch(`${ROLLUP_RPC_URI}/${ROLLUP_RPC_DURABLE_STORAGE_PATH}/value?key=${path}`).then(res => res.json())
      let decoded = Buffer.from(value, 'hex').toString('utf-8')
      try { decoded = JSON.parse(decoded); } catch(e) {}
      setObjectProperty(state, path, decoded)
    } else {
      await buildpathstate(`${path}/${subkey}`, depth+1)
    }
  }
}

const loop = async () => {
  await buildpathstate('', 0)
  console.log(state)
  setTimeout(loop, STATE_LOOP_INTERVAL)
}

export const start = () => {
  setTimeout(loop, STATE_LOOP_INTERVAL)
}

