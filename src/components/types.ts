export type LinkItem = {
  href: string
  title: string
  id: string
  subcopy?: string
}
export type Links = {
  INDEX?: LinkItem
  CTA?: LinkItem
  ACCOUNT?: LinkItem
  SEARCH?: LinkItem
  NAVLINKS?: {
    title: string
    id: string
    subnav: {
      cta?: LinkItem
      items: LinkItem[]
    }
  }[]
}
