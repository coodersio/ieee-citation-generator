import { MetadataRoute } from 'next';

const baseUrl = 'https://ieeecitationgenerator.xyz';

function generateSitemap(): MetadataRoute.Sitemap {
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/guide`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ];

    // Single parameter pages
    const types = ['book', 'journal', 'conference', 'website', 'standard', 'image'];
    const inputs = ['manual', 'doi', 'pdf'];
    const outputs = ['text', 'bibtex', 'latex'];

    const typePages = types.map(type => ({
        url: `${baseUrl}/${type}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: type === 'book' || type === 'journal' ? 0.9 : 0.8,
    }));

    // Two parameter pages (type + input)
    const typeInputPages = [];
    for (const type of types) {
        for (const input of inputs) {
            typeInputPages.push({
                url: `${baseUrl}/${type}/${input}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            });
        }
    }

    // Three parameter pages (type + input + output)
    const typeInputOutputPages = [];
    for (const type of types) {
        for (const input of inputs) {
            for (const output of outputs) {
                typeInputOutputPages.push({
                    url: `${baseUrl}/${type}/${input}/${output}`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly' as const,
                    priority: 0.6,
                });
            }
        }
    }

    // Special pages - only include pages that actually exist
    const specialPages = [
        { path: '/convert', priority: 0.7 },
        { path: '/doi', priority: 0.8 },
        { path: '/pdf', priority: 0.8 },
        { path: '/bibtex', priority: 0.8 },
    ].map(page => ({
        url: `${baseUrl}${page.path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: page.priority,
    }));

    return [
        ...staticPages,
        ...typePages,
        ...typeInputPages,
        ...typeInputOutputPages,
        ...specialPages,
    ];
}

export async function GET() {
    const sitemap = generateSitemap();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
            .map(
                (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified instanceof Date ? item.lastModified.toISOString() : item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`)
            .join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
