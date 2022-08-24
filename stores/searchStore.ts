// Store that syncronizes with routing
import { defineStore } from 'pinia'


export const useStore = defineStore('store', {
    state: () => ({
      q: "",
      selected: {},
      scope: "e",
      dict: "bm,nn",
      autocompletePending: false,
      autocomplete: [],
      suggest: {},
      results_nn: [],
      results_bm: [],
      searchUrl: null
    })
  })