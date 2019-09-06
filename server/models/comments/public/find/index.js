const { queryPromise } = require('@utils')

const findByPostId = injection =>
  queryPromise(
    `
      SELECT
        c.id,
        c.parentId,
        c.content,
        u.thumbnail,
        u.displayName,
        c.createdAt

      FROM
        comments c
      JOIN
        users u
      ON
        c.userId = u.id
      WHERE
        postId = ?
    `,
    injection
  )

module.exports = {
  findByPostId
}
