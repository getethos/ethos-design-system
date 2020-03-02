import uuidv4 from 'uuid/v4'
export const LINKS = {
  // These are used e.g. in the logo, icons and bottom of mobile nav:
  INDEX: { href: '/' },
  TERM: {
    href: '/term',
    title: 'Get covered',
  },
  // TALK: {
  //     id: uuidv4(),
  //     href: '/',
  //     title: 'Talk to us',
  //   },
  ACCOUNT: {
    href: '/login/',
    title: 'Account',
  },
  SEARCH: {
    href: '/search/',
    title: 'Search',
  },

  // These are the main top level link and their subnav items
  NAVLINKS: [
    {
      id: uuidv4(),
      href: null,
      title: 'What we offer',
      subnav: {
        cta: {
          href: '/insurance/term-life-insurance/',
          title: 'Our plans',
          subcopy:
            'Learn more about term life insurance and the plans and options you have available.',
          id: uuidv4(),
        },
        items: [
          {
            id: uuidv4(),
            href: '/life/ethos-term-insurance/',
            title: 'What is term life insurance and how much does it cost?',
          },
          {
            id: uuidv4(),
            href: '/how-it-works/',
            title: 'How our application process works',
          },
          {
            id: uuidv4(),
            href: '/life/who-needs-life-insurance/',
            title: 'Do I need life insurance?',
          },
          {
            id: uuidv4(),
            href: '/life/how-choose-right-type-life-insurance/',
            title: 'Choosing your coverage amount and term length',
          },
          {
            id: uuidv4(),
            href: '/app/needs/',
            title: 'Coverage calculator',
          },
        ],
      },
    },
    {
      id: uuidv4(),
      href: '/life/life-insurance-basics/',
      title: 'Life insurance basics',
    },
    {
      id: uuidv4(),
      href: '/why-ethos/',
      title: 'Why Ethos',
    },
    {
      id: uuidv4(),
      href: '/faq/',
      title: 'Help Center',
    },
  ],
}
