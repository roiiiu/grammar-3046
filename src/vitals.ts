import type { Metric } from 'web-vitals'
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals'

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

function getConnectionSpeed(): string {
  return 'connection' in navigator && (navigator.connection as any) && 'effectiveType' in (navigator.connection as any)
    ? (navigator.connection as any).effectiveType as string
    : ''
}

interface AnalyticsOptions {
  params: { [s: string]: any } | ArrayLike<any>
  path: string
  analyticsId: string
  debug: boolean
}

export function sendToAnalytics(metric: Metric, options: AnalyticsOptions): void {
  const page = Object.entries(options.params).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path,
  )

  const body = {
    dsn: options.analyticsId,
    id: metric.id,
    page,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob)
  }
  else {
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    })
  }
}

export function webVitals(options: AnalyticsOptions): void {
  try {
    onFID(metric => sendToAnalytics(metric, options))
    onTTFB(metric => sendToAnalytics(metric, options))
    onLCP(metric => sendToAnalytics(metric, options))
    onCLS(metric => sendToAnalytics(metric, options))
    onFCP(metric => sendToAnalytics(metric, options))
  }
  catch (err) {
    console.error('[Analytics]', err)
  }
}
