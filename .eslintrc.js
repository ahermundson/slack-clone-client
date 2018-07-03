module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'no-console': 0
  },
  globals: {
    document: 1
  },
  parser: 'babel-eslint',
  env: {
    browser: 1
  }
};
