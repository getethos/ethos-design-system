const fs = require('fs')
const path = require('path')
const csstree = require('css-tree')

generateStats().then((stats) => {
  if (process.argv[2] === '--write') writeStats(stats)
})

function generateStats() {
  return generateCssStats().then((cssStats) => {
    return { ...cssStats }
  })
}

function generateCssStats() {
  const cssPath = path.join(__dirname, '../src/core/design-system.css')
  const css = fs.readFileSync(cssPath)
  const ast = csstree.parse(css)

  const cssStats = {
    cssBytes: css.length,
    cssRules: 0,
    cssTypeSelectors: 0,
    cssClassSelectors: 0,
    cssMediaQueries: 0,
  }

  return new Promise((resolve, reject) => {
    csstree.walk(ast, {
      enter: (node) => {
        if (node.type === 'Rule') cssStats.cssRules += 1
        if (node.type === 'TypeSelector') cssStats.cssTypeSelectors += 1
        if (node.type === 'ClassSelector') cssStats.cssClassSelectors += 1
        if (node.type === 'MediaQuery') cssStats.cssMediaQueries += 1
      },
      leave: resolve(cssStats),
    })
  })
}

function writeStats(stats) {
  const statsPath = path.join(__dirname, '../stats.json')
  const statsJson = JSON.stringify(stats, null, 2) + '\n'
  fs.writeFileSync(statsPath, statsJson)
  console.log(statsJson)
}
