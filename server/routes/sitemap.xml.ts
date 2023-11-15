
export default defineEventHandler(async (event) => {
        event.node.res.setHeader("Content-Type", 'text/xml')
        const baseurl = {preview: 'https://dev.ordbokene.no', production: 'https://test.ordbokene.no'}[process.env.VERCEL_ENV] || 'http://' + event.headers.get('host').toString()
        return await $fetch(baseurl + "/api/sitemap_index.xml", {
                headers: {
                        ContentType: 'text/xml'
                }
        })
})

