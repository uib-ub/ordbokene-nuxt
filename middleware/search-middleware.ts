import { useStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.params.slug) {
        console.log("TO", to)
    const store = useStore()
    // sync pinia in middleware

    // if article lookup
    if (/^[0-9]+$/.test(to.params.slug[0])) {
        store.view = 'article'
      
      }
    // if link to word search
    else if (!to.query.q) {
        console.log("WORD", to.params.slug[0])
        store.q = store.q || to.params.slug[0]
        store.view = 'word'

    }
    // if advanced
    else if (to.query.scope || specialSymbols(to.query.q)) {
        console.log("SEARCH", to.query.q)
        store.q = to.query.q
        console.log("CHANGING INPUT", store.input, store.q )
        store.input = store.input || store.q
        store.view = 'search'
    }
    // simple search redirect
    else {
    // Simple search - heller ha parametre som konverteres til riktig route - hvis search der scope er null omdirigeres søket til beste alternativ
        console.log("AI search", to.query.q)
        const suggest = ref('')
        store.q = to.query.q
        suggest.value = await $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${store.q}&dict=${to.params.dict}&n=20&dform=int&meta=n&include=eis`)
        store.suggest = suggest.value
        let { exact, inflect } = store.suggest.a

        store.searchUrl = to.fullPath

        if (exact) {
            if (exact[0][0].length == store.q.length) {
                // kun hvis resultatet er et uttrykk eller har litt andre tegn?
                console.log("EXACT", exact[0][0])
                store.view = 'word'
                store.searchUrl = "/bm,nn/" + exact[0][0]
                return store.searchUrl
            }
        }
        else if (inflect) {
                console.log("INFLECT", inflect[0][0])
                store.view = 'word'
                store.searchUrl = "/bm,nn/" + inflect[0][0]
                return store.searchUrl
            
        }
        else {
            console.log("NONE")
            store.view = "suggest"
        }
      
    }

    }
    
    
  })