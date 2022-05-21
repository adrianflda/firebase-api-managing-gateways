module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'no-console': 1,
        semi: ['error', 'never'],
        quotes: [2, 'single'],
    },
    parserOptions: {
        ecmaVersion: 2021,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
    ]
}