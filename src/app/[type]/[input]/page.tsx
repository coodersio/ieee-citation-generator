import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Box, Heading, Text } from '@radix-ui/themes';
import PageLayout from '@/components/PageLayout';
import BookCitationTool from '@/components/BookCitationTool';
import { CitationType, InputMethod } from '@/types/citation';

interface PageProps {
    params: Promise<{
        type: CitationType;
        input: InputMethod;
    }>;
}

const validTypes: CitationType[] = ['book', 'journal', 'conference', 'website', 'standard', 'image'];
const validInputs: InputMethod[] = ['manual', 'doi', 'pdf'];

const pageInfo = {
    'book-manual': {
        title: 'Book IEEE Citation Generator - Manual Entry',
        description: 'Manually enter book information to generate accurate IEEE format citations. Fill out detailed forms for complete control over your book citations.',
        keywords: 'book ieee citation manual, manual book citation generator, ieee book citation form',
    },
    'book-doi': {
        title: 'Book IEEE Citation Generator - DOI Input',
        description: 'Generate IEEE book citations using DOI. Enter a DOI number to automatically populate book information and create accurate citations.',
        keywords: 'book ieee citation doi, doi book citation generator, ieee book citation from doi',
    },
    'book-pdf': {
        title: 'Book IEEE Citation Generator - PDF Upload',
        description: 'Upload PDF files to automatically extract book information and generate IEEE format citations.',
        keywords: 'book ieee citation pdf, pdf book citation generator, ieee book citation from pdf',
    },
    'journal-manual': {
        title: 'Journal IEEE Citation Generator - Manual Entry',
        description: 'Manually enter journal article information to generate accurate IEEE format citations.',
        keywords: 'journal ieee citation manual, manual journal citation generator, ieee journal citation form',
    },
    'journal-doi': {
        title: 'Journal IEEE Citation Generator - DOI Input',
        description: 'Generate IEEE journal citations using DOI. Perfect for academic papers and research articles.',
        keywords: 'journal ieee citation doi, doi journal citation generator, ieee journal citation from doi',
    },
    'journal-pdf': {
        title: 'Journal IEEE Citation Generator - PDF Upload',
        description: 'Upload journal PDF files to automatically extract citation information.',
        keywords: 'journal ieee citation pdf, pdf journal citation generator, ieee journal citation from pdf',
    },
    'conference-manual': {
        title: 'Conference IEEE Citation Generator - Manual Entry',
        description: 'Manually enter conference paper information to generate accurate IEEE format citations.',
        keywords: 'conference ieee citation manual, manual conference citation generator, ieee conference citation form',
    },
    'conference-doi': {
        title: 'Conference IEEE Citation Generator - DOI Input',
        description: 'Generate IEEE conference citations using DOI for conference papers and proceedings.',
        keywords: 'conference ieee citation doi, doi conference citation generator, ieee conference citation from doi',
    },
    'conference-pdf': {
        title: 'Conference IEEE Citation Generator - PDF Upload',
        description: 'Upload conference paper PDFs to automatically extract citation information.',
        keywords: 'conference ieee citation pdf, pdf conference citation generator, ieee conference citation from pdf',
    },
    'website-manual': {
        title: 'Website IEEE Citation Generator - Manual Entry',
        description: 'Manually enter website information to generate accurate IEEE format citations for online sources.',
        keywords: 'website ieee citation manual, manual website citation generator, ieee website citation form',
    },
    'website-doi': {
        title: 'Website IEEE Citation Generator - DOI Input',
        description: 'Generate IEEE website citations using DOI for online articles and digital resources.',
        keywords: 'website ieee citation doi, doi website citation generator, ieee website citation from doi',
    },
    'website-pdf': {
        title: 'Website IEEE Citation Generator - PDF Upload',
        description: 'Upload website PDF files to automatically extract citation information.',
        keywords: 'website ieee citation pdf, pdf website citation generator, ieee website citation from pdf',
    },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { type, input } = await params;

    if (!validTypes.includes(type) || !validInputs.includes(input)) {
        return {
            title: 'Page Not Found',
        };
    }

    const key = `${type}-${input}` as keyof typeof pageInfo;
    const info = pageInfo[key];

    if (!info) {
        return {
            title: `${type} ${input} IEEE Citation Generator`,
            description: `Generate IEEE citations for ${type} using ${input} method.`,
        };
    }

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
    const params = [];

    for (const type of validTypes) {
        for (const input of validInputs) {
            params.push({ type, input });
        }
    }

    return params;
}

export default async function TypeInputPage({ params }: PageProps) {
    const { type, input } = await params;

    if (!validTypes.includes(type) || !validInputs.includes(input)) {
        notFound();
    }

    const key = `${type}-${input}` as keyof typeof pageInfo;
    const info = pageInfo[key];

    const title = info?.title || `${type.charAt(0).toUpperCase() + type.slice(1)} IEEE Citation Generator - ${input.toUpperCase()} Input`;
    const description = info?.description || `Generate IEEE citations for ${type} using ${input} method.`;

    return (
        <PageLayout>
            <Container size="4" className="py-8">
                {/* Page Header */}
                <Box className="text-center mb-8">
                    <Heading size="8" className="mb-4">
                        {title}
                    </Heading>
                    <Text size="4" className="text-gray-600 max-w-3xl mx-auto">
                        {description}
                    </Text>
                </Box>

                {/* Citation Tool */}
                <Box className="mb-12">
                    {type === 'book' && <BookCitationTool inputMethod={input} />}
                    {type !== 'book' && (
                        <Box className="text-center p-8 bg-gray-50 rounded-lg">
                            <Heading size="5" className="mb-4">
                                {title} - Coming Soon
                            </Heading>
                            <Text size="3" className="text-gray-600">
                                This specific combination is under development. Please try our book citation generator for now.
                            </Text>
                        </Box>
                    )}
                </Box>
            </Container>
        </PageLayout>
    );
}
