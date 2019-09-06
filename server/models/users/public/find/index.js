const { queryPromise } = require('@utils')

const findById = injection =>
  queryPromise(
    `
      SELECT
        id,
        providerId,
        provider,
        displayName,
        thumbnail
      FROM
        users
      WHERE
        providerId = ?
    `,
    injection
  )

module.exports = {
  findById
}
