import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, Minimize2, Maximize2
} from 'lucide-react'
import { useJitsiCall } from '@/contexts/JitsiCallContext'

declare global {
  interface Window {
    JitsiMeetExternalAPI: new (domain: string, options: Record<string, unknown>) => any
  }
}

function loadJitsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
      resolve()
      return
    }
    const existing = document.getElementById('jitsi-api-script')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.id = 'jitsi-api-script'
    script.src = 'https://meet.jit.si/external_api.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function JitsiCall() {
  const { activeCall, endCall } = useJitsiCall()
  const containerRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<any>(null)
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [duration, setDuration] = useState(0)
  const [apiReady, setApiReady] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (activeCall) {
      setDuration(0)
      setMuted(false)
      setCameraOff(activeCall.type === 'audio')
      setMinimized(false)
      setApiReady(false)
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [activeCall?.roomId])

  useEffect(() => {
    if (!activeCall || !containerRef.current) return

    let disposed = false

    loadJitsiScript()
      .then(() => {
        if (disposed || !containerRef.current) return

        const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName: activeCall.roomId,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: activeCall.type === 'audio',
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            toolbarButtons: ['microphone', 'camera', 'hangup', 'tileview'],
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_POWERED_BY: false,
            DEFAULT_REMOTE_DISPLAY_NAME: 'SmartzConnect User',
            APP_NAME: 'SmartzConnect',
          },
        })

        api.on('audioMuteStatusChanged', ({ muted: m }: { muted: boolean }) => {
          if (!disposed) setMuted(m)
        })
        api.on('videoMuteStatusChanged', ({ muted: m }: { muted: boolean }) => {
          if (!disposed) setCameraOff(m)
        })
        api.on('readyToClose', () => {
          if (!disposed) endCall()
        })
        api.on('videoConferenceJoined', () => {
          if (!disposed) setApiReady(true)
        })

        apiRef.current = api
      })
      .catch(() => {
        // Script failed to load — call cannot start
        console.error('Jitsi script failed to load')
      })

    return () => {
      disposed = true
      if (apiRef.current) {
        try { apiRef.current.dispose() } catch {}
        apiRef.current = null
      }
      setApiReady(false)
    }
  }, [activeCall?.roomId])

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleToggleMute = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleAudio')
    }
  }

  const handleToggleCamera = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleVideo')
    }
  }

  const handleEndCall = () => {
    if (apiRef.current) {
      try { apiRef.current.executeCommand('hangup') } catch {}
    }
    endCall()
  }

  return (
    <AnimatePresence>
      {activeCall && (
        <>
          {!minimized && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
          )}

          <motion.div
            key="call-window"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={minimized
              ? { opacity: 1, scale: 1, width: 240, height: 160, bottom: 20, right: 20, top: 'auto', left: 'auto', x: 0, y: 0 }
              : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed z-50 dark:bg-[#0D0A14] bg-gray-900 flex flex-col shadow-2xl overflow-hidden
              ${minimized
                ? 'bottom-5 right-5 w-60 h-40 rounded-2xl border dark:border-white/10 border-gray-700'
                : 'inset-2 sm:inset-6 lg:inset-12 rounded-3xl border dark:border-white/10 border-gray-700'
              }`}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-love-gradient flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
                  {activeCall.participantAvatar
                    ? <img src={activeCall.participantAvatar} alt="" className="w-full h-full object-cover" />
                    : (activeCall.participantEmoji || '👤')}
                </div>
                {!minimized && (
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-white truncate">{activeCall.participantName}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-xs text-emerald-400 font-semibold">{formatDuration(duration)}</p>
                      <span className="text-xs text-white/40">·</span>
                      <p className="text-xs text-white/60">
                        {activeCall.type === 'video' ? '📹 Video' : '📞 Audio'} Call
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setMinimized(m => !m)}
                  className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  title={minimized ? 'Expand' : 'Minimize'}
                >
                  {minimized
                    ? <Maximize2 className="w-3.5 h-3.5 text-white" />
                    : <Minimize2 className="w-3.5 h-3.5 text-white" />
                  }
                </button>
                {!minimized && (
                  <button
                    onClick={handleEndCall}
                    className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center hover:bg-red-500/40 transition-colors"
                    title="End call"
                  >
                    <PhoneOff className="w-3.5 h-3.5 text-red-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Jitsi container */}
            <div className={`flex-1 relative bg-black overflow-hidden ${minimized ? 'rounded-b-2xl' : ''}`}>
              <div ref={containerRef} className="absolute inset-0 w-full h-full" />
              {!apiReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-pink-500/30 border-t-brand-pink rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-xs text-white/60">Connecting…</p>
                  </div>
                </div>
              )}
              {minimized && (
                <div
                  onClick={() => setMinimized(false)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group z-10"
                >
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-xl p-2">
                    <Maximize2 className="w-5 h-5 text-white mx-auto mb-1" />
                    <p className="text-[10px] text-white">Tap to expand</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom controls — only when not minimized */}
            {!minimized && (
              <div className="flex items-center justify-center gap-3 px-4 py-4 bg-black/40 backdrop-blur-sm flex-shrink-0">
                <button
                  onClick={handleToggleMute}
                  disabled={!apiReady}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-40 ${muted ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-white/15 hover:bg-white/25'}`}
                  title={muted ? 'Unmute' : 'Mute'}
                >
                  {muted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
                </button>

                <button
                  onClick={handleEndCall}
                  className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-2xl shadow-red-500/50 hover:bg-red-600 transition-colors hover:scale-105 active:scale-95"
                  title="End call"
                >
                  <PhoneOff className="w-6 h-6 text-white" />
                </button>

                {activeCall.type === 'video' && (
                  <button
                    onClick={handleToggleCamera}
                    disabled={!apiReady}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-40 ${cameraOff ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-white/15 hover:bg-white/25'}`}
                    title={cameraOff ? 'Turn camera on' : 'Turn camera off'}
                  >
                    {cameraOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5 text-white" />}
                  </button>
                )}
              </div>
            )}

            {/* Minimized end call button */}
            {minimized && (
              <button
                onClick={handleEndCall}
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-20"
                title="End call"
              >
                <PhoneOff className="w-3.5 h-3.5 text-white" />
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
