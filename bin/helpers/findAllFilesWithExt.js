const fs = require('fs')
const path = require('path')

const findFilesWithExt = (directoryPath, extension) => {
  if (!fs.existsSync(directoryPath)) {
    console.log('No directory found: ', directoryPath)
    return []
  }

  const fileNames = fs.readdirSync(directoryPath)
  if (!fileNames.length) {
    return []
  }

  return fileNames.reduce((accumulatedFilePaths, fileName) => {
    const filePath = path.join(directoryPath, fileName)
    if (filePath.includes('node_modules')) return accumulatedFilePaths

    const stat = fs.lstatSync(filePath)
    const ext = path.extname(filePath)
    if (stat.isDirectory()) {
      return accumulatedFilePaths.concat(findFilesWithExt(filePath, extension))
    } else if (ext === extension) {
      return accumulatedFilePaths.concat(filePath)
    }
    return accumulatedFilePaths
  }, [])
}

module.exports = findFilesWithExt
