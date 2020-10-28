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
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4],
        'space-infix-ops': 'error', // 要求操作符周围有空格
        'comma-spacing': 'error', // 逗号后面加空格
        'arrow-spacing': 'error', // 使用 => 前后空格
        'spaced-comment': 'warn', // 注释风格，前后留一个空格
        'no-irregular-whitespace': 'error', // 不能有不规则的空格
        'no-mixed-spaces-and-tabs': 'error', // 不能混用空格和tab
        'no-multiple-empty-lines': 'error', // 不能有多余的空行
        'no-var': 'error', // 不能使用var
        'no-new': 'off',
        'new-cap': 'off', // 不要求构造函数首字母大写
        'eqeqeq': 'error', // 使用全等
        'quotes': [1, 'single'], // 引号类型，使用单引号
        'camelcase': 'off'
    }
}
