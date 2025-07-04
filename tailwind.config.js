// tailwind.config.js
/** @type {import('tailwindcss').Config} */

// Importe os plugins do Tailwind que você instalou
// Certifique-se de instalar esses pacotes primeiro:
// npm install tw-animate-css tailwindcss-intersect tailwindcss-motion
// ou
// yarn add tw-animate-css tailwindcss-intersect tailwindcss-motion
const twAnimateCss = require('tw-animate-css');
const tailwindcssIntersect = require('tailwindcss-intersect');
const tailwindcssMotion = require('tailwindcss-motion');

module.exports = {
    // Configuração para o modo escuro, se você estiver usando classes para alternar
    darkMode: 'class', // Ou 'media' se preferir baseado na preferência do sistema

    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        // Adicione outros caminhos onde você usa classes Tailwind
    ],
    theme: {
        extend: {
            // Mapeamento das suas variáveis CSS para as cores do Tailwind
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: 'var(--card)',
                'card-foreground': 'var(--card-foreground)',
                popover: 'var(--popover)',
                'popover-foreground': 'var(--popover-foreground)',
                primary: 'var(--primary)',
                'primary-foreground': 'var(--primary-foreground)',
                secondary: 'var(--secondary)',
                'secondary-foreground': 'var(--secondary-foreground)',
                muted: 'var(--muted)',
                'muted-foreground': 'var(--muted-foreground)',
                accent: 'var(--accent)',
                'accent-foreground': 'var(--accent-foreground)',
                destructive: 'var(--destructive)',
                'destructive-foreground': 'var(--destructive-foreground)',
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                'chart-1': 'var(--chart-1)',
                'chart-2': 'var(--chart-2)',
                'chart-3': 'var(--chart-3)',
                'chart-4': 'var(--chart-4)',
                'chart-5': 'var(--chart-5)',
                sidebar: 'var(--sidebar)',
                'sidebar-foreground': 'var(--sidebar-foreground)',
                'sidebar-primary': 'var(--sidebar-primary)',
                'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
                'sidebar-accent': 'var(--sidebar-accent)',
                'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
                'sidebar-border': 'var(--sidebar-border)',
                'sidebar-ring': 'var(--sidebar-ring)',
                // Mantendo suas cores personalizadas para os botões, se ainda quiser usá-las diretamente
                'primary-purple': '#62458D',
                'primary-pink': '#EA4379',
                'dark-purple-shadow': '#3b235f', // Cor da sombra para o botão roxo
                'dark-pink-shadow': '#B02B50',   // Cor da sombra para o botão rosa (um rosa mais escuro)
            },

            // Mapeamento das suas variáveis CSS para as fontes do Tailwind
            fontFamily: {
                sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
                serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
            },

            // Mapeamento das suas variáveis CSS para o border-radius do Tailwind
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                xl: 'calc(var(--radius) + 4px)', // Adicionado com base no seu CSS
            },

            // Mapeamento das suas variáveis CSS para as sombras do Tailwind
            boxShadow: {
                '2xs': 'var(--shadow-2xs)',
                'xs': 'var(--shadow-xs)',
                'sm': 'var(--shadow-sm)',
                'DEFAULT': 'var(--shadow)', // Mapeia a classe 'shadow' padrão
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
                '2xl': 'var(--shadow-2xl)',
                // Sombra original (se ainda precisar dela)
                'inner-custom-purple': 'inset 0px 8px 1.5px #3b235f',
                // Novas sombras para o efeito na parte superior (hover)
                'inner-top-purple': 'inset 0px -8px 1.5px var(--dark-purple-shadow)',
                'inner-top-pink': 'inset 0px -8px 1.5px var(--dark-pink-shadow)',
                // Novas sombras para o estado 'active' (clique)
                'active-inner-top-purple': 'inset 0px -8px 1.5px var(--dark-purple-shadow)',
                'active-inner-top-pink': 'inset 0px -8px 1.5px var(--dark-pink-shadow)',
            },
        },
    },
    plugins: [
        // Se você usa esses plugins, eles precisam ser importados e adicionados aqui
        twAnimateCss,
        tailwindcssIntersect,
        tailwindcssMotion,
    ],
}
