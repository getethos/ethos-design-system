const path = require('path')
const glob = require('glob')
const isCi = process.env.NODE_ENV === 'ci'

requirePaths = [
  path.join(__dirname, 'styleguide/content/content.scss'),
  path.join(__dirname, 'src/components/design-system.css'),
]
if (!isCi) {
  requirePaths.push(path.join(__dirname, 'src/fonts/index.css'))
}

// Configuration for react-styleguidist which outputs design system by
// globbing our src/components directory for React components with .md examples
// We ignore warnings e.g. Button.js matches a pattern defined in "components"...
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
      name: 'Components',
      content: './src/components/content.md',
      components: './src/components/**/*.js',
      sectionDepth: 2,
    },
    {
      name: 'Xhr',
      content: './src/xhr/content.md',
      components: './src/xhr/components/**/*.js',
      sectionDepth: 2,
    },
    {
      name: 'Nora',
      content: './src/nora/content.md',
      components: './src/nora/components/**/*.js',
    },
  ],
  serverPort: 9008,
}
