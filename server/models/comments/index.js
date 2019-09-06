const protected = require('./protected')
const { ...public } = require('./public')

module.exports = {
  protected,
  ...public
}
