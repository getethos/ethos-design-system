import { v4 as uuidv4 } from 'uuid'

export const CTA_IDS = {
  BUTTON: {
    INNER: 'universal-navbar-expanded-button-inner',
    OUTER: 'universal-navbar-expanded-button-outer',
  },
}

export const LINKS = {
  // These are used e.g. in the logo and CTA button:
  INDEX: { href: '/' },
  TERM: { href: '/term' },

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
      href: '/login/',
      title: 'Account',
    },
  ],
}
