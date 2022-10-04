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
            store.view = 'word'
            store.advanced = false
            store.searchUrl = to.fullPath
            store.q = to.params.slug[0]
            if (!to.redirectedFrom) {
                store.input = to.params.slug[0]
                store.originalInput = ""
            }
        }
    }
    else if (to.name == 'dict-search') {
        // Advanced search
        if (to.query.scope) {
            console.log("ADVANCED SEARCH")
            store.view = 'search'
            store.advanced = true
            store.searchUrl = to.fullPath
            store.q = to.query.q
            if (!to.redirectedFrom) {
                store.input = to.query.q
                store.originalInput = ""
            }
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

})