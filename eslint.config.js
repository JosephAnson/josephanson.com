import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
})
