/** @type {import('next').NextConfig} */
module.exports = ({
  experimental: {
    outputFileTracingIncludes: {
      "src/app/api/**": [
          "node_modules/@lancedb/vectordb-linux-x64-gnu",
      ],
  },
  },
  webpack(config, { isServer }) {
    config.externals.push({ vectordb: 'vectordb' })
    return config;
  }
})
