import { auditEnricher } from 'evlog'

export default defineNitroPlugin((nitroApp) => {
  const enrich = auditEnricher()

  nitroApp.hooks.hook('evlog:enrich', (ctx) => {
    enrich(ctx)
  })
})
