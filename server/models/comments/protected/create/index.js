const { queryPromise } = require('@utils')

const create = injection =>
  queryPromise(
    `
  INSERT INTO
    comments
  SET
    ?
`,
    injection
  )

module.exports = {
  create
}
