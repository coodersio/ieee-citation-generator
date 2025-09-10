import PageLayout from '@/components/PageLayout';
import {
    Box,
    Container,
    Flex,
    Text,
    Card,
    Heading,
    Badge,
    Code
} from '@radix-ui/themes';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'IEEE Citation Style Guide - Free Online Tool',
    description: 'Complete guide to IEEE citation style. Learn how to cite books, journals, conferences, websites & more according to IEEE standards. Step-by-step examples.',
};

export default function IEEEGuidePage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'IEEE Citation Guide', href: '/guide' },
    ];

    return (
        <PageLayout
            title="IEEE Citation Style Guide"
            breadcrumbItems={breadcrumbItems}
        >
            <Container size="4" className="py-8">
                <Flex direction="column" gap="8">
                    {/* Introduction */}
                    <Card className="p-6 bg-blue-50 border border-blue-200">
                        <Heading as="h2" size="4" className="mb-4">About IEEE Citation Style</Heading>
                        <Text size="3" className="text-gray-700 leading-relaxed">
                            The IEEE (Institute of Electrical and Electronics Engineers) citation style is commonly used in engineering,
                            computer science, and technology fields. It uses numbered references in the text that correspond to a
                            numbered reference list at the end of the document.
                        </Text>
                    </Card>

                    {/* General Rules */}
                    <Box>
                        <Heading as="h2" size="5" className="mb-4">General Rules</Heading>
                        <Card className="p-6">
                            <Flex direction="column" gap="4">
                                <Box>
                                    <Text size="3" weight="bold" className="mb-2 block">In-Text Citations</Text>
                                    <Text size="3" className="text-gray-700">
                                        Use square brackets with numbers: [1], [2], [3], etc. Multiple citations: [1], [2] or [1]–[3] for consecutive numbers.
                                    </Text>
                                </Box>
                                <Box>
                                    <Text size="3" weight="bold" className="mb-2 block">Reference List</Text>
                                    <Text size="3" className="text-gray-700">
                                        Number references in order of appearance. Use hanging indent. Include DOI when available.
                                    </Text>
                                </Box>
                                <Box>
                                    <Text size="3" weight="bold" className="mb-2 block">Author Names</Text>
                                    <Text size="3" className="text-gray-700">
                                        Use initials for first and middle names. Format: &ldquo;J. K. Smith&rdquo; or &ldquo;J. K. Smith and A. B. Doe&rdquo;
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
                    </Box>

                    {/* Citation Types */}
                    <Box>
                        <Heading as="h2" size="5" className="mb-4">Citation Types and Examples</Heading>

                        {/* Journal Articles */}
                        <Card className="p-6 mb-4">
                            <Flex align="center" gap="2" className="mb-4">
                                <Heading as="h3" size="4">Journal Articles</Heading>
                                <Badge color="blue" variant="soft">Most Common</Badge>
                            </Flex>

                            <Box className="mb-4">
                                <Text size="3" weight="bold" className="mb-2 block">Format:</Text>
                                <Code className="text-sm">
                                    [1] Author(s), &ldquo;Article title,&rdquo; Journal Name, vol. X, no. Y, pp. Z-ZZ, Month Year. doi: DOI.
                                </Code>
                            </Box>

                            <Box>
                                <Text size="3" weight="bold" className="mb-2 block">Example:</Text>
                                <Box className="p-3 bg-gray-50 rounded border">
                                    <Text size="2" className="font-mono">
                                        [1] J. K. Smith and A. B. Doe, &ldquo;Neural networks for pattern recognition,&rdquo;
                                        IEEE Transactions on Neural Networks, vol. 25, no. 3, pp. 123-135, Mar. 2024.
                                        doi: 10.1109/TNN.2024.1234567.
                                    </Text>
                                </Box>
                            </Box>
                        </Card>

                        {/* Books */}
                        <Card className="p-6 mb-4">
                            <Heading as="h3" size="4" className="mb-4">Books</Heading>

                            <Box className="mb-4">
                                <Text size="3" weight="bold" className="mb-2 block">Format:</Text>
                                <Code className="text-sm">
                                    [1] Author(s), Book Title, Edition. City: Publisher, Year.
                                </Code>
                            </Box>

                            <Box>
                                <Text size="3" weight="bold" className="mb-2 block">Example:</Text>
                                <Box className="p-3 bg-gray-50 rounded border">
                                    <Text size="2" className="font-mono">
                                        [2] J. K. Smith, Machine Learning Fundamentals, 2nd ed. New York: IEEE Press, 2024.
                                    </Text>
                                </Box>
                            </Box>
                        </Card>
                    </Box>

                    {/* Additional Resources */}
                    <Box>
                        <Heading as="h2" size="5" className="mb-4">Additional Resources</Heading>
                        <Card className="p-6">
                            <Flex direction="column" gap="3">
                                <Box>
                                    <Text size="3" weight="bold" className="mb-1 block">IEEE Author Center</Text>
                                    <Text size="3" className="text-gray-600">
                                        Official IEEE guidelines and resources for authors
                                    </Text>
                                </Box>
                                <Box>
                                    <Text size="3" weight="bold" className="mb-1 block">IEEE Editorial Style Manual</Text>
                                    <Text size="3" className="text-gray-600">
                                        Comprehensive style guide for IEEE publications
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
                    </Box>
                </Flex>
            </Container>
        </PageLayout>
    );
}