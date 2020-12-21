// https://eslint.org/
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  extends: [
    'airbnb-base',
  ],
  env: {
    browser: true,
  },
  plugins: ['import'],
  rules: {
    'import/extensions': 'off',
  },
};
