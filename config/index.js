'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},     // 这里可以配置后台联调，还有跨域（待确认）

    // Various Dev Server settings
    host: 'localhost', // 可以被 process.env.HOST 覆盖
    port: 8080, // 可以被 process.env.PORT 覆盖，如果被端口被占用，将确定一个可用的端口
    autoOpenBrowser: false, // 设置为 ture 的话，就会自动打开浏览器
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true, // 是否在控制台显示元素的css来源
    /*proxyTable: {     // XFJB 添加了这个 proxyTable
      '/api': {
        target: 'http://m.xfjb-test.cn/v4.0',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
      }
    }*/
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'), // 打包后文件要存放的路径
    assetsSubDirectory: 'static',   // 除了 index.html 之外的静态资源要存放的路径，
    assetsPublicPath: './', // 代表打包后，index.html里面引用资源的的相对地址

    /**
     * Source Maps
     */

    // 是否显示代码映射
    // 设置为 true, 则打包时会生成map文件映射源码，所以生产环境应当设置为 false
    productionSourceMap: true,

    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
