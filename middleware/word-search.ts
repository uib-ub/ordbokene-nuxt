import { useStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware(async (to) => {
    console.log(to)
    const store = useStore()
    // sync pinia in middleware
    if (/^[0-9]+$/.test(to.params.view[0])) {
        store.view = 'article'
      
      }
      else {
        const suggest = ref('')
        suggest.value = await $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${store.q}&dict=${store.dict}&n=20&dform=int&meta=n&include=e`)
        store.suggest = suggest.value

        store.searchUrl=to.fullPath
        // Simple search
        if (to.params.view[0] == 'search') {
          store.q = to.query.q
          store.input = store.input || store.q
          store.view = 'search'
        }
        else {

          if (!store.suggest.a.exact) {
            return "/bm,nn/search?q="+store.q
          }

          store.q = to.params.view[0]
          store.input = store.input || store.q
          store.view = 'word'
        }
      
        
      
      }

    console.log("STORE", store.$state)

    
    

    
  })