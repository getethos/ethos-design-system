const jsf = require('json-schema-faker')
jsf.extend('faker', () => require('faker'))
const mockDataSchema = require('./posts-schema.json')
const fs = require('fs')
const json = jsf.generate(mockDataSchema)
console.log('JSON (posts): ', json)

fs.writeFile('./postsdb.json', JSON.stringify(json, null, 2), function(err) {
  if (err) {
    return console.log(err)
  } else {
    console.log('Mock data generated.')
  }
})
