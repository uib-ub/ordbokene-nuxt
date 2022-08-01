import { Navbar } from 'bootstrap'

export default defineNuxtPlugin(() => ({
  provide: {
    bootstrap: {
      Navbar,
    },
  },
}));