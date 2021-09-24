module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['long'] =
        '/node_modules/bytebuffer/node_modules/long/dist/Long.js'
      config.resolve.alias['Long'] =
        '/node_modules/bytebuffer/node_modules/long/dist/Long.js'
    }

    return config
  },
}
