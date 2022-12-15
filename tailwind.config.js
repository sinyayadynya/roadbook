const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './dist/index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                cotton: {
                    default: '#afaaa3',
                    50: '#fbfbfa',
                    100: '#f4f2f0',
                    200: '#edeae6',
                    300: '#e6e2db',
                    400: '#dbd5cc',
                    500: '#afaaa3',
                    600: '#99958f',
                    700: '#83807a',
                    800: '#585552',
                    900: '#2C2B29',
                },
                cinnamon: {
                    default: '#CD5F15',
                    50: '#FDF3EC',
                    100: '#FCEADF',
                    200: '#F7D0B5',
                    300: '#F3B287',
                    400: '#ED8B4B',
                    500: '#CD5F15',
                    600: '#B95513',
                    700: '#A24B11',
                    800: '#823C0D',
                    900: '#5D2B09',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
