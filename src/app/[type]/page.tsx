import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Box, Heading, Text, Card, Grid, Button } from '@radix-ui/themes';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import BookCitationTool from '@/components/BookCitationTool';
import { CitationType } from '@/types/citation';

interface PageProps {
    params: Promise<{
        type: CitationType;
    }>;
}

const validTypes: CitationType[] = ['book', 'journal', 'conference', 'website', 'standard', 'image'];

const typeInfo = {
    book: {
        title: 'Book IEEE Citation Generator',
        description: 'Generate accurate IEEE format citations for books, textbooks, and monographs. Free online book citation generator with proper author, title, publisher, and year formatting according to IEEE standards.',
        keywords: 'book ieee citation generator, ieee book citation, ieee format book citation, textbook citation generator',
    },
    journal: {
        title: 'Journal IEEE Citation Generator',
        description: 'Create IEEE citations for journal articles and research papers. Includes volume, issue, page numbers, and DOI formatting according to IEEE standards.',
        keywords: 'journal ieee citation generator, ieee journal citation, research paper citation, academic journal citation',
    },
    conference: {
        title: 'Conference IEEE Citation Generator',
        description: 'Format conference papers and proceedings in IEEE style. Handles conference names, locations, dates, and page numbers with proper IEEE formatting.',
        keywords: 'conference ieee citation generator, ieee conference citation, conference paper citation, proceedings citation',
    },
    website: {
        title: 'Website IEEE Citation Generator',
        description: 'Generate IEEE citations for websites, online articles, and digital resources. Includes URL formatting and access dates as required by IEEE standards.',
        keywords: 'website ieee citation generator, ieee website citation, online source citation, web page citation',
    },
    standard: {
        title: 'IEEE Standard Citation Generator',
        description: 'Create citations for IEEE standards and technical specifications. Properly formats standard numbers, titles, and publication information.',
        keywords: 'ieee standard citation generator, ieee standards citation, technical specification citation',
    },
    image: {
        title: 'Image IEEE Citation Generator',
        description: 'Format citations for images, figures, and visual content in IEEE style. Handles image sources, captions, and proper attribution formatting.',
        keywords: 'image ieee citation generator, ieee image citation, figure citation, visual content citation',
    },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { type } = await params;

    if (!validTypes.includes(type)) {
        return {
            title: 'Page Not Found',
        };
    }

    const info = typeInfo[type];

    return {
        title: `${info.title} | IEEE Citation Generator`,
        description: info.description,
        keywords: info.keywords,
        openGraph: {
            title: info.title,
            description: info.description,
            type: 'website',
        },
    };
}

export async function generateStaticParams() {
    return validTypes.map((type) => ({
        type,
    }));
}

const relatedTools = {
    book: [
        { title: 'Book + DOI', description: 'Generate book citations using DOI', href: '/book/doi' },
        { title: 'Book + BibTeX', description: 'Export book citations to BibTeX', href: '/book/bibtex' },
        { title: 'Journal Citations', description: 'Generate IEEE journal citations', href: '/journal' },
        { title: 'Conference Citations', description: 'Generate IEEE conference citations', href: '/conference' },
    ],
    journal: [
        { title: 'Journal + DOI', description: 'Generate journal citations using DOI', href: '/journal/doi' },
        { title: 'Journal + BibTeX', description: 'Export journal citations to BibTeX', href: '/journal/bibtex' },
        { title: 'Book Citations', description: 'Generate IEEE book citations', href: '/book' },
        { title: 'Conference Citations', description: 'Generate IEEE conference citations', href: '/conference' },
    ],
    conference: [
        { title: 'Conference + DOI', description: 'Generate conference citations using DOI', href: '/conference/doi' },
        { title: 'Conference + BibTeX', description: 'Export conference citations to BibTeX', href: '/conference/bibtex' },
        { title: 'Journal Citations', description: 'Generate IEEE journal citations', href: '/journal' },
        { title: 'Book Citations', description: 'Generate IEEE book citations', href: '/book' },
    ],
    website: [
        { title: 'Website + Manual', description: 'Manual website citation entry', href: '/website/manual' },
        { title: 'Website + Text', description: 'Plain text website citations', href: '/website/text' },
        { title: 'Book Citations', description: 'Generate IEEE book citations', href: '/book' },
        { title: 'Journal Citations', description: 'Generate IEEE journal citations', href: '/journal' },
    ],
    standard: [
        { title: 'Standard + Manual', description: 'Manual standard citation entry', href: '/standard/manual' },
        { title: 'Standard + BibTeX', description: 'Export standard citations to BibTeX', href: '/standard/bibtex' },
        { title: 'Book Citations', description: 'Generate IEEE book citations', href: '/book' },
        { title: 'Journal Citations', description: 'Generate IEEE journal citations', href: '/journal' },
    ],
    image: [
        { title: 'Image + Manual', description: 'Manual image citation entry', href: '/image/manual' },
        { title: 'Image + Text', description: 'Plain text image citations', href: '/image/text' },
        { title: 'Book Citations', description: 'Generate IEEE book citations', href: '/book' },
        { title: 'Journal Citations', description: 'Generate IEEE journal citations', href: '/journal' },
    ],
};

export default async function TypePage({ params }: PageProps) {
    const { type } = await params;

    if (!validTypes.includes(type)) {
        notFound();
    }

    const info = typeInfo[type];

    return (
        <PageLayout>
            <Container size="4" className="py-8">
                {/* Page Header */}
                <Box className="text-center mb-8">
                    <Heading size="8" className="mb-4">
                        {info.title}
                    </Heading>
                    <Text size="4" className="text-gray-600 max-w-3xl mx-auto">
                        {info.description}
                    </Text>
                </Box>

                {/* Citation Tool */}
                <Box className="mb-12">
                    {type === 'book' && <BookCitationTool />}
                    {type !== 'book' && (
                        <Card className="p-8 text-center">
                            <Heading size="5" className="mb-4">
                                {info.title} - Coming Soon
                            </Heading>
                            <Text size="3" className="text-gray-600 mb-6">
                                We are currently developing the {type} citation generator.
                                In the meantime, you can use our book citation generator as a reference.
                            </Text>
                            <Button asChild>
                                <Link href="/book" title="Try Book Citation Generator">
                                    Try Book Citation Generator
                                </Link>
                            </Button>
                        </Card>
                    )}
                </Box>

                {/* Related Tools */}
                <Box>
                    <Heading size="5" className="text-center mb-6">
                        Related Citation Tools
                    </Heading>

                    <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4">
                        {relatedTools[type].map((tool) => (
                            <Card key={tool.href} className="p-4 hover:shadow-lg transition-shadow">
                                <Box>
                                    <Heading size="3" className="mb-2">
                                        {tool.title}
                                    </Heading>
                                    <Text size="2" className="text-gray-600 mb-3 leading-relaxed">
                                        {tool.description}
                                    </Text>
                                    <Button asChild size="2" variant="soft" className="w-full">
                                        <Link href={tool.href} title={`Use ${tool.name} Tool`}>
                                            Use Tool
                                        </Link>
                                    </Button>
                                </Box>
                            </Card>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </PageLayout>
    );
}
