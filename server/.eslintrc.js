module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
  },
};
