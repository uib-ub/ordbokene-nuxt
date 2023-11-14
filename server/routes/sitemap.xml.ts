
export default defineEventHandler(async (event) => {
        await sendRedirect(event, "/sitemap_index.xml", 301)
})

