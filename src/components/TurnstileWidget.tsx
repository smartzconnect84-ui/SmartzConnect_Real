import { Turnstile } from '@marsidev/react-turnstile'

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  className?: string
}

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string

const PROD_HOSTNAME = 'smartzconnect.com'
const CF_PAGES_HOSTNAME = 'smartzconnect.pages.dev'

const isProduction = typeof window !== 'undefined' &&
  (window.location.hostname === PROD_HOSTNAME ||
   window.location.hostname.endsWith('.' + PROD_HOSTNAME) ||
   window.location.hostname === CF_PAGES_HOSTNAME ||
   window.location.hostname.endsWith('.' + CF_PAGES_HOSTNAME))

export default function TurnstileWidget({
  onSuccess,
  onError,
  onExpire,
  className = '',
}: TurnstileWidgetProps) {
  if (!siteKey || !isProduction) {
    return null
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme: 'auto',
          size: 'flexible',
        }}
      />
    </div>
  )
}
