module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {
    'prettier/prettier': 0,
  },
  overrides: [
    {
      files: ["*.tsx"], // Adjust the file pattern if needed
      rules: {
        "padding-line-between-statements": "off",
      },
    },
  ],
};
