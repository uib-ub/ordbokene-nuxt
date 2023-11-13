// server/api/__sitemap__/urls.ts
export default defineEventHandler(async () => {
    
        const [
            bm,
            nn,
          ] = await Promise.all([
            $fetch('https://ord.uib.no/bm/fil/lemma.json'),
            $fetch('https://ord.uib.no/nn/fil/lemma.json')
          ])

          const locales = ["nob", "nno", "eng", "ukr"]
          const pages = ['', 'bm', 'nn', 'search', 'help', 'about', 'contact' ]
          const static_pages = locales.map(locale => locale + "/").concat([""]).reduce((acc, current) => acc.concat(pages.map(page => "/" + current + page)), [])

          // bm,nn searches
          const bm_searches = bm.map(item => item[0])
          const nn_searches = new Set(nn.map(item => item[0]))
          const searches = bm_searches.filter(item => nn_searches.has(item)).map(word => "/bm,nn/" + word)

          // bm articles
          const bm_ids = bm.map(item => item[1])
          const bm_articles = bm_ids.map(item => "/bm/" + item)


          // nn articles
          const nn_ids = nn.map(item => item[1])
          const nn_articles = nn_ids.map(item => "/nn/" + item)
          
          return [...static_pages, ...searches, ...new Set(bm_articles), ...new Set(nn_articles)]

          
          
  })