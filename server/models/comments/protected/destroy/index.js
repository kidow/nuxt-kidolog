const { queryPromise } = require('@utils')

const destroy = injection =>
  queryPromise(
    `
  DELETE FROM
    comments
  WHERE
    id = ?
`,
    injection
  )

module.exports = {
  destroy
}
