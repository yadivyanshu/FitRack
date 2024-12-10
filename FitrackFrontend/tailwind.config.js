module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'purple-400': '#9f7aea',
        'pink-500': '#ed64a6',
        'red-500': '#f56565',
        'blue-500': '#4299e1',
        'green-500': '#48bb78',
      },
      backgroundImage: theme => ({
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}