const { queryPromise } = require('@utils')

const destroy = injection =>
  queryPromise(
    `
  DELETE FROM
    posts
  WHERE
    id = ?
`,
    injection
  )

module.exports = {
  destroy
}
