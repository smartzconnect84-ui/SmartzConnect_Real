import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, Minimize2,
  Maximize2, RotateCcw, Monitor
} from 'lucide-react'
import { useJitsiCall } from '@/contexts/JitsiCallContext'

export default function JitsiCall() {
  const { activeCall, endCall } = useJitsiCall()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [duration, setDuration] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (activeCall) {
      setDuration(0)
      setMuted(false)
      setCameraOff(activeCall.type === 'audio')
      setMinimized(false)
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [activeCall])

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const jitsiUrl = activeCall
    ? (() => {
        const base = `https://meet.jit.si/${activeCall.roomId}`
        const params = new URLSearchParams({
          'config.startWithAudioMuted': muted ? 'true' : 'false',
          'config.startWithVideoMuted': (activeCall.type === 'audio' || cameraOff) ? 'true' : 'false',
          'config.prejoinPageEnabled': 'false',
          'config.disableDeepLinking': 'true',
          'config.toolbarButtons': JSON.stringify(['microphone', 'camera', 'hangup', 'tileview']),
          'interfaceConfig.SHOW_JITSI_WATERMARK': 'false',
          'interfaceConfig.SHOW_BRAND_WATERMARK': 'false',
          'interfaceConfig.SHOW_POWERED_BY': 'false',
          'interfaceConfig.DEFAULT_REMOTE_DISPLAY_NAME': 'SmartzConnect User',
          'interfaceConfig.APP_NAME': 'SmartzConnect',
        })
        return `${base}#${params.toString()}`
      })()
    : ''

  return (
    <AnimatePresence>
      {activeCall && (
        <>
          {/* Backdrop — only on non-minimized */}
          {!minimized && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
          )}

          {/* Call window */}
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
                    onClick={endCall}
                    className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center hover:bg-red-500/40 transition-colors"
                    title="End call"
                  >
                    <PhoneOff className="w-3.5 h-3.5 text-red-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Jitsi iframe */}
            <div className={`flex-1 relative bg-black overflow-hidden ${minimized ? 'rounded-b-2xl' : ''}`}>
              {jitsiUrl && (
                <iframe
                  ref={iframeRef}
                  src={jitsiUrl}
                  allow="camera; microphone; fullscreen; display-capture; autoplay"
                  className="absolute inset-0 w-full h-full border-0"
                  title="SmartzConnect Video Call"
                />
              )}
              {/* Minimized overlay */}
              {minimized && (
                <div
                  onClick={() => setMinimized(false)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
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
                  onClick={() => setMuted(m => !m)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${muted ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-white/15 hover:bg-white/25'}`}
                  title={muted ? 'Unmute' : 'Mute'}
                >
                  {muted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
                </button>

                <button
                  onClick={endCall}
                  className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-2xl shadow-red-500/50 hover:bg-red-600 transition-colors hover:scale-105 active:scale-95"
                  title="End call"
                >
                  <PhoneOff className="w-6 h-6 text-white" />
                </button>

                {activeCall.type === 'video' && (
                  <button
                    onClick={() => setCameraOff(c => !c)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${cameraOff ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-white/15 hover:bg-white/25'}`}
                    title={cameraOff ? 'Turn camera on' : 'Turn camera off'}
                  >
                    {cameraOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5 text-white" />}
                  </button>
                )}

                {activeCall.type === 'audio' && (
                  <button
                    onClick={() => iframeRef.current?.contentWindow?.location.reload()}
                    className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                    title="Reload"
                  >
                    <RotateCcw className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            )}

            {/* Minimized end call button */}
            {minimized && (
              <button
                onClick={endCall}
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
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
