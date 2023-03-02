import { useStore } from '~/stores/searchStore'
export default defineNuxtRouteMiddleware(async (to, from) => {
    //console.log("MIDDLEWARE\nFROM: ", from, "\nTO: ", to, "\nREDIRECTED FROM:",to.redirectedFrom)
    const store = useStore()
    if (to.query.q) {
        console.log("QUERY")

        if (specialSymbols(to.query.q)) {
            store.scope = "e"
            return navigateTo(`/search?q=${to.query.q}&dict=${to.params.dict}&scope=${store.scope}`)
        }

        store.q = to.query.q
        store.input = to.query.q
        console.log("SETTING Q", store.q)
        return navigateTo("/" + to.params.dict + "/" + to.query.q)
        /*
        console.log("HAS QUERY", store.autocomplete_suggestions)

        if (store.autocomplete.length) {
            store.autocomplete_suggestions = store.autocomplete
            console.log("HAS AUTOCOMPLETE")

        }
        
        else {
            console.log("NO SUGGESTIONS")
            const { data: suggest_test } = await useAsyncData(
                'suggest_'+ to.query.q + "_" + store.dict, 
                () => $fetch(`${store.endpoint}api/suggest?&q=${to.query.q}&dict=${store.dict}&n=20&dform=int&meta=n&include=ei`))
            store.autocomplete_suggestions =  suggest_test.value.a
            console.log(store.autocomplete_suggestions)
            
            

        }
        

        if (store.autocomplete_suggestions.exact && store.autocomplete_suggestions.exact[0][0].length == store.q.length) {
            if (store.q != store.autocomplete_suggestions.exact[0][0]) {
              store.originalInput = store.q
            }
            else {
              store.originalInput = ""
            }
            
            return navigateTo("/" + store.dict + "/" +  store.autocomplete_suggestions.exact[0][0])
          }
          else if (store.autocomplete_suggestions.inflect) {
            store.originalInput = store.q
            return navigateTo("/" + store.dict + "/" + store.autocomplete_suggestions.inflect[0][0])
          }
          else {
            store.originalInput = ""
            return navigateTo("/" + store.dict + "/" + store.q )
          } */

    } 
    else if (to.params.slug) {

        if (/^[0-9]+$/.test(to.params.slug[0])) {
            store.view = 'article'
        }
        else {
            console.log("SLUG", to.params.slug[0])
            store.view = 'word'
            store.advanced = false
            store.searchUrl = to.fullPath
            store.q = to.params.slug[0]
            store.input = store.q
            
            if (!store.autocomplete_suggestions) {
                store.input = store.q
            } 
            console.log("SETTING Q2", store.q)
        }

    }


})