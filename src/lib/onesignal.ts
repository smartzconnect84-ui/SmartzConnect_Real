const appId = import.meta.env.VITE_ONESIGNAL_APP_ID as string

export function initOneSignal() {
  if (!appId) {
    console.warn('⚠️  VITE_ONESIGNAL_APP_ID not set. Push notifications disabled.')
    return
  }

  // Load OneSignal SDK
  const script = document.createElement('script')
  script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
  script.defer = true
  script.onload = () => {
    ;(window as any).OneSignalDeferred = (window as any).OneSignalDeferred || []
    ;(window as any).OneSignalDeferred.push(async (OneSignal: any) => {
      await OneSignal.init({
        appId,
        safari_web_id: `web.onesignal.auto.${appId}`,
        notifyButton: { enable: false },
        allowLocalhostAsSecureOrigin: true,
      })
    })
  }
  document.head.appendChild(script)
}

export async function linkOneSignalUser(userId: string) {
  if (!appId) return

  const os = (window as any).OneSignal
  if (!os) return

  try {
    await os.login(userId)
    await os.User.addTag('user_id', userId)
  } catch (err) {
    console.warn('OneSignal user link failed:', err)
  }
}

export async function unlinkOneSignalUser() {
  const os = (window as any).OneSignal
  if (!os) return
  try {
    await os.logout()
  } catch {}
}

export async function requestNotificationPermission() {
  const os = (window as any).OneSignal
  if (!os) return false
  try {
    await os.Notifications.requestPermission()
    return os.Notifications.permission
  } catch {
    return false
  }
}

export async function sendPushNotification({
  userId,
  title,
  message,
  url,
}: {
  userId: string
  title: string
  message: string
  url?: string
}) {
  const { supabase } = await import('@/lib/supabase')
  try {
    await supabase.functions.invoke('send-push', {
      body: { userId, title, message, url },
    })
  } catch (err) {
    console.warn('Push notification send failed:', err)
  }
}
