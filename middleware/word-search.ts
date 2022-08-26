import { useStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware(async (to) => {
    console.log(to)
    const store = useStore()
    // sync pinia in middleware
    if (/^[0-9]+$/.test(to.params.view[0])) {
        store.view = 'article'
      
      }
      else {
    // Simple search
        if (to.params.view[0] == 'search') {
            console.log("SEARCH")
            store.q = to.query.q
            store.input = store.input || store.q
            store.view = 'search'
        }
        else {
            console.log("WORD", to.params.view[0])
            console.log("INPUT", store.input)
            store.q = to.params.view[0]


            store.input =  store.input || store.q
            store.view = 'word'
        }

        const suggest = ref('')
        suggest.value = await $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${store.q}&dict=${store.dict}&n=20&dform=int&meta=n&include=eis`)
        store.suggest = suggest.value
        let { exact, inflect } = store.suggest.a

        store.searchUrl = to.fullPath

        if (exact) {
            if (exact[0][0] != store.q && exact[0][0].length == store.q.length) {
                // kun hvis resultatet er et uttrykk eller har litt andre tegn
                return "/bm,nn/" + exact[0][0]
            }
            
        }
        else {
            if (inflect) {
                return "/bm,nn/" + inflect[0][0]
            }

        }
      }

    console.log("STORE", store.$state)

    
    

    
  })