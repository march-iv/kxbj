'use strict'  // 声明为严格模式
// 执行 check-versions.js 里的函数，检查node和npm的版本
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')  // 引入ora模块，可以在控制台显示编译信息
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start() // 开始显示编译信息

// 删除静态资源的二级目录下所有内容
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()  // 停止编译信息的显示
    if (err) throw err  // 如果出错，抛出错误
    process.stdout.write(stats.toString({ // 配置编译信息的显示样式
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
