import type { Config } from 'tailwindcss'


export default {
    content: ['./index.html', './src/**/*.{js,ts,tsx,jsx}'],
    theme: {
        extennd: {
            colors: {
                'card-default': '#FFF00',
                'card-matched': '#60DD8E',
                'card-hidden': '#07302E'
            }
        }
    }
} satisfies Config