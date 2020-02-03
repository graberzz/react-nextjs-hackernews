/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname)
    return config
  },
})
