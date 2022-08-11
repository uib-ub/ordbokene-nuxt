import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', {
    state: () => ({
      q: "test",
      scope: "e",
      dict: "bm,nn",
      suggest: {},
      results_nn: [],
      results_bm: []
    }),
  
    getters: {
      query(state) { return  {'q': state.q, 'scope': state.scope} },
    },
  
    actions: {
      submit(newValue,hei) {
        console.log(newValue)
        console.log(hei)
      }
    }
  })