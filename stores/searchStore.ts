// Store that syncronizes with routing
import { defineStore } from 'pinia'


export const useStore = defineStore('store', {
    state: () => ({
      q:"",
      input: "",
      selected: {},
      scope: "e",
      advanced: false,
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