import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      'import/no-cycle': 0,
      'no-console': 0,
      'linebreak-style': 0,
      'import/prefer-default-export': 0,
    },
  },
];
