import { useStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useStore()
    if (to.params.slug) {

        if (to.params.slug[0] == 'submit') {
            console.log("TO", to)
            console.log("FROM", from)
            
            // if advanced search
            if (to.query.scope) {
                console.log("REDIRECT TO ADVANCED")
                return "search?q=" + to.query.q
            }
            // simple search redirect
            else {
            // Simple search - heller ha parametre som konverteres til riktig route - hvis search der scope er null omdirigeres søket til beste alternativ
                console.log("AI SEARCH", to.query.q)
                const suggest = ref('')
                suggest.value = await $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${to.query.q}&dict=${to.params.dict}&n=20&dform=int&meta=n&include=eis`)
                store.suggest = suggest.value
                let { exact, inflect } = store.suggest.a
        
                if (exact) {
                    if (exact[0][0].length == store.q.length) {
                        // kun hvis resultatet er et uttrykk eller har litt andre tegn?
                        console.log("EXACT", exact[0][0])
                        store.searchUrl = "/bm,nn/" + exact[0][0]
                        store.originalInput = to.query.q
                        return store.searchUrl
                    }
                }
                if (inflect) {
                        console.log("INFLECT", inflect[0][0])
                        store.searchUrl = "/bm,nn/" + inflect[0][0]
                        store.originalInput = to.query.q
                        return store.searchUrl
                    
                }

                console.log("REDIRECT SUGGEST")
                store.searchUrl = "suggest?q="+to.query.q
                return store.searchUrl
                    





        }

        
    }
    else if (to.params.slug[0] == 'search') {
        console.log("SEARCH")
        store.view = "search"
        store.q = to.query.q
        store.input = to.query.q
        store.searchUrl = to.fullPath

    }
    else if (to.params.slug[0] == 'suggest') {
        console.log("SUGGEST")
        store.view = "suggest"
        store.q = to.query.q
        store.input = to.query.q
        store.searchUrl = to.fullPath

    }
    else if (/^[0-9]+$/.test(to.params.slug[0])) {
        console.log("ARTICLE")
        store.view = 'article'
      
    }
    else {
        console.log("WORD")
        console.log("TO", to)
        console.log("FROM", from)
        store.q = to.params.slug[0]
        if (store.originalInput) {
            store.input = store.originalInput
            store.originalInput = ""
        }
        else {
            store.input = to.params.slug[0]
        }
        
        store.view = 'word'
        store.searchUrl = to.fullPath
    }
    /*



    // if article lookup

    // if link to word search
    else if (!to.query.q) {
        console.log("WORD", to.params.slug[0])
        store.q = store.q || to.params.slug[0]
        store.view = 'word'

    }


    */
    
    
  }
  else {
    store.q = ""
    store.input = ""
  }
})