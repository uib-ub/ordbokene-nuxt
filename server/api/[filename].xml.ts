export default defineEventHandler(async (event) => {
    // Remporary redirect to build time sitemap
    const filename = event.context.params["filename.xml"]
    const baseurl = (process.env.VERCEL_ENV ? 'https://' : 'http://') + event.headers.get('host').toString() + (filename == "sitemap_index.xml" ? "/" : "/sitemaps/")
    return await fetch(baseurl + filename)

})

