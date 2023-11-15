
export default defineEventHandler(async (event) => {
    const localeConfig = [
        {lang: 'en', locale: 'eng'},
        {lang: 'nn', locale: 'nno'},
        {lang: 'nb', locale: 'nob'},
        {lang: 'uk', locale: 'ukr'},
    ]
    const pages = ['', 'bm', 'nn', 'search', 'help', 'about', 'contact' ]
    const site = "https://dev.ordbokene.no"

    event.node.res.setHeader("Content-Type", 'text/xml')
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html">
        ${  pages.map(page => {
            return  '<url><loc>' + site + '/' + page + '</loc>' 
            + localeConfig.map(item => {
                return '<xhtml:link rel="alternate" hreflang="' + item.lang + '" href="' + site + '/' + item.locale + '/' + page + '"/>'
            }).join("\n")
        
        }
        ).join("\n")
        }
        </url>\n</urlset>
        `


            

})

