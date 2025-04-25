import {defineCollection, z} from 'astro:content'

import {glob} from 'astro/loaders'

const articles = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/articles"}),
    schema: z.object({
        title: z.string(),
        label: z.optional(z.string())
    })
})

export const collections = {articles}