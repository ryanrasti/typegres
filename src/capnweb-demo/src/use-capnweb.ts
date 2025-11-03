import { useEffect, useMemo, useRef, useState } from 'react'
import { newMessagePortRpcSession, type RpcStub } from 'capnweb'
import { Api } from './api'

/**
 * Very basic hook to invoke an RPC-producing factory once and cache the result.
 * Subsequent renders return the cached value without re-invoking the factory.
 */
export const useCapnwebQuery = <T = any>(factory: () => any) => {
  const cached = useRef<null | { data?: T; error?: unknown }>(null)
  const [state, setState] = useState<{ data?: T; error?: unknown; loading: boolean }>(() => ({
    data: cached.current?.data,
    error: cached.current?.error,
    loading: !cached.current,
  }))

  useEffect(() => {
    if (cached.current) return // already have a cached result
    let active = true
    ;(async () => {
      try {
        const result = (await factory()) as T
        if (!active) return
        cached.current = { data: result }
        setState({ data: result, error: undefined, loading: false })
      } catch (err) {
        if (!active) return
        cached.current = { error: err }
        setState({ data: undefined, error: err, loading: false })
      }
    })()
    return () => {
      active = false
    }
  }, [factory])

  const refetch = async () => {
    cached.current = null
    setState(s => ({ ...s, loading: true }))
    try {
      const result = (await factory()) as T
      cached.current = { data: result }
      setState({ data: result, error: undefined, loading: false })
    } catch (err) {
      cached.current = { error: err }
      setState({ data: undefined, error: err, loading: false })
    }
  }

  return { ...state, refetch }
}

// -- Bootstrap a MessageChannel-based client matching map-callback.test.ts --
let singletonClient: RpcStub<Api> | null = null

export const createCapnwebClient = (): RpcStub<Api> => {
  if (singletonClient) return singletonClient
  const channel = new MessageChannel()
  // Server: bind our Api implementation
  newMessagePortRpcSession(channel.port1, new Api())
  // Client: return an Rpc stub
  singletonClient = newMessagePortRpcSession<Api>(channel.port2)
  return singletonClient
}

export const useApi = () => {
  // Stable singleton across renders
  return useMemo(() => createCapnwebClient(), [])
}


