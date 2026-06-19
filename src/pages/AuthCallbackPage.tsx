/**
 * AuthCallbackPage — handles the redirect after:
 *   1. Email confirmation (new signup)
 *   2. Password reset link click
 *
 * Supabase appends #access_token=...&type=signup|recovery to the URL.
 * This page reads the hash, exchanges it for a session, then routes accordingly.
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Loader2 } from 'lucide-react'
import logoImg from '@/assets/logo.png'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your account...')

  useEffect(() => {
    const handleCallback = async () => {
      // Parse the hash fragment Supabase appends to the redirect URL
      const hash = window.location.hash
      const params = new URLSearchParams(hash.replace('#', '?'))
      const type = params.get('type') // 'signup' | 'recovery' | 'email_change'
      const errorDesc = params.get('error_description')

      if (errorDesc) {
        setStatus('error')
        setMessage(decodeURIComponent(errorDesc.replace(/\+/g, ' ')))
        return
      }

      // Let Supabase SDK process the hash and establish the session
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        // Try exchanging the code if present (PKCE flow)
        const code = params.get('code')
        if (code) {
          const { error: exchErr } = await supabase.auth.exchangeCodeForSession(code)
          if (exchErr) {
            setStatus('error')
            setMessage(exchErr.message)
            return
          }
        } else {
          setStatus('error')
          setMessage('Invalid or expired link. Please request a new one.')
          return
        }
      }

      // Route based on type
      if (type === 'recovery') {
        setMessage('Link verified! Redirecting to password reset...')
        setTimeout(() => navigate('/reset-password', { replace: true }), 800)
      } else {
        // signup confirmation or any other type → go to dashboard
        setMessage('Email confirmed! Taking you to your dashboard... 🎉')
        setTimeout(() => navigate('/app/feed', { replace: true }), 1200)
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen dark:bg-[#080510] bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <img src={logoImg} alt="SmartzConnect" className="w-10 h-10 object-contain mx-auto mb-6" />

        {status === 'loading' ? (
          <>
            <div className="w-8 h-8 border-2 border-pink-500/30 border-t-brand-pink rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm dark:text-gray-400 text-gray-600 font-medium">{message}</p>
          </>
        ) : (
          <>
            <p className="text-red-500 font-semibold mb-2">Something went wrong</p>
            <p className="text-sm dark:text-gray-400 text-gray-600 mb-5">{message}</p>
            <div className="flex gap-3 justify-center">
              <a href="/login" className="px-4 py-2 rounded-xl dark:bg-white/5 bg-gray-100 text-sm font-semibold dark:text-gray-300 text-gray-700 hover:text-brand-pink transition-colors">
                Sign In
              </a>
              <a href="/forgot-password" className="px-4 py-2 rounded-xl bg-love-gradient text-white text-sm font-semibold shadow-md shadow-pink-500/20">
                Reset Password
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
