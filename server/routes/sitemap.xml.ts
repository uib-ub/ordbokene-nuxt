
export default defineEventHandler(async (event) => {
        await sendRedirect(event, "/api/sitemap_index.xml", 301)
})

