import { audit, createError, createRequestLogger } from 'evlog'
import { createLocalAccountIssuer } from '@better-auth/core/db'
import { hashPassword } from 'better-auth/crypto'
import { eq } from 'drizzle-orm'

export async function seedAdminUser() {
  const log = createRequestLogger()
  log.set({ job: 'seed-admin' })
  const email = (process.env.ADMIN_EMAIL || 'elise@heyaconvivialite.fr').toLowerCase()
  const password = process.env.ADMIN_PASSWORD

  if (!password) {
    throw createError({
      message: 'Impossible de créer l\'admin',
      status: 500,
      why: 'ADMIN_PASSWORD non défini',
      fix: 'Définir ADMIN_PASSWORD dans les variables d\'environnement'
    })
  }

  log.set({ seed: { email } })

  const existing = await db.query.user.findFirst({
    where: eq(schema.user.email, email)
  })

  if (existing) {
    log.set({ seed: { result: 'skipped' } })
    log.emit()
    return { result: 'skipped' as const, email }
  }

  const userId = crypto.randomUUID()
  const accountId = crypto.randomUUID()
  const hashedPassword = await hashPassword(password)
  const issuer = createLocalAccountIssuer('credential')

  await db.insert(schema.user).values({
    id: userId,
    name: 'Elise Furnon',
    email,
    emailVerified: true,
    image: null
  })

  await db.insert(schema.account).values({
    id: accountId,
    userId,
    providerId: 'credential',
    issuer,
    accountId: userId,
    password: hashedPassword
  })

  audit({
    action: 'cms.user.seed',
    actor: { type: 'system', id: 'seed-admin' },
    target: { type: 'user', id: userId, email },
    outcome: 'success'
  })

  log.set({ seed: { result: 'created', userId } })
  log.emit()

  return { result: 'created' as const, email }
}
