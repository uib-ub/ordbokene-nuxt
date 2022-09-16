import { useStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("SUBMIT MIDDLEWARE\nTO: ", to, "\nFROM: ", from)
    const store = useStore()
    //console.log("TO", to)
    //console.log("FROM", from)
    

            store.originalInput = ""
            store.suggestQuery = ""
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
                        store.suggestQuery = to.query.q
                        return navigateTo(`/${store.dict}/${exact[0][0]}`)
                    }
                }
                if (inflect) {
                        console.log("INFLECT", inflect[0][0])
                        store.originalInput = to.query.q
                        store.suggestQuery = to.query.q
                        return navigateTo(`/${store.dict}/${inflect[0][0]}`)
                    
                }

                console.log("REDIRECT SUGGEST")
                return navigateTo(`/${store.dict}/suggest?q=${to.query.q}`)

                
                
        } 
    

  

})