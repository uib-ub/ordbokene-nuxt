import { useStore } from '~/stores/searchStore'
export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("MIDDLEWARE\nFROM: ", from, "\nTO: ", to, "\nREDIRECTED FROM:",to.redirectedFrom)
    const store = useStore()
    if (to.params.slug) {
        // Articles
        if (/^[0-9]+$/.test(to.params.slug[0])) {
            store.view = 'article'
        }
        else if (specialSymbols(to.query.q)) {
            store.scope = "e"
            return navigateTo(`/${store.dict}/search?q=${to.query.q}&scope=${store.scope}`)
        }
        else {
            store.view = 'word'
            store.advanced = false
            store.searchUrl = to.fullPath
            store.q = to.params.slug[0]
            if (!store.autocomplete_suggestions) {
                store.input = store.q
            } 
        }
    }
})