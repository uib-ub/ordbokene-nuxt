// Some values syncronized with routing in middleware
import { defineStore } from 'pinia'
export const useStore = defineStore('store', {
    state: () => ({
      q:"",
      input: "",
      originalInput: "",
      selected: {},
      scope: "ei",
      advanced: false,
      dict: "bm,nn",
      autocompletePending: false,
      autocomplete: [],
      suggest: null,
      suggest_from: null,
      articles: {},
      searchUrl: null,
      view: null,
      concepts_bm: [],
      concepts_nn: [],
      top_suggestion: null,
    })
  })