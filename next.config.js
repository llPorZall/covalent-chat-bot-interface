console.log('config : ' + process.env.API_ENDPOINT)
module.exports = {
  images: {
    domains: ['logos.covalenthq.com'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.API_ENDPOINT}:path*`,
      },
    ]
  },
}
