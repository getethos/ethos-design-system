import React from 'react'

const playIcon = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.39941 5L15.1996 10.8002L8.39941 16.6005V10.8002L8.39941 5Z"
      fill="#272727"
    />
    <circle cx="10.5" cy="10.5" r="10" stroke="black" />
  </svg>
)

/**
 * Sample of UniversalNavbarExpanded links.
 * For demonstration in styleguide & test files (.md/.test.js files) only!
 * Real implementation of this structure should use uuid() for id values!
 */
export const SINGLE_CTA = {
  href: 'https://stage.ethoslife.com/agents-portal/',
  title: 'Go to Agent Portal',
}
export const CMS_LINKS = {
  // These are used e.g. in the logo, icons and bottom of mobile nav:
  INDEX: { href: '/' },
  CTA: {
    href: '/term',
    title: 'Check my price',
  },
  SECONDARY_CTA: {
    href: '/login',
    title: 'Login',
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
          title: 'Watch the video',
          subcopy:
            'Learn more about term life insurance and the plans and options you have available.',
          id: 'NAVLINKS_MOCK_ID_2',
          alternateIcon: playIcon,
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
      hasExpandedNav: true,
      subnav: {
        cta: {
          href: '/life/life-insurance-basics/',
          title: 'Life insurance 101',
          ctaText: 'Learn more',
          subcopy: 'A handy guide to life insurance',
          id: 'NAVLINKS_MOCK_ID_9',
          alternateIcon: false,
        },
        items: [
          {
            category: 'Life insurance',
            items: [
              {
                id: 'NAVLINKS_MOCK_ID_10',
                href: '/life/term-group-whole/',
                title: 'No medical exam life insurance',
              },
              {
                id: 'NAVLINKS_MOCK_ID_11',
                href: '/life/underwriting-explained/',
                title: 'Life insurance Rates by Age',
              },
              {
                id: 'NAVLINKS_MOCK_ID_12',
                href: '/life/pick-beneficiary/',
                title: '$500K Life Insurance',
              },
              {
                id: 'NAVLINKS_MOCK_ID_13',
                href: '/life/who-needs-sp/',
                title: '$1 Million Life Insurance',
              },
            ],
          },
          {
            category: 'Term Life',
            items: [
              {
                id: 'NAVLINKS_MOCK_ID_10',
                href: '/life/term-group-whole/',
                title: 'Term Life Insurance',
              },
              {
                id: 'NAVLINKS_MOCK_ID_11',
                href: '/life/underwriting-explained/',
                title: 'Term Insurance Lengths',
              },
              {
                id: 'NAVLINKS_MOCK_ID_12',
                href: '/life/pick-beneficiary/',
                title: 'Term Life Expires Options',
              },
              {
                id: 'NAVLINKS_MOCK_ID_13',
                href: '/life/who-needs-sp/',
                title: 'Converting Term to Whole',
              },
            ],
          },
          {
            category: 'Whole Life',
            items: [
              {
                id: 'NAVLINKS_MOCK_ID_10',
                href: '/life/term-group-whole/',
                title: 'Whole Life Insurance',
              },
              {
                id: 'NAVLINKS_MOCK_ID_11',
                href: '/life/underwriting-explained/',
                title: 'Term Insurance Lengths',
              },
            ],
          },
          {
            category: 'Final Expenses',
            items: [
              {
                id: 'NAVLINKS_MOCK_ID_10',
                href: '/life/term-group-whole/',
                title: 'End of Life Expenses',
              },
              {
                id: 'NAVLINKS_MOCK_ID_11',
                href: '/life/underwriting-explained/',
                title: 'Burial Insurance',
              },
            ],
          },
          {
            category: 'Resources',
            items: [
              {
                id: 'NAVLINKS_MOCK_ID_10',
                href: '/life/term-group-whole/',
                title: 'How much life insurance do i need?',
              },
              {
                id: 'NAVLINKS_MOCK_ID_11',
                href: '/life/underwriting-explained/',
                title: 'How is cost determined',
              },
              {
                id: 'NAVLINKS_MOCK_ID_11',
                href: '/life/underwriting-explained/',
                title: 'Coverage Calculator',
              },
              {
                id: 'NAVLINKS_MOCK_ID_11',
                href: '/life/underwriting-explained/',
                title: 'Life insurance Blog',
              },
            ],
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
          alternateIcon: false,
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
          alternateIcon: false,
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
