import { createError } from 'evlog'

export function firstReturning<T>(rows: T[]): T {
  const row = rows[0]

  if (!row) {
    throw createError({
      message: 'Écriture base de données échouée',
      status: 500,
      why: 'La requête INSERT/UPDATE n\'a retourné aucune ligne',
      fix: 'Vérifier l\'intégrité des données et les contraintes SQL'
    })
  }

  return row
}
