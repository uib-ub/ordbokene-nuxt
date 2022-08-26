// Store that syncronizes with routing
import { defineStore } from 'pinia'


export const useStore = defineStore('store', {
    state: () => ({
      input: "",
      selected: {},
      scope: "e",
      dict: "bm,nn",
      autocompletePending: false,
      autocomplete: [],
      suggest: {},
      results_nn: [],
      results_bm: [],
      searchUrl: null,
      view: null
    })
  })