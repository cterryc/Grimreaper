/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Guild Branding
        primary: '#1152d4',
        'primary-hover': '#0d3fa8',

        // Backgrounds
        'background-light': '#f6f6f8',
        'background-dark': '#101622',
        'background-darker': '#0a0c0e',
        'surface-dark': '#111722',
        'surface-darker': '#192233',

        // Class Colors (WoW)
        'class-dk': '#C41F3B',
        'class-druid': '#FF7D0A',
        'class-hunter': '#ABD473',
        'class-mage': '#3FC7EB',
        'class-paladin': '#F48CBA',
        'class-priest': '#FFFFFF',
        'class-rogue': '#FFF569',
        'class-shaman': '#0070DE',
        'class-warlock': '#8787ED',
        'class-warrior': '#C79C6E',

        // UI Colors
        'accent-gold': '#C89B3C',
        'accent-gold-light': '#ffd700',
        'border-color': '#324467',
        'text-secondary': '#92a4c9',
        'text-muted': '#7e7f83'
      },
      fontFamily: {
        display: ['Spline Sans', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem'
      },
      backgroundColor: {
        'elf-bg': "url('/src/assets/bg-elf.png')"
      },
      backdropBlur: {
        sm: '2px'
      }
    }
  },
  plugins: []
}
