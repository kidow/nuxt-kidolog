const { queryPromise } = require('@utils')

const update = injection =>
  queryPromise(
    `
    UPDATE
      posts
    SET
      ?
  `,
    injection
  )

module.exports = {
  update
}
