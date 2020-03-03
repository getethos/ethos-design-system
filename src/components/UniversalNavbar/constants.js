import uuidv4 from 'uuid/v4'

export const termHref = '/term'
export const accountHref = '/login/'

export const LINKS = {
  // These are used e.g. in the logo and CTA button:
  INDEX: { href: '/' },
  TERM: { href: termHref },

  // These are used in the navigation links proper:
  NAVLINKS: [
    {
      id: uuidv4(),
      href: '/how-it-works/',
      title: 'How it works',
    },
    {
      id: uuidv4(),
      href: '/why-ethos/',
      title: 'Why Ethos',
    },
    {
      id: uuidv4(),
      href: '/faq/',
      title: 'FAQ',
    },
    {
      id: uuidv4(),
      href: '/search/',
      title: 'Search',
    },
    {
      id: uuidv4(),
      href: accountHref,
      title: 'Account',
    },
  ],
}
