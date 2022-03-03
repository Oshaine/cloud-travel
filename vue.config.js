module.exports = {
  //   publicPath:
  //     process.env.NODE_ENV === "production"
  //       ? process.env.BASE_URL_PROD
  //       : process.env.BASE_URL_DEV,

  devServer: {
    proxy: process.env.BASE_URL_PROD,
  },
};
