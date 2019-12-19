const index = require('../src/components/index')
const findAllFilesInDirectories = require('./helpers/findAllFilesInDirectories')
const path = require('path')

function verifyExports(files = nonspecJsFiles()) {
  return files
}

export default verifyExports

function nonspecJsFiles() {
  const jsFilesWithSpec = findAllFilesInDirectories(['src/components'], '.js')
  const jsFiles = [...jsFilesWithSpec].filter((file) => {
    return !(
      file.includes('spec') ||
      file.includes('test') ||
      file.includes('index')
    )
  })

  const componentsFromFiles = jsFiles.map((file) => path.basename(file, '.js'))

  const componentsFromIndexImport = Object.entries(index).map(
    (component) => component[0]
  )

  var uniques = componentsFromFiles.filter(
    (obj) => componentsFromIndexImport.indexOf(obj) == -1
  )

  return uniques
}
