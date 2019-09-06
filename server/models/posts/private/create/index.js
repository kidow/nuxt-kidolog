const { queryPromise } = require('@utils')

const create = injection =>
  queryPromise(
    `
    INSERT INTO
      posts
    SET
      ?
    `,
    injection
  )

module.exports = {
  create
}
