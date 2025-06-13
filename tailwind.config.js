const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[500] // ← 정상적으로 색상 적용
      }
    }
  },
  plugins: []
}
