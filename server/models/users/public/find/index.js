const { queryPromise } = require('@utils')

const findById = injection =>
  queryPromise(
    `
      SELECT
        id,
        status,
        providerId,
        provider,
        displayName,
        email,
        profileUrl
      FROM
        users
      WHERE
        id = ?
    `,
    injection
  )

const findByProviderId = injection =>
  queryPromise(
    `
    SELECT
      id,
      status,
      providerId,
      provider,
      displayName,
      email,
      profileUrl
    FROM
      users
    WHERE
      providerId = ?
  `,
    injection
  )

module.exports = {
  findById,
  findByProviderId
}
