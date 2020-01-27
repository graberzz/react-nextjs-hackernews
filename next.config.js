/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname)
    return config
  },
}
