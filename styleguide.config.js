const path = require('path')
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
  title: 'Design System',
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
      components: './src/components/**/*.js',
      sectionDepth: 2,
    },
  ],
  serverPort: 9008,
}
