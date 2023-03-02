import { useStore } from '~/stores/searchStore'
export default defineNuxtRouteMiddleware(async (to, from) => {
    //console.log("MIDDLEWARE\nFROM: ", from, "\nTO: ", to, "\nREDIRECTED FROM:",to.redirectedFrom)
    const store = useStore()
    if (to.query.q) {
        return navigateTo("/" + to.params.dict + "/" + to.query.q )
        console.log("QUERY")

        if (specialSymbols(to.query.q)) {
            store.scope = "ei"
            return navigateTo(`/search?q=${to.query.q}&dict=${to.params.dict}&scope=ei`)
        }

        if (store.autocomplete_suggestions) {
            store.q = to.query.q
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
              }  
        }

        

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
            store.input = to.params.slug[0]
            
            if (!store.autocomplete_suggestions) {
                store.input = to.params.slug[0]
            } 
            console.log("SETTING Q2", to.params.slug[0])
        }

    }


})