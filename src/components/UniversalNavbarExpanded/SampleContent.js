/**
 * Sample of UniversalNavbarExpanded links.
 * For demonstration in styleguide & test files (.md/.test.js files) only!
 * Real implementation of this structure should use uuid() for id values!
 *
 * TODO when Kustomer implementation is ready and we want to include a talk button
 *      add TALK to the object with href & title
 */
export const CMS_LINKS = {
  // These are used e.g. in the logo, icons and bottom of mobile nav:
  INDEX: { href: '/' },
  CTA: {
    href: '/term',
    title: 'Check my price',
  },
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
      id: 'NAVLINKS_MOCK_ID_1',
      title: 'What we offer',
      subnav: {
        cta: {
          href: '/#/Components/UniversalNavbarExpanded',
          title: 'Our plans',
          subcopy:
            'Learn more about term life insurance and the plans and options you have available.',
          id: 'NAVLINKS_MOCK_ID_2',
        },
        items: [
          {
            id: 'NAVLINKS_MOCK_ID_3',
            href: '/#/Components/UniversalNavbarExpanded',
            title: 'What is term life insurance and how much does it cost?',
          },
          {
            id: 'NAVLINKS_MOCK_ID_4',
            href: '/how-it-works/',
            title: 'How our application process works',
          },
          {
            id: 'NAVLINKS_MOCK_ID_5',
            href: '/life/who-needs-life-insurance/',
            title: 'Do I need life insurance?',
          },
          {
            id: 'NAVLINKS_MOCK_ID_6',
            href: '/life/how-choose-right-type-life-insurance/',
            title: 'Choosing your coverage amount and term length',
          },
          {
            id: 'NAVLINKS_MOCK_ID_7',
            href: '/app/needs/',
            title: 'Coverage calculator',
          },
        ],
      },
    },
    {
      id: 'NAVLINKS_MOCK_ID_8',
      title: 'Life insurance basics',
      subnav: {
        cta: {
          href: '/life/life-insurance-basics/',
          title: 'Life insurance 101',
          subcopy:
            'Wondering where to start? We’ve broken down the essentials for you.',
          id: 'NAVLINKS_MOCK_ID_9',
        },
        items: [
          {
            id: 'NAVLINKS_MOCK_ID_10',
            href: '/life/term-group-whole/',
            title:
              'What are the main types of life insurance and how do they work?',
          },
          {
            id: 'NAVLINKS_MOCK_ID_11',
            href: '/life/underwriting-explained/',
            title: 'What is underwriting and how long does it take?',
          },
          {
            id: 'NAVLINKS_MOCK_ID_12',
            href: '/life/pick-beneficiary/',
            title: 'Choosing your beneficiary',
          },
          {
            id: 'NAVLINKS_MOCK_ID_13',
            href: '/life/who-needs-sp/',
            title: "What if I don't work?",
          },
          {
            id: 'NAVLINKS_MOCK_ID_14',
            href: '/life/employer-sponsored-life-insurance/',
            title: 'Is my life insurance through work enough?',
          },
        ],
      },
    },
    {
      id: 'NAVLINKS_MOCK_ID_15',
      title: 'Why Ethos',
      subnav: {
        cta: {
          href: '/why-ethos/',
          title: 'The Ethos Difference',
          subcopy:
            'We put people before profit. Find out how we bring our policyholders the best experience possible.',
          id: 'NAVLINKS_MOCK_ID_16',
        },
        items: [
          {
            id: 'NAVLINKS_MOCK_ID_17',
            href: '/about/',
            title: 'Our mission',
          },
          {
            id: 'NAVLINKS_MOCK_ID_18',
            href: '/reviews/',
            title: 'Reviews',
          },
          {
            id: 'NAVLINKS_MOCK_ID_19',
            href: '/life/customer-stories/',
            title: 'Customer stories',
          },
          {
            id: 'NAVLINKS_MOCK_ID_20',
            href: '/life/ethosforgood/',
            title: 'Ethos for Good',
          },
          {
            id: 'NAVLINKS_MOCK_ID_21',
            href: '/friends/',
            title: 'Refer a friend',
          },
        ],
      },
    },
    {
      id: 'NAVLINKS_MOCK_ID_22',
      title: 'Help Center',
      subnav: {
        cta: {
          href: '/faq/',
          title: 'FAQ',
          subcopy:
            'Life insurance can be complicated, but don’t worry. We’re here to help answer your questions.',
          id: 'NAVLINKS_MOCK_ID_23',
        },
        items: [
          {
            id: 'NAVLINKS_MOCK_ID_24',
            href: '/faq/life-insurance-basics/',
            title: 'Questions about life insurance',
          },
          {
            id: 'NAVLINKS_MOCK_ID_25',
            href: '/faq/ethos/',
            title: 'Questions about Ethos',
          },
          {
            id: 'NAVLINKS_MOCK_ID_26',
            href: '/faq/application/',
            title: 'Questions about your application',
          },
          {
            id: 'NAVLINKS_MOCK_ID_27',
            href: '/faq/policy/',
            title: 'Questions about your policy',
          },
          {
            id: 'NAVLINKS_MOCK_ID_28',
            href: '/contact-us/',
            title: 'Contact us',
          },
        ],
      },
    },
  ],
}
