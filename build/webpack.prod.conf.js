'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Version = new Date().getTime()  // 相当于版本号，防止浏览器缓存

// 获取当前环境
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

// const env = require('../config/prod.env')  // XFJB 把上面的 env 改成了这句

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 将.vue外部的css或css预处理器文件进行处理
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  // 是否开启调试
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash]'+ Version + '.js'),
    // 定义在非入口文件引用的文件的名称
    chunkFilename: utils.assetsPath('js/[id].[chunkhash]'+ Version + '.js')
  },
  plugins: [
    // 定义一个在编译时间内可以使用的全局变量，用来关闭vue的所有警告功能
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 最小化所有JavaScript输出块，消除无作用的代码
    new UglifyJsPlugin({
      uglifyOptions: {
        // output:{ comments:false },  // 删除注释
        compress: {
          warnings: false
          // pure_funcs: ['console.log'] // 禁用console.log函数
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // ExtractTextPlugin 会将所有的「入口 chunk(entry chunks)」中的 require("style.css") 移动到独立分离的css文件。
    // 因此，样式不再内联到javascript里面，但会放到一个单独的css包文件 (styles.css)当中。 
    // 如果样式文件较大，这会更快，因为样式文件会跟javascript包并行加载
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // 构建要编译输出的index.html,并在文件中嵌入资源文件
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // 输出的HTML文件名
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      // 模板文件路径
      template: 'index.html',
      // 设置为true或body可以将js代码放到<body>元素最后
      // 设置为head将js代码加到<head>里面
      // 设置为false所有静态资源css和JavaScript都不会注入到模板文件中
      inject: true,
      minify: {
        // 删除注释
        removeComments: true,
        // 合并空白
        collapseWhitespace: true,
        // 删除属性的引号
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // 通过 CommonsChunkPlugin 控制 chunks 在 html 文件中添加的顺序  
      // 设置为 dependency 即按照它们之间的依赖关系添加
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // webpack 将公共模块打包的 vendor.js 里面使用 CommonsChunkPlugin 将 vendor.js 分离到单独的文件
    new webpack.optimize.CommonsChunkPlugin({
      // 公共模块名字
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 使用 CommonsChunkPlugin 可以保证如果我们的第三方插件没有变动，在打包的时候可以不被重新的打包
    // 待到上线后就不会重新的加载以达到缓存的目的
    // 我们会获得 webpack 执行时间和输出一份 json 文件保存 chunk 的 id 和最终引用它们的文件印射关系
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // 复制 static 文件夹内的静态资源到打包好的文件中
    // 具体的路径是之前我们设置的 "config.build.assetsSubDirectory"
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// 如果开启了Gzip压缩，使用以下配置
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// 如果开启了编译报告，使用以下配置
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
