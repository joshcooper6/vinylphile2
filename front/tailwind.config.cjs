/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.jsx',
    './src/components/AlbumCard.jsx',
    './src/components/SideCart.jsx',
    './src/components/AddToListButton.jsx',
    './src/components/Header.jsx',
    './src/components/Footer.jsx',
    './src/components/SVG.jsx',
    './src/components/Inventory.jsx',
    './src/components/ActiveAlbumModal.jsx',
    './src/components/FlipAlbumCover.jsx',
    './src/components/SearchBar.jsx',
    './src/components/TermsModal.jsx',
    './src/components/PromoBar.jsx'
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
    },
  },
  plugins: [],
}
