/** @type {import('next').NextConfig} */
module.exports = ({
  webpack(config, { isServer }) {
    if (isServer) {
      config.module.rules.push({
        test: /[/\\]node_modules[/\\]vectordb[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: '@vercel/webpack-asset-relocator-loader',
        }
      })
    }
    return config;
  }
})
