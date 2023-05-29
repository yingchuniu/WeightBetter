/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        colors: {
            primary: "#6677C8",
            yellow: "#FFE4A3",
            pink: "#FFA5AE",
            teal: "#1BB6B2",
            "teal-light": "#1BB6B280",
            mainblack: "#2F2D3F",
            white: "#FFFFFF",
            gray: "#A9A9A9",
            main: '#6677C8',
            mainyellow: '#FFE4A3',
            maingrey: '#aaa'
        },
        boxShadow: {
            sm: "0px 2px 4px 0px rgba(11,10,55,0.15)",
            lg: "0px 8px 20px 0px rgba(18,16,99,0.06)",
        },
        extend: {},
        fontSize: {
            h1: '40px',
            h2: '32px',
            h3: '24px',
            h4: '20px',
            h5: '16px',
            h6: '14px',
            h7: '12px',
            h8: '10px',
        },
        screens: {
            'sm': '576px',
            // => @media (min-width: 640px) { ... }
            'md': '768px',
            // => @media (min-width: 768px) { ... }
            'lg': '992px',
            // => @media (min-width: 1024px) { ... }
            'xl': '1200px',
            // => @media (min-width: 1280px) { ... }
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        }
    },

    plugins: [],
};
