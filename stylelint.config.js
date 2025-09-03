export default {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss', 'stylelint-config-clean-order'],
  rules: {
    'at-rule-no-deprecated': null,
    'custom-property-pattern': null,
    'comment-word-disallowed-list': [
      ['.*'],
      {
        severity: 'error',
        message: 'no comments in css allowed',
      },
    ],
    'comment-pattern': [
      '^$',
      {
        message: 'no comments in css allowed',
        reportDisables: true,
      },
    ],
  },
};
