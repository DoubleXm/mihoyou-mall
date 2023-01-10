module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
  ],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['**/*.{css,scss,vue}'],
      customSyntax: 'postcss-scss',
    },
  ],
  ignoreFontFamilies: ['iconfont'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [true,
      { ignorePseudoClasses: ['v-deep'] },
    ],
    'scss/at-import-partial-extension': 'never',
    'no-duplicate-selectors': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'unit-case': null,
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}
