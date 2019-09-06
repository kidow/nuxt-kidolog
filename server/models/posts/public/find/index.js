const { queryPromise } = require('@utils')

const findById = injection =>
  queryPromise(
    `
      SELECT
        id,
        title,
        content,
        createdAt,
        tags
      FROM
        posts
      WHERE
        id = ?
    `,
    injection
  )

const find = ({ offset, search }) => {
  const searchSQL = search ? 'WHERE tag LIKE ?' : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`)
  if (offset) injection.push(Number(offset))
  queryPromise(
    `
      SELECT
        id,
        thumbnail,
        title,
        createdAt,
        content
      FROM
        posts
      ${searchSQL}
      ${offsetSQL}
    `,
    injection
  )
}

const findSitemaps = queryPromise(
  `
    SELECT
      CONCAT("/post/", title, '-', id) AS url,
      "weekly" AS changefreq,
      DATE_FORMAT(createdAt, "%Y-%m-%dT%T.000Z") AS lastmodISO
    FROM
      posts
    ORDER BY
      createdAt DESC
  `
)

module.exports = {
  findById,
  find,
  findSitemaps
}
