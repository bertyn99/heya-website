import type { H3Event } from 'h3'
import { useLogger } from 'evlog'

type AuditOutcome = 'success' | 'failure' | 'denied'

export async function createAdminContext(event: H3Event) {
  const log = useLogger(event)
  const session = await requireUserSession(event)

  const actor = {
    type: 'user' as const,
    id: session.user.id,
    email: session.user.email ?? undefined
  }

  log.set({ cms: { actor: { id: actor.id, email: actor.email } } })

  return {
    log,
    session,
    actor,
    auditCms(
      action: string,
      target: { type: string, id: string, [key: string]: unknown },
      outcome: AuditOutcome = 'success'
    ) {
      log.audit({ action, actor, target, outcome })
    }
  }
}
