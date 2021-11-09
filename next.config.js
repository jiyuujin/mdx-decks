const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
})

module.exports = withMDX({
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      }
    }
    return config
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
})
