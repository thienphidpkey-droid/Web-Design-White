/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                neu: {
                    base: '#e0e5ec',
                    light: '#ffffff',
                    dark: '#a3b1c6',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-left': 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-right': 'slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-down-fade': 'slideDownFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                slideInLeft: {
                    'from': { opacity: '0', transform: 'translateX(-100px)' },
                    'to': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    'from': { opacity: '0', transform: 'translateX(100px)' },
                    'to': { opacity: '1', transform: 'translateX(0)' },
                },
                slideDownFade: {
                    'from': { opacity: '0', transform: 'translateY(-50px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            boxShadow: {
                'neu': '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff',
                'neu-pressed': 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff',
            }
        },
    },
    plugins: [],
}
