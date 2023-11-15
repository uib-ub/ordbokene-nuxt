export default defineEventHandler(async (event) => {
    // Remporary redirect to build time sitemap
    let filename = event.context.params["filename.xml"]
    event.node.res.setHeader("Content-Type", 'text/xml')

    const branch = process.env.VERCEL_ENV == 'production' ? 'main' : 'ordbokene-dev'
    const xml = await $fetch(`https://git.app.uib.no/api/v4/projects/23985/jobs/artifacts/${branch}/raw/sitemaps/${filename}?job=build-sitemap`, {
    headers: {
      ContentType: 'text/xml'
    }
  })
    
    return xml

})

