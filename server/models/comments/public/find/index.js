const con = require('@mysql')

const findByPostId = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
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
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  findByPostId
}
