const { queryPromise } = require('@utils')

const create = injection =>
  queryPromise(
    `
      INSERT INTO
        users
      SET
        ?
    `,
    injection
  )

module.exports = {
  create
}
