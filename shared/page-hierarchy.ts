export interface NestedPageParent {
  slug: string
  title?: string | null
  parent?: NestedPageParent | null
}

export const HOME_PAGE_SLUG = 'accueil'

/** Path segments that must never appear in a page slug (filesystem / pretty-URL traps). */
export const RESERVED_PAGE_SEGMENTS = ['index'] as const

export function pageSlugSegments(slug: string): string[] {
  return slug.replace(/^\/+/u, '').split('/').filter(Boolean)
}

export function isReservedPageSegment(segment: string): boolean {
  return (RESERVED_PAGE_SEGMENTS as readonly string[]).includes(segment)
}

export function isHomePageSlug(
  slug: string,
  parent?: NestedPageParent | string | null
): boolean {
  const hasParent = parent != null && parent !== ''
    && (typeof parent === 'string' || Boolean(parent.slug))

  return pageSlugSegments(slug).join('/') === HOME_PAGE_SLUG && !hasParent
}

export function normalizePublicPath(slugOrPath: string): string {
  const parts = slugOrPath.replace(/^\/+/u, '').split('/').filter(Boolean)
  return `/${parts.join('/')}`
}

export function lookupPublicPath(slugOrPath: string): string {
  const path = normalizePublicPath(slugOrPath)
  if (path === '/' || path === `/${HOME_PAGE_SLUG}`) {
    return `/${HOME_PAGE_SLUG}`
  }
  return path
}

export function publicPathToUrl(publicPath: string): string {
  if (publicPath === `/${HOME_PAGE_SLUG}` || publicPath === '/') {
    return '/'
  }
  return publicPath
}

export function pagePublicPath(slug: string, parent?: NestedPageParent | null): string {
  const trimmed = slug.replace(/^\/+/u, '').trim()

  if (isHomePageSlug(trimmed, parent)) {
    return '/'
  }

  if (trimmed.includes('/')) {
    return `/${trimmed}`
  }

  const buildParentPath = (currentParent: NestedPageParent | null | undefined): string => {
    if (!currentParent?.slug) {
      return ''
    }

    if (isHomePageSlug(currentParent.slug, currentParent.parent ?? null)) {
      return buildParentPath(currentParent.parent)
    }

    const ancestorPath = buildParentPath(currentParent.parent)
    return ancestorPath ? `${ancestorPath}/${currentParent.slug}` : currentParent.slug
  }

  const parentPath = buildParentPath(parent)
  return parentPath ? `/${parentPath}/${trimmed}` : `/${trimmed}`
}

export interface PageHierarchyNode extends NestedPageParent {
  title?: string | null
}

export interface PageTreeSource {
  id: string
  slug: string
  title: string
  parentId?: string | null
  parent?: PageHierarchyNode | null
}

export interface PageTreeRow<T extends PageTreeSource = PageTreeSource> extends T {
  depth: number
  publicPath: string
  filiation: string
}

export function pageHierarchyLabel(node: Pick<PageTreeSource, 'title' | 'slug'>): string {
  const title = node.title?.trim()
  if (title) {
    return title
  }
  return node.slug
}

export function pageAncestorLabels(parent?: PageHierarchyNode | null): string[] {
  const labels: string[] = []
  let current: PageHierarchyNode | null | undefined = parent
  while (current) {
    labels.unshift(pageHierarchyLabel({
      title: current.title ?? current.slug,
      slug: current.slug
    }))
    current = current.parent ?? null
  }
  return labels
}

export function pageFiliationLabel(
  parent: PageHierarchyNode | null | undefined,
  rootLabel = 'Page racine'
): string {
  const ancestors = pageAncestorLabels(parent)
  return ancestors.length > 0 ? ancestors.join(' / ') : rootLabel
}

export function parentChainFromIds<T extends PageTreeSource>(
  page: T,
  byId: Map<string, T>,
  maxHops = 64
): PageHierarchyNode | null {
  if (page.parentId == null) {
    return null
  }

  const nodes: PageHierarchyNode[] = []
  const visited = new Set<string>()
  let currentId: string | null = page.parentId

  for (let hop = 0; currentId != null && hop < maxHops; hop++) {
    if (visited.has(currentId)) {
      break
    }
    visited.add(currentId)
    const ancestor = byId.get(currentId)
    if (!ancestor) {
      break
    }
    nodes.unshift({
      slug: ancestor.slug,
      title: ancestor.title,
      parent: null
    })
    currentId = ancestor.parentId ?? null
  }

  for (let i = 0; i < nodes.length; i++) {
    nodes[i]!.parent = i > 0 ? nodes[i - 1]! : null
  }

  return nodes.length > 0 ? nodes[nodes.length - 1]! : null
}

export function resolvePagePublicPath<T extends PageTreeSource>(
  page: T,
  byId: Map<string, T>
): string {
  return pagePublicPath(page.slug, parentChainFromIds(page, byId))
}

export function orderPagesAsTree<T extends PageTreeSource>(pages: T[]): PageTreeRow<T>[] {
  const byId = new Map(pages.map(page => [page.id, page]))
  const childrenByParent = new Map<string | 'root', T[]>()

  for (const page of pages) {
    const parentKey
      = page.parentId != null && byId.has(page.parentId) ? page.parentId : 'root'
    const bucket = childrenByParent.get(parentKey) ?? []
    bucket.push(page)
    childrenByParent.set(parentKey, bucket)
  }

  const sortSiblings = (a: T, b: T) =>
    pageHierarchyLabel(a).localeCompare(pageHierarchyLabel(b), 'fr', { sensitivity: 'base' })

  const ordered: PageTreeRow<T>[] = []

  const walk = (parentKey: string | 'root', depth: number) => {
    const siblings = [...(childrenByParent.get(parentKey) ?? [])].sort(sortSiblings)
    for (const page of siblings) {
      const parentChain = parentChainFromIds(page, byId)
      ordered.push({
        ...page,
        depth,
        publicPath: resolvePagePublicPath(page, byId),
        filiation: pageFiliationLabel(parentChain)
      })
      walk(page.id, depth + 1)
    }
  }

  walk('root', 0)

  const placed = new Set(ordered.map(row => row.id))
  const orphans = pages.filter(page => !placed.has(page.id)).sort(sortSiblings)

  for (const page of orphans) {
    const parentChain = parentChainFromIds(page, byId)
    ordered.push({
      ...page,
      depth: 0,
      publicPath: resolvePagePublicPath(page, byId),
      filiation: pageFiliationLabel(parentChain)
    })
  }

  return ordered
}
