import type { ButtonProps } from '@nuxt/ui'
import type { BlockLink } from '#shared/types/blocks'

export function blockLinksToButtons(links: BlockLink[]): ButtonProps[] {
  return links.map(link => ({
    label: link.label,
    to: link.to,
    target: link.target,
    color: link.color ?? 'primary',
    variant: link.variant ?? 'solid',
    icon: link.icon || undefined
  }))
}
