import { Collapse } from 'bootstrap'

export default defineNuxtPlugin(() => ({
  provide: {
    bootstrap: {
      Collapse,
    },
  },
}));