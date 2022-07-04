module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'react/no-access-state-in-setstate': 'off',
    'react/require-default-props': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
