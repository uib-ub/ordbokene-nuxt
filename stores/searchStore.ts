// Store that syncronizes with routing
import { defineStore } from 'pinia'


export const useStore = defineStore('store', {
    state: () => ({
      q: "",
      scope: "e",
      dict: "bm,nn",
      autocomplete: [],
      suggest: {},
      results_nn: [],
      results_bm: []
    })
  })