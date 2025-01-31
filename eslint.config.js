import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  jsonc: true,
  typescript: true,
  markdown: true,
  yaml: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
})
