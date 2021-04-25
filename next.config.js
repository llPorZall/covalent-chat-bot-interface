module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.API_ENDPOINT}:path*`,
      },
    ]
  },
}
