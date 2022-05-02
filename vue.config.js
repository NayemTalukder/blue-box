module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_BASE_URL
    : '/',

  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js',
        'jquery': 'jquery/src/jquery.js'
      }
    }
  },

  productionSourceMap: false,
  chainWebpack: config => {
    config.module.rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader').loader('file-loader')
  }
}
