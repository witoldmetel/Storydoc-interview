module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'simple-import-sort'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'no-console': 1,
    'no-undef': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-useless-escape': 0,
    'no-nested-ternary': 0,

    /**
     * IMPORT SORT
     */
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    /**
     * IMPORT
     */
    'import/prefer-default-export': 0,

    /**
     * PRETTIER
     */
    'prettier/prettier': [
      //or whatever plugin that is causing the clash
      'error',
      {
        tabWidth: 2,
      },
    ],

    /**
     * TYPESCRIPT
     */
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/explicit-function-return-type': 1,
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-function-return-type': 0,

    /**
     * REACT
     */
    'react/react-in-jsx-scope': 0,
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react-refresh/only-export-components': [1, { allowConstantExport: true }],
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
};
