import { config } from 'tiny-env-config'

export const HTTP_HOST = config('HTTP_HOST', 'localhost')
export const ROLLUP_RPC_URI = config('ROLLUP_RPC_URI', 'http://localhost:20010')
export const STATE_LOOP_INTERVAL = config('STATE_LOOP_INTERVAL', 1000)
export const ROLLUP_RPC_DURABLE_STORAGE_PATH = config('ROLLUP_RPC_DURABLE_STORAGE_PATH', '/global/block/head/durable/wasm_2_0_0')
