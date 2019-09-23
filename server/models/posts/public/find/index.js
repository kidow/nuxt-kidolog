const con = require('@mysql')

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id,
        title,
        content,
        createdAt,
        tags,
        intro
      FROM
        posts
      WHERE
        id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result[0])
    })
  })
}

const find = ({ offset, search }) => {
  const searchSQL = search ? 'WHERE (p.tags LIKE ? OR p.title LIKE ?)' : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`, `%${search}%`)
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.id,
        p.thumbnail,
        p.title,
        p.createdAt,
        p.content,
        p.intro,
        (
          SELECT
            COUNT(comments.id)
          FROM
            posts
          LEFT JOIN
            comments
          ON
            comments.postId = posts.id
          WHERE
            posts.id = p.id
        ) AS commentCount
      FROM
        posts p
      ${searchSQL}
      ORDER BY
        p.createdAt DESC
      LIMIT 15
      ${offsetSQL}
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findNext = ({ offset = 0, search }) => {
  const searchSQL = search ? 'WHERE (tags LIKE ? OR title LIKE ?)' : ''
  let injection = []
  if (search) injection.push(`%${search}%`, `%${search}%`)
  injection.push(Number(offset) + 6)
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id
      FROM
        posts
      ${searchSQL}
      LIMIT 1
      OFFSET ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findSitemaps = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        CONCAT("/post/", title, '-', id) AS url,
        "weekly" AS changefreq,
        DATE_FORMAT(createdAt, "%Y-%m-%dT%T.000Z") AS lastmodISO
      FROM
        posts
      ORDER BY
        createdAt DESC
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  findById,
  find,
  findSitemaps,
  findNext
}
