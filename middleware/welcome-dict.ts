import { useStore } from '~/stores/searchStore'
const store = useStore()

export default defineNuxtRouteMiddleware((to) => {
  store.advanced = false
    return '/'+store.dict
  })