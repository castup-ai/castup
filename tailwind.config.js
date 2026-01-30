/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light theme with warm colors
                primary: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#FF7A5A', // Main orange
                    600: '#FF6A4A',
                    700: '#ea580c',
                    800: '#c2410c',
                    900: '#9a3412',
                },
                secondary: {
                    50: '#fefce8',
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#facc15',
                    500: '#FFC107', // Main gold
                    600: '#eab308',
                    700: '#ca8a04',
                    800: '#a16207',
                    900: '#854d0e',
                },
                warm: {
                    50: '#FFFCF7',
                    100: '#FFF8F0', // Main background
                    200: '#FFE5DD',
                    300: '#FFD4C0',
                },
                text: {
                    primary: '#3C3C3C',
                    secondary: '#6B6B6B',
                    muted: '#9CA3AF',
                },
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
            },
            backgroundImage: {
                'gradient-warm': 'linear-gradient(135deg, #FFF8F0 0%, #FFE5DD 100%)',
                'gradient-orange': 'linear-gradient(135deg, #FF7A5A 0%, #FFC107 100%)',
            },
            boxShadow: {
                'orange': '0 10px 40px rgba(255, 122, 90, 0.2)',
                'gold': '0 10px 40px rgba(255, 193, 7, 0.2)',
            },
        },
    },
    plugins: [],
}
