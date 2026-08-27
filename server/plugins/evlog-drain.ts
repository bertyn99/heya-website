import { auditOnly } from 'evlog'
import { createFsDrain } from 'evlog/fs'

export default defineNitroPlugin((nitroApp) => {
  const allLogs = createFsDrain({
    dir: '.evlog/logs',
    pretty: import.meta.dev,
    maxFiles: 14
  })

  const auditLogs = auditOnly(createFsDrain({
    dir: '.evlog/audit',
    pretty: import.meta.dev,
    maxFiles: 90
  }))

  nitroApp.hooks.hook('evlog:drain', allLogs)
  nitroApp.hooks.hook('evlog:drain', auditLogs)
})
