const findAllFilesWithExt = require('./findAllFilesWithExt')

module.exports = function findAllFilesInDirectory(fileDirectories, extension) {
  return fileDirectories.reduce((memo, directory) => {
    return memo.concat(findAllFilesWithExt(directory, extension))
  }, [])
}
