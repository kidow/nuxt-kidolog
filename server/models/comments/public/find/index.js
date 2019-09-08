const con = require('@mysql')

const findByPostId = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        c.id,
        c.parentId,
        c.content,
        u.profileUrl,
        u.displayName,
        c.createdAt,
        c.userId,
        0 AS loading,
        0 AS isReply,
        0 AS isEdit,
        '' AS reply

      FROM
        comments c
      JOIN
        users u
      ON
        c.userId = u.id
      WHERE
        postId = ?
      ORDER BY
        IF (ISNULL(c.parentId), c.id, c.parentId), c.createdAt
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
