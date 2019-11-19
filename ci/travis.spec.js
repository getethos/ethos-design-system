const path = require('path')
const proc = require('child_process')

// These tests should only run on CI. To test them locally, pass in the required
// environment variables, e.g. `TRAVIS_PULL_REQUEST_BRANCH=feat/foo yarn test`.

const {
  TRAVIS_PULL_REQUEST_BRANCH: PR_BRANCH,
  TRAVIS_PULL_REQUEST_SHA: PR_COMMIT,
} = process.env

const BASE_BRANCH = 'master'

describe('Travis CI', () => {
  describe('PR builds', () => {
    describe('must increment the package.json version', () => {
      if (!PR_BRANCH) {
        it.skip(`(test only enabled on PR builds in CI)`, test.todo)
        return
      }

      it('has incremented the package.json version', () => {
        const prVersion = versionNumbersAtRef(PR_COMMIT)
        const baseVersion = versionNumbersAtRef(BASE_BRANCH)

        const isMajorChange = prVersion.major !== baseVersion.major
        const isMinorChange = prVersion.minor !== baseVersion.minor

        if (isMajorChange) {
          expect(prVersion.major).toBeGreaterThan(baseVersion.major)
          return
        }

        if (isMinorChange) {
          expect(prVersion.minor).toBeGreaterThan(baseVersion.minor)
          return
        }

        // If your PR fails on this test, run `yarn release` in your branch.
        expect(prVersion.patch).toBeGreaterThan(baseVersion.patch)
      })
    })
  })
})

function gitFile({ filePath, refName }) {
  return exec(`git show ${refName}:${filePath}`)
}

function exec(command) {
  const projectRoot = path.join(__dirname, '..')
  return String(proc.execSync(command, { cwd: projectRoot, encoding: 'utf-8' }))
}

function versionAtRef(refName = BASE_BRANCH) {
  const packageJson = gitFile({ filePath: 'package.json', refName })
  return JSON.parse(packageJson).version
}

// We compare the parts of version as strings so we can have parts like
// '1.1.17-beta.1' in which case the patch and prerelease will get
// combined to: "17-beta1" which can be compared to say "17-beta2" in
// expect(prVersion.patch).toBeGreaterThan(baseVersion.patch)
function versionNumbersAtRef() {
  const [major, minor, patch, extra] = versionAtRef().split('.')
  let combinedPatch = patch
  if (patch && extra) {
    combinedPatch = `${patch}${extra}`
  }
  return { major, minor, combinedPatch }
}
