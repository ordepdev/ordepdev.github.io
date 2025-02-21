const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.md",
        "./_now/*.md",
        "./_posts/*.md",
        "./_drafts/*.md",
        "./_layouts/*.{html,js}",
        "./_includes/*.{html,js}",
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                proseBody: '#575279',       // --tw-prose-body
                proseLinks: '#575279',      // --tw-prose-links
                proseInvertBody: '#e0def4', // --tw-prose-invert-body
                proseInvertLinks: '#e0def4',   // --tw-prose-invert-links
                rosePine: {
                    base: "#191724",
                    surface: "#1f1d2e",
                    overlay: "#26233a",
                    muted: "#6e6a86",
                    subtle: "#908caa",
                    text: "#e0def4",
                    love: "#eb6f92",
                    gold: "#f6c177",
                    rose: "#ebbcba",
                    pine: "#31748f",
                    foam: "#9ccfd8",
                    iris: "#c4a7e7",
                    highlightLow: "#21202e",
                    highlightMed: "#403d52",
                    highlightHigh: "#524f67",
                },
                rosePineMoon: {
                    base: "#232136",
                    surface: "#2a273f",
                    overlay: "#393552",
                    muted: "#6e6a86",
                    subtle: "#908caa",
                    text: "#e0def4",
                    love: "#eb6f92",
                    gold: "#f6c177",
                    rose: "#ea9a97",
                    pine: "#3e8fb0",
                    foam: "#9ccfd8",
                    iris: "#c4a7e7",
                    highlightLow: "#2a283e",
                    highlightMed: "#44415a",
                    highlightHigh: "#56526e",
                },
                rosePineDawn: {
                    base: "#faf4ed",
                    surface: "#fffaf3",
                    overlay: "#f2e9e1",
                    muted: "#9893a5",
                    subtle: "#797593",
                    text: "#575279",
                    love: "#b4637a",
                    gold: "#ea9d34",
                    rose: "#d7827e",
                    pine: "#286983",
                    foam: "#56949f",
                    iris: "#907aa9",
                    highlightLow: "#f4ede8",
                    highlightMed: "#dfdad9",
                    highlightHigh: "#cecacd",
                }
            },
            fontFamily: {},
            typography: {
                DEFAULT: {
                    css: {
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        // For inline code
                        'code': {
                            backgroundColor: '#f4ede8', // rosepinedawn highlight-low
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25rem',
                        },
                        '.dark code': {
                            backgroundColor: '#21202e', // rosepine highlight-med
                        },
                        blockquote: {
                            // Disables the quotes around blockquotes that
                            // Tailwind includes by default. They look decent,
                            // but turn into a real mess if you do things like
                            // cite a source (tick appears after the source's
                            // name) or include a list.
                            quotes: "none",
                        },
// Default (Light) theme using rosePineDawn
                        '--tw-prose-body': '#575279', // dawn text
                        '--tw-prose-headings': '#575279', // dawn text
                        '--tw-prose-lead': '#797593', // dawn subtle
                        '--tw-prose-links': '#907aa9', // dawn iris
                        '--tw-prose-bold': '#575279', // dawn text
                        '--tw-prose-counters': '#9893a5', // dawn muted
                        '--tw-prose-bullets': '#9893a5', // dawn muted
                        '--tw-prose-hr': '#f4ede8', // dawn highlightLow
                        '--tw-prose-quotes': '#575279', // dawn text
                        '--tw-prose-quote-borders': '#797593', // dawn subtle
                        '--tw-prose-captions': '#797593', // dawn subtle
                        '--tw-prose-code': '#286983', // dawn pine
                        '--tw-prose-pre-code': '#faf4ed', // dawn base
                        '--tw-prose-pre-bg': '#575279', // dawn text
                        '--tw-prose-th-borders': '#dfdad9', // dawn highlightMed
                        '--tw-prose-td-borders': '#f4ede8', // dawn highlightLow

                        // Inverted (Dark) theme using rosePine
                        '--tw-prose-invert-body': '#e0def4', // pine text
                        '--tw-prose-invert-headings': '#e0def4', // pine text
                        '--tw-prose-invert-lead': '#908caa', // pine subtle
                        '--tw-prose-invert-links': '#c4a7e7', // pine iris
                        '--tw-prose-invert-bold': '#e0def4', // pine text
                        '--tw-prose-invert-counters': '#6e6a86', // pine muted
                        '--tw-prose-invert-bullets': '#6e6a86', // pine muted
                        '--tw-prose-invert-hr': '#21202e', // pine highlightLow
                        '--tw-prose-invert-quotes': '#e0def4', // pine text
                        '--tw-prose-invert-quote-borders': '#908caa', // pine subtle
                        '--tw-prose-invert-captions': '#908caa', // pine subtle
                        '--tw-prose-invert-code': '#31748f', // pine pine
                        '--tw-prose-invert-pre-code': '#191724', // pine base
                        '--tw-prose-invert-pre-bg': '#1f1d2e', // pine surface
                        '--tw-prose-invert-th-borders': '#403d52', // pine highlightMed
                        '--tw-prose-invert-td-borders': '#21202e', // pine highlightLow
                    },
                },
            },
        }
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}

