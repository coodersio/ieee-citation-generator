import HeroSection from '@/components/HeroSection';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';
import { Container, Box, Heading, Text, Card, Grid, Button } from '@radix-ui/themes';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Book IEEE Citation Generator - Free Online Tool',
    description: 'Generate perfect IEEE format citations for books & textbooks. Search by ISBN, author, or title for accurate citations. Free online tool.',
    alternates: {
        canonical: 'https://ieeecitationgenerator.xyz/book'
    }
};

const inputMethods = [
    {
        title: 'Manual Entry',
        description: 'Fill out detailed forms manually for complete control over citation accuracy.',
        href: '/book/manual',
        icon: '✏️',
        type: 'form'
    },
    {
        title: 'DOI Search',
        description: 'Simply paste or enter a DOI to automatically generate citations.',
        href: '/book?method=doi',
        icon: '🔗',
        type: 'search'
    },
    {
        title: 'PDF Upload',
        description: 'Upload PDF files to automatically extract and generate citations.',
        href: '/book?method=pdf',
        icon: '📄',
        type: 'search'
    }
];

const outputFormats = [
    {
        title: 'Text Format',
        description: 'Generate clean, formatted text citations ready to copy and paste.',
        href: '/book/manual/text',
        icon: '📝'
    },
    {
        title: 'BibTeX Format',
        description: 'Export citations in BibTeX format for LaTeX documents.',
        href: '/book/manual/bibtex',
        icon: '📚'
    },
    {
        title: 'LaTeX Format',
        description: 'Generate LaTeX-formatted citations for direct use in documents.',
        href: '/book/manual/latex',
        icon: '🔧'
    }
];

export default async function BookCitationPage({ searchParams }: { searchParams?: Promise<{ method?: string }> }) {
    const params = await searchParams;
    const searchMethod = params?.method as 'doi' | 'pdf' | undefined;

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Book Citations', href: '/book' },
    ];

    return (
        <PageLayout showBreadcrumb={true} breadcrumbItems={breadcrumbItems}>
            {/* Hero Section with Quick Tool */}
            <HeroSection
                currentType="book"
                searchMethod={searchMethod || 'default'}
            />

            {/* Advanced Options */}
            <Container size="4" className="py-8">
                {/* Input Methods Section */}
                <Box className="mb-12">
                    <Box className="text-center mb-8">
                        <Heading as="h2" size="6" className="mb-4">
                            Choose Your Input Method
                        </Heading>
                        <Text size="4" className="text-gray-600 max-w-2xl mx-auto">
                            Select how you want to input your book information
                        </Text>
                    </Box>

                    <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap={{ initial: "4", sm: "6" }}>
                        {inputMethods.map((method) => (
                            <Card key={method.href} className="group p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
                                <Box className="text-center">
                                    <Text size="8" className="block mb-4">{method.icon}</Text>
                                    <Heading as="h3" size="4" className="mb-3">
                                        {method.title}
                                    </Heading>
                                    <div>
                                        <Text size="3" className="text-gray-600 mb-4 leading-relaxed">
                                            {method.description}
                                        </Text>
                                    </div>
                                    <Button asChild className="w-full">
                                        <Link href={method.href} title={`Use ${method.title} for Book Citations`}>
                                            Use {method.title}
                                        </Link>
                                    </Button>
                                </Box>
                            </Card>
                        ))}
                    </Grid>
                </Box>

                {/* Output Formats Section */}
                <Box>
                    <Box className="text-center mb-8">
                        <Heading as="h2" size="6" className="mb-4">
                            Choose Your Output Format
                        </Heading>
                        <Text size="4" className="text-gray-600 max-w-2xl mx-auto">
                            Select the format you need for your citations
                        </Text>
                    </Box>

                    <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap={{ initial: "4", sm: "6" }}>
                        {outputFormats.map((format) => (
                            <Card key={format.href} className="group p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
                                <Box className="text-center">
                                    <Text size="8" className="block mb-4">{format.icon}</Text>
                                    <Heading as="h3" size="4" className="mb-3">
                                        {format.title}
                                    </Heading>
                                    <div>
                                        <Text size="3" className="text-gray-600 mb-4 leading-relaxed">
                                            {format.description}
                                        </Text>
                                    </div>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={format.href} title={`Export Book Citations in ${format.title} Format`}>
                                            Use {format.title}
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
