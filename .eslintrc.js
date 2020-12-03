// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "quotes": [0, "double"],
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],  // iview 自定义闭合标签的报错，如 <Input></Input>
    "semi": [0],                        // 
    "indent": [0, "tab"],               // 取消强制使用一致的缩进
    "no-tabs": "off",                   // 取消禁用 tab
    "no-unused-vars": [0],              // 取消禁止出现未使用过的变量
    "no-mixed-spaces-and-tabs": "off",  // 不检查是否混用空格和tap
    "camelcase": [0],                   // 取消强制驼峰命名要求
    "no-multi-spaces": [0],             // 取消禁止使用多个空格
    "eol-last": [0],                    // 取消文件末尾需要换行
    "no-multiple-empty-lines": [0],     // 取消禁止出现多行空行
    "object-property-newline": [0],     // 取消强制将对象的属性放在不同的行上
    "no-trailing-spaces": [0],          // 取消不允许使用尾随空间
    "one-var": [0],                     // 不再强制变量必须一起或分开声明
    "no-new": "off"                     // 不再禁止使用 new
  }
}
