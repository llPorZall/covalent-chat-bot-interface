module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    screens: {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1366px',
      '2xl': '1600px',
    },
    minWidth: {
      180: '180px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
