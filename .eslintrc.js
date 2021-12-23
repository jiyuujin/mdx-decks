module.exports = {
  extends: ['@nekohack/eslint-config-react'],
  root: true,
  env: { node: true, es6: true },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
}
