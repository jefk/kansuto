module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-1fr': 'auto 1fr',
      },
    },
  },
  variants: {},
  plugins: [],
}
