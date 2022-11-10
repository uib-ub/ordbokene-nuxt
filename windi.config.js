import { defineConfig } from 'vite-plugin-windicss';

// @ts-ignore
export default defineConfig({
  theme: {
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      serif: ['Inria Serif', 'serif'],
    },

    extend: {
      colors:{
        primary: "#560027",
        secondary: "#BC477B",
        tertiary: "#FDF4F5",
        anchor: "#880E4F",
      }

    }

    
    
  }
});
