import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'orange-l': {
        '0': '#fff8f2',
        '0.5': '#fee7d5',
        '1': '#fed6b9',
        '2': '#fcb783',
        '3': '#f89e56',
        '4': '#f28c35',
        '5': '#e67c1d',
        '6': '#c7670c',
        '7': '#7b3f03',
        '8': '#331900',
      },
      'leaf-l': {
        '0': '#f7fff2',
        '0.5': '#e1fcd4',
        '1': '#ccf9b6',
        '2': '#a0f07d',
        '3': '#78e14e',
        '4': '#54cb2c',
        '5': '#36ac15',
        '6': '#208508',
        '7': '#115b02',
        '8': '#093300',
      },
      'gray-l': {
        '0': '#ffffff',
        '0.5': '#fcfaf8',
        '1': '#f8f6f2',
        '2': '#ece8e3',
        '3': '#d9d5cf',
        '4': '#bebab5',
        '5': '#979490',
        '6': '#676461',
        '7': '#32312f',
        '8': '#000000',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'Roboto',
          '源ノ角ゴシック JP',
          'Noto Sans JP',
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Hiragino Sans',
          'ヒラギノ角ゴシック',
          'Segoe UI',
          'メイリオ',
          'Meiryo',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;
