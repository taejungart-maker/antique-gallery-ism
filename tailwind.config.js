/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#17b0cf",
                "ceramic-primary": "#8C7B65",
                "earthy-brown": "#8B4513",
                "background-light": "#F9F8F4",
                "hanji": "#F5F2EB",
                "ink": "#323232",
            },
            fontFamily: {
                "display": ["Noto Serif", "serif"],
                "noto-kr": ["Noto Serif KR", "serif"],
                "sans": ["Inter", "Noto Sans", "sans-serif"]
            },
        },
    },
    plugins: [],
}