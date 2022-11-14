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
        primary: {
          DEFAULT: "#560027",
          lighten: "#711f3d",
          darken: "#3c0012"
        },
        secondary: {
          DEFAULT: "#BC477B",
          lighten: "#d96295",
          darken: "#9f2b62"
        },
        tertiary: {
          DEFAULT: "#FDF4F5",
          darken: "#e0d8d9"
        },
        text: "black",
        canvas: "white",
        anchor: "#880E4F"
      }

    }
    
  }
});
