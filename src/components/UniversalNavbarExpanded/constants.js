import uuidv4 from 'uuid/v4'
export const LINKS = {
  // These are used e.g. in the logo, icons and bottom of mobile nav:
  INDEX: { href: '/' },
  TERM: {
    href: '/term',
    title: 'Check my price',
    id: uuidv4(),
  },
  // TALK: {
  //     id: uuidv4(),
  //     href: '/',
  //     title: 'Talk to us',
  //   },
  ACCOUNT: {
    href: '/login/',
    title: 'Account',
    id: uuidv4(),
  },
  SEARCH: {
    href: '/search/',
    title: 'Search',
    id: uuidv4(),
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
      href: null,
      title: 'Life insurance basics',
      subnav: {
        cta: {
          href: '/life/life-insurance-basics/',
          title: 'Life insurance 101',
          subcopy:
            'Wondering where to start? We’ve broken down the essentials for you.',
          id: uuidv4(),
        },
        items: [
          {
            id: uuidv4(),
            href: '/life/term-group-whole/',
            title:
              'What are the main types of life insurance and how do they work?',
          },
          {
            id: uuidv4(),
            href: '/life/underwriting-explained/',
            title: 'What is underwriting and how long does it take?',
          },
          {
            id: uuidv4(),
            href: '/life/pick-beneficiary/',
            title: 'Choosing your beneficiary',
          },
          {
            id: uuidv4(),
            href: '/life/who-needs-sp/',
            title: "What if I don't work?",
          },
          {
            id: uuidv4(),
            href: '/life/employer-sponsored-life-insurance/',
            title: 'Is my life insurance through work enough?',
          },
        ],
      },
    },
    {
      id: uuidv4(),
      href: null,
      title: 'Why Ethos',
      subnav: {
        cta: {
          href: '/why-ethos/',
          title: 'The Ethos Difference',
          subcopy:
            'We put people before profit. Find out how we bring our policyholders the best experience possible.',
          id: uuidv4(),
        },
        items: [
          {
            id: uuidv4(),
            href: '/about/',
            title: 'Our mission',
          },
          {
            id: uuidv4(),
            href: '/reviews/',
            title: 'Reviews',
          },
          {
            id: uuidv4(),
            href: '/life/customer-stories/',
            title: 'Customer stories',
          },
          {
            id: uuidv4(),
            href: '/life/ethosforgood/',
            title: 'Ethos for Good',
          },
          {
            id: uuidv4(),
            href: '/friends/',
            title: 'Refer a friend',
          },
        ],
      },
    },
    {
      id: uuidv4(),
      href: null,
      title: 'Help Center',
      subnav: {
        cta: {
          href: '/faq/',
          title: 'FAQ',
          subcopy:
            'Life insurance can be complicated, but don’t worry. We’re here to help answer your questions.',
          id: uuidv4(),
        },
        items: [
          {
            id: uuidv4(),
            href: '/faq/life-insurance-basics/',
            title: 'Questions about life insurance',
          },
          {
            id: uuidv4(),
            href: '/faq/ethos/',
            title: 'Questions about Ethos',
          },
          {
            id: uuidv4(),
            href: '/faq/application/',
            title: 'Questions about your application',
          },
          {
            id: uuidv4(),
            href: '/faq/policy/',
            title: 'Questions about your policy',
          },
          {
            id: uuidv4(),
            href: '/contact-us/',
            title: 'Contact us',
          },
        ],
      },
    },
  ],
}
