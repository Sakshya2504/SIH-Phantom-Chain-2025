/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#10b981',
                'primary-dark': '#059669',
                dark: {
                    100: '#1f2937',
                    200: '#111827',
                    300: '#0f172a',
                }
            }
        },
    },
    plugins: [],
}
