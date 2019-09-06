const { queryPromise } = require('@utils')

const update = injection =>
  queryPromise(
    `
  UPDATE
    comments
  SET
    ?
`,
    injection
  )

module.exports = {
  update
}
