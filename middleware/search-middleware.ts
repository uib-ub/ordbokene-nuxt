import { useStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("MIDDLEWARE\nFROM: ", from, "\nTO: ", to, "\nREDIRECTED FROM:",to.redirectedFrom)
    const store = useStore()

    if (to.params.slug) {
        // Articles
        if (/^[0-9]+$/.test(to.params.slug[0])) {
            console.log("ARTICLE")
            store.view = 'article'
        }
        // Words
        else {
            console.log("WORD")
            store.advanced = false
            store.searchUrl = to.fullPath
            store.q = to.params.slug[0]
            store.input = to.params.slug[0]

        }
    }
    else if (to.name == 'dict-search') {
        // Advanced search
        if (to.query.scope) {
            console.log("ADVANCED SEARCH")
            store.advanced = true
        }
        else { // Simple search
            // Redirect to advanced
            if (specialSymbols(to.query.q)) {
                console.log("REDIRECT TO ADVANCED")
                return navigateTo(`/${store.dict}/search?q=${to.query.q}&scope=${store.scope}`)
            }
            else {
                console.log("SIMPLE SEARCH")
                store.advanced = false
                const { pending, error, refresh, data: suggestions } = await useAsyncData('suggest_'+to.query.q, () => $fetch(`https://odd.uib.no/opal/dev/api/suggest?&q=${to.query.q}&dict=${to.params.dict}&n=20&dform=int&meta=n&include=eis`))
                let { exact, inflect } = suggestions.value.a
        
                if (exact) {
                    if (exact[0][0].length == store.q.length) {
                        // kun hvis resultatet er et uttrykk eller har litt andre tegn?
                        console.log("EXACT", exact[0][0])
                        store.originalInput = to.query.q
                        return navigateTo(`/${store.dict}/${exact[0][0]}`)
                    }
                }
                if (inflect) {
                        console.log("INFLECT", inflect[0][0])
                        store.originalInput = to.query.q
                        return navigateTo(`/${store.dict}/${inflect[0][0]}`)
                    
                }

                console.log("REDIRECT SUGGEST")
                return navigateTo(`/${store.dict}/suggest?q=${to.query.q}`)

            }


        }

        

    }
    else if (to.name == 'dict-suggest') {
        console.log("SUGGEST")
        store.q = to.query.q
        store.input = to.query.q || ""
        store.originalInput = ""
        
        
    }
    else {
        store.q = ""
        store.input = ""
    }

    

    

    /*
    
    if (to.params.slug) {
        if (to.params.slug[0] == 'submit') {
            store.originalInput = ""
            if (store.q == "") {
                if (from.params.slug[0] == 'search') {
                    return navigateTo(to.params.dict + "/search?scope=" + store.scope)
                }
                else {
                    store.advanced = false
                    return navigateTo(to.params.dict)
                }
                

            }
            // if advanced search
            if (store.advanced || specialSymbols(to.query.q)) {
                console.log("INIT ADVANCED")
                return navigateTo(`/${store.dict}/search?q=${to.query.q}&scope=${store.scope}`)

                
            }

            // simple search redirect
            else {
            // Simple search - heller ha parametre som konverteres til riktig route - hvis search der scope er null omdirigeres søket til beste alternativ
                console.log("INIT SIMPLE", to.query.q)
                const { pending, error, refresh, data: suggestions } = await useAsyncData('suggest_'+to.query.q, () => $fetch(`https://odd.uib.no/opal/dev/api/suggest?&q=${to.query.q}&dict=${to.params.dict}&n=20&dform=int&meta=n&include=eis`))
                let { exact, inflect } = suggestions.value.a
        
                if (exact) {
                    if (exact[0][0].length == store.q.length) {
                        // kun hvis resultatet er et uttrykk eller har litt andre tegn?
                        console.log("EXACT", exact[0][0])
                        store.originalInput = to.query.q
                        return navigateTo(`/${store.dict}/${exact[0][0]}`)
                    }
                }
                if (inflect) {
                        console.log("INFLECT", inflect[0][0])
                        store.originalInput = to.query.q
                        return navigateTo(`/${store.dict}/${inflect[0][0]}`)
                    
                }

                console.log("REDIRECT SUGGEST")
                return navigateTo(`/${store.dict}/suggest?q=${to.query.q}`)

                
                
        } 
    }
    else if (to.params.slug[0] && to.params.slug[0].slice(0,6) == 'search') {
        console.log("SEARCH")
        store.advanced = true
        store.q = to.query.q || ""
        store.input = to.query.q || ""
        store.originalInput = ""
        store.view = "search"
        store.searchUrl = to.fullPath
        
        
    }
    else if (/^[0-9]+$/.test(to.params.slug[0])) {
        console.log("ARTICLE")
        store.view = 'article'
    }
    else {
        console.log("WORD")
        store.advanced = false
        if (store.originalInput && to.redirectedFrom && to.redirectedFrom.query.q != to.params.slug[0]) {
            store.input = store.originalInput
            store.originalInput = store.input
        }
        else {
            store.input = to.params.slug[0]
            store.originalInput = ""
        }
        store.q = to.params.slug[0]
        store.view = 'word'
        store.searchUrl = to.fullPath
        
    }    
  }
  else if (to.name =='dict-suggest') {
        console.log("SUGGEST")
        store.q = to.query.q
        store.input = to.query.q || ""
        store.originalInput = ""
        store.searchUrl = to.fullPath
        
        
  }
  else {
    
    store.q = ""
    store.input = ""
  } */
})