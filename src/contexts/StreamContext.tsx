import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface StreamContextType {
  connected: boolean
  unreadCount: number
  apiKey: string
  userId: string | null
  userName: string | null
  userToken: string | null
}

const StreamContext = createContext<StreamContextType>({
  connected: false,
  unreadCount: 0,
  apiKey: '',
  userId: null,
  userName: null,
  userToken: null,
})

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY as string

async function fetchStreamToken(userId: string, accessToken: string): Promise<string | undefined> {
  if (!import.meta.env.VITE_SUPABASE_URL) return undefined
  try {
    const { data, error } = await supabase.functions.invoke('stream-token', {
      body: { userId },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (error) return undefined
    return data?.token
  } catch {
    return undefined
  }
}

export function StreamProvider({ children }: { children: ReactNode }) {
  const { user, session } = useAuth()
  const [connected, setConnected] = useState(false)
  const [unreadCount] = useState(0)
  const [userToken, setUserToken] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !session || !STREAM_API_KEY) {
      setConnected(false)
      setUserToken(null)
      return
    }

    let cancelled = false
    const setup = async () => {
      try {
        const profile = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single()

        if (cancelled) return

        const name = profile.data?.full_name || user.email || 'User'
        setUserName(name)

        const token = await fetchStreamToken(user.id, session.access_token)
        if (cancelled) return

        if (token) {
          setUserToken(token)
          setConnected(true)
        }
      } catch {
        // Graceful degradation — Stream is optional
      }
    }

    setup()
    return () => { cancelled = true }
  }, [user?.id, session?.access_token])

  return (
    <StreamContext.Provider value={{
      connected,
      unreadCount,
      apiKey: STREAM_API_KEY || '',
      userId: user?.id ?? null,
      userName,
      userToken,
    }}>
      {children}
    </StreamContext.Provider>
  )
}

export function useStream() {
  return useContext(StreamContext)
}
