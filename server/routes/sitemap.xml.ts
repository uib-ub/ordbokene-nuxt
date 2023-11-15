
export default defineEventHandler(async (event) => {
        event.node.res.setHeader("Content-Type", 'text/xml')
        const baseurl = (process.env.VERCEL_ENV ? 'https://' : 'http://') + event.headers.get('host').toString()
        return baseurl + "/api/sitemap_index.xml"
})

