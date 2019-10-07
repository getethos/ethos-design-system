const path = require('path')

// Configuration for react-styleguidist which outputs design system by
// globbing our src/components directory for React components with .md examples
// We ignore warnings e.g. Button.js matches a pattern defined in "components"...
// https://github.com/styleguidist/react-styleguidist/pull/588
module.exports = {
  title: 'Design System',
  skipComponentsWithoutExample: true,
  exampleMode: 'expand',
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.js$/, '.md')
  },
  pagePerSection: true,
  require: [
    path.join(__dirname, 'styleguide/content/content.scss'),
    path.join(__dirname, 'src/components/design-system.css'),
    path.join(__dirname, 'src/fonts/index.css'),
    path.join(__dirname, 'src/libs/lazysizes.min.js'),
  ],
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
}
