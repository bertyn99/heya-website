export function apiErrorMessage(error: unknown, fallback = 'Une erreur est survenue') {
  if (!error || typeof error !== 'object') {
    return fallback
  }

  const record = error as {
    message?: unknown
    statusMessage?: unknown
    data?: { message?: unknown, statusMessage?: unknown }
  }

  const fromData = record.data?.message ?? record.data?.statusMessage
  if (typeof fromData === 'string' && fromData.trim()) {
    return fromData
  }

  if (typeof record.message === 'string' && record.message.trim()) {
    return record.message
  }

  if (typeof record.statusMessage === 'string' && record.statusMessage.trim()) {
    return record.statusMessage
  }

  return fallback
}
