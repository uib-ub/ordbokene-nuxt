import { useSearchStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useSearchStore()
    store.$patch({searchUrl: to.fullPath,
                  q: to.query.q || store.q,
                  pos: to.query.pos || store.pos,
                  scope:  to.query.scope || store.scope,
                  dict: to.query.dict || store.dict,
                  input: to.query.q || ""})
                
})