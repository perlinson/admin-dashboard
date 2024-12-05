module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  ignorePatterns: [],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
