import { useStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware((to, from) => {
    console.log("MIDDLEWARE\nTO: ", to, "\nFROM: ", from)
    const store = useStore()
    //console.log("TO", to)
    //console.log("FROM", from)
    
    if (to.params.slug) {
        if (to.params.slug[0] == 'submit') {
            if (store.q == "") {
                return to.params.dict
            }
            // if advanced search
            if (to.query.scope) {
                console.log("REDIRECT TO ADVANCED")
                return "search?q=" + to.query.q
            }
            // simple search redirect
            else {
            // Simple search - heller ha parametre som konverteres til riktig route - hvis search der scope er null omdirigeres søket til beste alternativ
                console.log("AI SEARCH", to.query.q)
                return $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${to.query.q}&dict=${to.params.dict}&n=20&dform=int&meta=n&include=eis`).then((response) => {

                    store.suggest = response
                    console.log("RESPONSE", response)
                    let { exact, inflect } = store.suggest.a
        
                if (exact) {
                    if (exact[0][0].length == store.q.length) {
                        // kun hvis resultatet er et uttrykk eller har litt andre tegn?
                        console.log("EXACT", exact[0][0])

                        if (from.params.slug[0] == exact[0][0]) {
                            store.loading = false
                        }
                        store.originalInput = to.query.q
                        return `/${store.dict}/${exact[0][0]}`
                    }
                }
                if (inflect) {
                        console.log("INFLECT", inflect[0][0])
                        if (from.params.slug[0] == inflect[0][0]) {
                            store.loading = false
                        }
                        store.originalInput = to.query.q
                        return `/${store.dict}/${inflect[0][0]}`
                    
                }

                console.log("REDIRECT SUGGEST")
                return "suggest?q="+to.query.q
                })
                
                
        } 
    }
    else if (to.params.slug[0] == 'search') {
        console.log("SEARCH")
        store.q = to.query.q
        store.input = to.query.q
        store.view = "search"
        store.searchUrl = to.fullPath
        
        
    }
    else if (to.params.slug[0] == 'suggest') {
        console.log("SUGGEST")
        store.q = to.query.q
        store.input = to.query.q
        store.view = "suggest"
        store.searchUrl = to.fullPath
        
        
    }
    else if (/^[0-9]+$/.test(to.params.slug[0])) {
        console.log("ARTICLE")
        store.view = 'article'
    }
    else {
        console.log("WORD")
        if (store.originalInput) {
            store.input = store.originalInput
            store.originalInput = ""
        }
        else {
            store.input = to.params.slug[0]
        }
        store.q = to.params.slug[0]
        store.view = 'word'
        store.searchUrl = to.fullPath
        
    }    
  }
  else {
    store.q = ""
    store.input = ""
  }
})