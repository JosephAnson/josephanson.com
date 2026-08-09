import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.github/agents/**',
    '.github/hooks/**',
    '.github/skills/**',
    'app/components/CanvasUi/**',
  ],
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
