import { useStore } from '~/stores/searchStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore()
    //console.log("MIDDLEWARE\nFROM: ", from, "\nTO: ", to, "\nREDIRECTED FROM:",to.redirectedFrom)
    
    const get_concepts = async (server, env) => {
      await Promise.all([fetch(`https://${server}.uib.no/opal/${env}/bm/concepts.json`).then(r => r.json()), fetch(`https://${server}.uib.no/opal/${env}/nn/concepts.json`).then(r => r.json())]).then(response => {
       //await Promise.all([fetch(server == 'oda'? 'https://httpstat.us/404': `https://${server}.uib.no/opal/${env}/bm/concepts.json`).then(r => check_status(r)), fetch(`https://${server}.uib.no/opal/${env}/nn/concepts.json`).then(r => check_status(r))]).then(response => {
          console.log("RESPONSE", response)
      store.concepts_bm = response[0].concepts
      store.concepts_nn = response[1].concepts
      store.endpoint = `https://${server}.uib.no/opal/${env}/`
      console.log("ENDPOINT:", store.endpoint)
    
    }).catch(async err => {
      if (server == 'oda') {
        console.log("Fallback to odd.uib.no")
        await get_concepts('odd', env)
        }
        else {
          console.log("Uncaught")
    
        }
      })
    }

    // Test prod API
    if (to.query && to.query.api == 'prod') {
        console.log("PRODTEST")
        await get_concepts('odd', 'prod')
      }
    else if (!store.endpoint) {
        const config = useRuntimeConfig()
        await get_concepts('oda', config.public.endpointEnv)
    }
})