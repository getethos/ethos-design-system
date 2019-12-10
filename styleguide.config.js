const path = require('path')
const fs = require('fs')
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

  // This callback allows us to display the source code of a file within markdown:
  // ```js { "file": "../mySourceCode.js" }
  // Reference:
  // https://react-styleguidist.js.org/docs/cookbook.html#how-to-display-the-source-code-of-any-file
  updateExample(props, exampleFilePath) {
    const { settings, lang } = props
    if (typeof settings.file === 'string') {
      const filepath = path.resolve(
        path.dirname(exampleFilePath), // just path -- removes the filename itself
        settings.file
      )
      settings.static = true
      delete settings.file
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang,
      }
    }
    return props
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
      name: 'Nora',
      content: './src/nora/content.md',
      components: './src/nora/components/**/*.js',
    },
    {
      name: 'Xhr',
      content: './src/xhr/content.md',
      components: './src/xhr/components/**/*.js',
      sectionDepth: 2,
    },
  ],
  assetsDir: ['src/assets'],
  serverPort: 9008,
}
