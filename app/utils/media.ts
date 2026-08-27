export function mediaAltFromPathname(pathname: string): string {
  const base = pathname.split('/').pop() ?? 'image'
  return base.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim() || 'image'
}
