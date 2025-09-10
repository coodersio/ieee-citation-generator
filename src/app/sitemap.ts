import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ieeecitationgenerator.com';

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
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.4,
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

    // Special pages
    const specialPages = [
        { path: '/convert', priority: 0.7 },
        { path: '/doi', priority: 0.8 },
        { path: '/pdf', priority: 0.8 },
        { path: '/bibtex', priority: 0.8 },
        { path: '/text', priority: 0.7 },
        { path: '/latex', priority: 0.7 },
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
