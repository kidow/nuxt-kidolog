const con = require('@mysql')

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id,
        status,
        providerId,
        provider,
        displayName,
        profileUrl
      FROM
        users
      WHERE
        id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findByProviderId = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id,
        status,
        providerId,
        provider,
        displayName,
        profileUrl
      FROM
        users
      WHERE
        providerId = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  findById,
  findByProviderId
}
