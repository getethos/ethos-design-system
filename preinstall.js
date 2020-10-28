const fs = require('fs')
const { spawnSync } = require('child_process')

// Create .npmrc file for fontawesome for netlify
//
// https://community.netlify.com/t/common-issue-using-private-npm-modules-on-netlify/795/26
// Netlify does not support Github Packages (or other private package registries besides npm), options are:
//   - Commit .npmrc to repo - However, now we have a secret token inside our repo
//   - Environment variable in .npmrc - However, this requires all developer machines to have the same environment variable configured
//   - Get creative with the preinstall script... :)

// Only run this script on Netlify
if (process.env.NETLIFY === 'true') {
  // this is a default Netlify environment variable
  // Check if .npmrc already exists, if it does then do nothing (otherwise we create an infinite yarn loop)
  const npmRcContent = `@fortawesome:registry=https://npm.fontawesome.com/\n//npm.fontawesome.com/:_authToken=${process.env.FONTAWESOME_TOKEN}`

  if (!fs.existsSync('.npmrc')) {
    // Create .npmrc
    fs.writeFileSync('.npmrc', npmRcContent)
    fs.chmodSync('.npmrc', 0o600)
    // Run yarn again, because the yarn process which is executing
    // this script won't pick up the .npmrc file we just created.
    // The original yarn process will continue after this second yarn process finishes,
    // and when it does it will report "success Already up-to-date."
    spawnSync('yarn', { stdio: 'inherit' })
  }
}
