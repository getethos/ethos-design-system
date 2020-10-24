const path = require('path')
const fs = require('fs')
// eslint-disable-next-line no-unused-vars
const glob = require('glob')
const isCi = process.env.NODE_ENV === 'ci'

// eslint-disable-next-line no-undef
requirePaths = [
  path.join(__dirname, 'styleguide/content/content.scss'),
  path.join(__dirname, 'src/components/design-system.css'),
  path.join(__dirname, 'setupCoreJsPollyfills.js'),
]
if (!isCi) {
  // eslint-disable-next-line no-undef
  requirePaths.push(path.join(__dirname, 'src/fonts/index.css'))
}

// Configuration for react-styleguidist which outputs design system by
// globbing our src/components directory for React components with .md examples
// We ignore warnings e.g. Button.js matches a pattern defined in "components"...
// https://github.com/styleguidist/react-styleguidist/pull/588
module.exports = {
  propsParser: (filePath, source, resolver, handlers) => {
    return require('react-docgen').parse(source, resolver, handlers)
  },
  title: 'EDS',
  skipComponentsWithoutExample: true,
  exampleMode: 'expand',
  usageMode: 'expand',
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.(j|t)sx?$/, '.md')
  },
  // This callback allows us to display the source code of a file within markdown:
  // ```js { "file": "../mySourceCode.js" }
  // Reference:
  // https://react-styleguidist.js.org/docs/cookbook.html#how-to-display-the-source-code-of-any-file
  updateExample(props, exampleFilePath) {
    // props.settings are passed by any fenced code block, in this case
    const { settings, lang } = props
    // "../mySourceCode.js"
    if (settings && typeof settings.file === 'string') {
      const filepath = path.resolve(
        path.dirname(exampleFilePath), // just path -- removes the filename itself
        settings.file
      )
      // displays the block as static code
      settings.static = true
      // no longer needed
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
  // eslint-disable-next-line no-undef
  require: requirePaths,
  sections: [
    {
      name: 'Colors',
      content: './styleguide/content/color/color.md',
    },
    {
      name: 'Guidelines',
      sections: [
        {
          name: 'Accessibility',
          content: './src/guidelines/a11y.md',
        },
        {
          name: 'Contribute',
          content: './src/guidelines/contribute.md',
        },
      ],
    },
    {
      name: 'Components',
      content: './src/components/content.md',
      components: './src/components/**/*.{js,jsx,ts,tsx}',
      sectionDepth: 2,
    },
    {
      name: 'Hooks',
      content: './src/hooks/content.md',
      components: './src/hooks/**/*.{js,jsx,ts,tsx}',
      sectionDepth: 2,
    },
    {
      name: 'Validators',
      content: './src/validators/content.md',
      components: './src/validators/**/*.{js,jsx,ts,tsx}',
      sectionDepth: 2,
    },
    {
      name: 'Nora',
      content: './src/nora/content.md',
      components: './src/nora/components/**/*.{js,jsx,ts,tsx}',
    },
    {
      name: 'Xhr',
      content: './src/xhr/content.md',
      components: './src/xhr/components/**/*.{js,jsx,ts,tsx}',
      sectionDepth: 2,
    },
  ],
  assetsDir: ['src/assets'],
  serverPort: 9008,
}
