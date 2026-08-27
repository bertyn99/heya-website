import { auditOnly } from 'evlog'
import { createFsDrain } from 'evlog/fs'

export default defineNitroPlugin((nitroApp) => {
  if (!import.meta.dev) {
    return
  }

  const allLogs = createFsDrain({
    dir: '.evlog/logs',
    pretty: true,
    maxFiles: 14
  })

  const auditLogs = auditOnly(createFsDrain({
    dir: '.evlog/audit',
    pretty: true,
    maxFiles: 90
  }))

  nitroApp.hooks.hook('evlog:drain', allLogs)
  nitroApp.hooks.hook('evlog:drain', auditLogs)
})
