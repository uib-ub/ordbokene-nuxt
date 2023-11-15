
export default defineEventHandler(async (event) => {
    const localeConfig = [
        {lang: 'en', locale: 'eng'},
        {lang: 'nn', locale: 'nno'},
        {lang: 'nb', locale: 'nob'},
        {lang: 'uk', locale: 'ukr'},
    ]
    const pages = ['', 'bm', 'nn', 'search', 'help', 'about', 'contact' ]
    const baseurl = (process.env.VERCEL_ENV ? 'https://' : 'http://') + event.headers.get('host').toString()

    event.node.res.setHeader("Content-Type", 'text/xml')
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"  xmlns:xhtml="https://www.w3.org/1999/xhtml">
        ${  pages.map(page => {
            return  '<url><loc>' + baseurl + '/' + page + '</loc>' 
            + localeConfig.map(item => {
                return '<xhtml:link rel="alternate" hreflang="' + item.lang + '" href="' + baseurl + '/' + item.locale + '/' + page + '"/>'
            }).join("\n") + '</url>\n'
        
        }
        ).join("\n")
        }
        </urlset>
        `


            

})

