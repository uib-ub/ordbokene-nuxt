// Some values syncronized with routing in middleware
import { defineStore } from 'pinia'
export const useStore = defineStore('store', {
    state: () => ({
      q:"",
      input: "",
      originalInput: "",
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
      view: null,
      concepts_bm: [],
      concepts_nn: [],
      top_suggestion: null
    })
  })