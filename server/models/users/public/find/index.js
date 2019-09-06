const con = require('@mysql')

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
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
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result[0])
    })
  })
}

module.exports = {
  findById
}
