const illegalRegex = /[*|\"<>[\]{}`\\;=]/g

const restrict = (val) => val.replace(illegalRegex, '')
export default restrict
