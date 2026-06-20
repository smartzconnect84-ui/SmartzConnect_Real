import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type CallType = 'video' | 'audio'

export interface ActiveCall {
  roomId: string
  type: CallType
  participantName: string
  participantEmoji?: string
  participantAvatar?: string
}

interface JitsiCallContextValue {
  activeCall: ActiveCall | null
  startCall: (call: ActiveCall) => void
  endCall: () => void
}

const JitsiCallContext = createContext<JitsiCallContextValue | null>(null)

export function JitsiCallProvider({ children }: { children: ReactNode }) {
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null)

  const startCall = useCallback((call: ActiveCall) => {
    setActiveCall(call)
  }, [])

  const endCall = useCallback(() => {
    setActiveCall(null)
  }, [])

  return (
    <JitsiCallContext.Provider value={{ activeCall, startCall, endCall }}>
      {children}
    </JitsiCallContext.Provider>
  )
}

export function useJitsiCall() {
  const ctx = useContext(JitsiCallContext)
  if (!ctx) throw new Error('useJitsiCall must be used inside JitsiCallProvider')
  return ctx
}
