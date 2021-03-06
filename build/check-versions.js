﻿'use strict'
const chalk = require('chalk')    // chalk:在命令行输出不同颜色文字的模块
const semver = require('semver')  // semver:语义化提示版本的模块
const packageConfig = require('../package.json')  // 引入package.json，用来获取版本
const shell = require('shelljs')  // shelljs:用来执行unix命令的包

function exec (cmd) {
  // require('child_process')调用nodejs子进程，
  // execSync同步的exec方法执行command
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    // process.version是当前使用的node版本信息'v10.15.3'
    // semver.clean('  =v1.2.3   ')返回'1.2.3'
    // semver.clean(process.version)格式化返回当前使用的node版本信息'10.15.3'
    currentVersion: semver.clean(process.version),
    // 从package.json读取node版本要求
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    // 从package.json读取npm版本要求
    versionRequirement: packageConfig.engines.npm
  })
}

// 检测当前的npm和node版本是不是符合package.json中定义的，如果不符合就提示wraning
module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    // 判断现有版本是否满足要求
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  // 打印错误信息
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    // 按照linux的规范，一般成功用0表示，而非0则表示失败。存在不满足版本要求的模块，执行失败
    process.exit(1)
  }
}
