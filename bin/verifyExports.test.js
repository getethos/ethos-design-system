import verifyExports from './verifyExports'

describe('Index exports,  ', () => {
  it('if a EDS component was recently added or removed, fix index then update snapshots', () => {
    expect(verifyExports()).toMatchSnapshot()
  })
})
