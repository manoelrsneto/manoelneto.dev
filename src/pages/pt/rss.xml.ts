import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('posts', ({ data }) => !data.draft && data.lang === 'pt')
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'manoelneto.dev (pt-BR)',
    description: 'Textos sobre qualidade de software, gestão técnica e ferramentas.',
    site: context.site ?? 'https://manoelneto.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
    })),
    stylesheet: false,
  });
}
