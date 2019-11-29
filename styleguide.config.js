const path = require('path')
const isCi = process.env.NODE_ENV === 'ci'

requirePaths = [
  path.join(__dirname, 'styleguide/content/content.scss'),
  path.join(__dirname, 'src/core/design-system.css'),
]
if (!isCi) {
  requirePaths.push(path.join(__dirname, 'src/fonts/index.css'))
}

// Configuration for react-styleguidist which outputs design system by
// globbing our various component directories e.g. `src/core` directory
// houses our Core React components, whereas `src/xhr/components` house
// our Xhr related components. Each component has a complimentary .md example
// which is what gets displayed in the EDS. For more info on this see:
// https://github.com/styleguidist/react-styleguidist/pull/588
module.exports = {
  title: 'EDS',
  skipComponentsWithoutExample: true,
  exampleMode: 'expand',
  usageMode: 'expand',
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.js$/, '.md')
  },
  pagePerSection: true,
  require: requirePaths,
  sections: [
    {
      name: 'Colors',
      content: './styleguide/content/color/color.md',
    },
    {
      name: 'Core',
      content: './src/core/index.md',
      components: './src/core/**/*.js',
      sectionDepth: 2,
    },
    {
      name: 'Xhr',
      content: './src/xhr/components/index.md',
      components: './src/xhr/components/**/*.js',
      exampleMode: 'expand',
      usageMode: 'expand',
    },
    {
      name: 'Nora',
      content: './src/nora/components/index.md',
      components: './src/nora/components/**/*.js',
      exampleMode: 'expand',
      usageMode: 'expand',
    },
  ],
  serverPort: 9008,
}
