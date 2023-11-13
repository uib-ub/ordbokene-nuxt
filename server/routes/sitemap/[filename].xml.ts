
export default defineEventHandler(async (event) => {
    console.log(event)
    
    if (filename == "sitemap.xml") {
        await sendRedirect(event, "/api/sitemap_index.xml", 301)
    }

    





    return await fetch("https://ordbokene.no/" + filename)

})

