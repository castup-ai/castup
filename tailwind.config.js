/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Cinema-inspired dark theme with gold accents
                primary: {
                    50: '#fef7ee',
                    100: '#fdecd3',
                    200: '#fad6a5',
                    300: '#f7b86d',
                    400: '#f39133',
                    500: '#f0730c',
                    600: '#e15902',
                    700: '#ba4106',
                    800: '#94330c',
                    900: '#772c0d',
                },
                dark: {
                    50: '#f6f6f7',
                    100: '#e1e3e5',
                    200: '#c3c6cc',
                    300: '#9ea3ad',
                    400: '#787f8e',
                    500: '#5f6574',
                    600: '#4b505c',
                    700: '#3d414b',
                    800: '#2d3038',
                    900: '#1a1c23',
                    950: '#0a0b0e',
                },
                gold: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-cinema': 'linear-gradient(135deg, #1a1c23 0%, #2d3038 50%, #3d414b 100%)',
            },
        },
    },
    plugins: [],
}
