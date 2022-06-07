module.exports = {
  reactStrictMode: true,
  env: {
    URL: process.env.URL,
  },
    api: {
        bodyParser: {
            sizeLimit: '8mb' // Set desired value here
        }
    }

}
