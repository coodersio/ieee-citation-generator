'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SearchResult {
    title: string;
    author: string;
    year: string;
    url?: string;
    accessDate?: string;
    publisher?: string;
    city?: string;
    journal?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    conference?: string;
    location?: string;
    standardNumber?: string;
    organization?: string;
    source?: string;
    medium?: string;
}
import {
    Box,
    Container,
    Flex,
    Text,
    Button,
    Card,
    Heading,
    TextField
} from '@radix-ui/themes';
import { ArrowRightIcon, CopyIcon } from '@radix-ui/react-icons';

interface HeroSectionProps {
    currentType?: string;
    isHomePage?: boolean;
    searchMethod?: 'default' | 'doi' | 'pdf';
}

export default function HeroSection({ currentType = 'website', isHomePage = false, searchMethod = 'default' }: HeroSectionProps) {
    const [citationType, setCitationType] = useState(currentType);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [generatedCitation, setGeneratedCitation] = useState('');

    const searchAndGenerate = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setGeneratedCitation('');

        try {
            // 模拟搜索API调用
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 模拟不同类型的搜索结果
            let mockResult: SearchResult;
            let citation = '';

            switch (citationType) {
                case 'website':
                    // 对于网站，假设用户粘贴了URL
                    mockResult = {
                        title: "Example Article Title",
                        author: "Author Name",
                        year: "2024",
                        url: searchQuery,
                        accessDate: new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                    };
                    citation = `[1] ${mockResult.author}, "${mockResult.title}." [Online]. Available: ${mockResult.url}. [Accessed: ${mockResult.accessDate}].`;
                    break;

                case 'book':
                    mockResult = {
                        title: "Example Book Title",
                        author: "Book Author",
                        year: "2024",
                        publisher: "Publisher Name",
                        city: "New York"
                    };
                    citation = `[1] ${mockResult.author}, "${mockResult.title}," ${mockResult.city}: ${mockResult.publisher}, ${mockResult.year}.`;
                    break;

                case 'journal':
                    mockResult = {
                        title: "Example Journal Article",
                        author: "Journal Author",
                        year: "2024",
                        journal: "IEEE Transactions on Example",
                        volume: "15",
                        issue: "3",
                        pages: "123-135"
                    };
                    citation = `[1] ${mockResult.author}, "${mockResult.title}," ${mockResult.journal}, vol. ${mockResult.volume}, no. ${mockResult.issue}, pp. ${mockResult.pages}, ${mockResult.year}.`;
                    break;

                case 'conference':
                    mockResult = {
                        title: "Example Conference Paper",
                        author: "Conference Author",
                        year: "2024",
                        conference: "IEEE International Conference on Example",
                        location: "New York, NY",
                        pages: "45-52"
                    };
                    citation = `[1] ${mockResult.author}, "${mockResult.title}," in ${mockResult.conference}, ${mockResult.location}, pp. ${mockResult.pages}, ${mockResult.year}.`;
                    break;

                case 'standard':
                    mockResult = {
                        title: "Example Standard",
                        author: "IEEE",
                        year: "2020",
                        organization: "IEEE",
                        standardNumber: "IEEE 802.11-2020"
                    };
                    citation = `[1] ${mockResult.organization}, "${mockResult.title}," ${mockResult.standardNumber}, ${mockResult.year}.`;
                    break;

                case 'image':
                    mockResult = {
                        title: "Example Image",
                        author: "Image Creator",
                        year: "2024",
                        source: "Getty Images",
                        medium: "Digital image"
                    };
                    citation = `[1] ${mockResult.author}, "${mockResult.title}," ${mockResult.medium}, ${mockResult.source}, ${mockResult.year}.`;
                    break;

                default:
                    mockResult = {
                        title: "Example Title",
                        author: "Example Author",
                        year: "2024"
                    };
                    citation = `[1] ${mockResult.author}, "${mockResult.title}," ${mockResult.year}.`;
                    break;
            }

            setSearchResults(mockResult);
            setGeneratedCitation(citation);

        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const copyCitation = async () => {
        if (generatedCitation) {
            await navigator.clipboard.writeText(generatedCitation);
        }
    };

    const getSearchPlaceholder = () => {
        if (searchMethod === 'doi') {
            return 'Enter or paste DOI (e.g., 10.1109/EXAMPLE.2024.123456)...';
        }
        if (searchMethod === 'pdf') {
            return 'Upload PDF file to extract citation information...';
        }

        switch (citationType) {
            case 'website':
                return 'Copy and paste the website URL address...';
            case 'book':
                return 'Search by title, author, ISBN, DOI, or URL...';
            case 'journal':
                return 'Search by DOI, article title, or author...';
            case 'conference':
                return 'Search by paper title, conference name, or DOI...';
            case 'standard':
                return 'Search by standard number (e.g., IEEE 802.11-2020) or title...';
            case 'image':
                return 'Search by image title, creator name, or source...';
            default:
                return 'Enter search terms...';
        }
    };

    const getSearchDescription = () => {
        // 特定搜索方法的描述
        if (searchMethod === 'doi') {
            return `Enter a DOI number to automatically extract ${citationType} information and generate a perfect IEEE citation.`;
        }
        if (searchMethod === 'pdf') {
            return `Upload a PDF file and we'll automatically extract the ${citationType} information to create your IEEE citation.`;
        }

        switch (citationType) {
            case 'website':
                return 'Simply paste the URL and we\'ll automatically extract the page information to create your citation.';
            case 'book':
                return 'Enter any book identifier like ISBN, DOI, title, or author name to find and cite your book.';
            case 'journal':
                return 'Use the DOI for best results, or search by article title and author for journal publications.';
            case 'conference':
                return 'Search using the paper title, conference name, or DOI to generate conference paper citations.';
            case 'standard':
                return 'Enter the standard number (like IEEE 802.11-2020) or search by the standard title.';
            case 'image':
                return 'Search by the image title, creator name, or source to cite images and visual content.';
            default:
                return 'Enter your search terms to automatically generate a citation.';
        }
    };

    const getPageTitle = () => {
        // 首页使用通用标题来抓取核心关键词
        if (isHomePage) {
            return 'IEEE Citation Generator';
        }

        switch (citationType) {
            case 'website':
                return 'Website IEEE Citation Generator';
            case 'book':
                return 'Book IEEE Citation Generator';
            case 'journal':
                return 'Journal IEEE Citation Generator';
            case 'conference':
                return 'Conference IEEE Citation Generator';
            case 'standard':
                return 'Standard IEEE Citation Generator';
            case 'image':
                return 'Image IEEE Citation Generator';
            default:
                return 'IEEE Citation Generator';
        }
    };

    const getPageSubtitle = () => {
        // 首页使用更全面的描述，包含多个关键词
        if (isHomePage) {
            return 'Generate perfect IEEE format citations for all your academic sources. Books, journals, conferences, websites, and more. Professional, accurate, and completely free.';
        }

        switch (citationType) {
            case 'website':
                return 'Generate perfect IEEE format citations for websites, web pages, and online resources. Professional, accurate, and completely free.';
            case 'book':
                return 'Generate perfect IEEE format citations for books, textbooks, and monographs. Professional, accurate, and completely free.';
            case 'journal':
                return 'Generate perfect IEEE format citations for journal articles and research papers. Professional, accurate, and completely free.';
            case 'conference':
                return 'Generate perfect IEEE format citations for conference papers and proceedings. Professional, accurate, and completely free.';
            case 'standard':
                return 'Generate perfect IEEE format citations for technical standards and specifications. Professional, accurate, and completely free.';
            case 'image':
                return 'Generate perfect IEEE format citations for images, photographs, and visual content. Professional, accurate, and completely free.';
            default:
                return 'Generate perfect IEEE format citations for all your academic sources. Professional, accurate, and completely free.';
        }
    };

    return (
        <Box className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

            <Container size="4" className="relative py-8 sm:py-12 lg:py-24">
                <Flex direction="column" align="center" gap={{ initial: "6", sm: "8" }}>
                    {/* Hero Content */}
                    <Flex direction="column" align="center" gap="2" className="text-center max-w-4xl px-4">
                        <Heading
                            as="h1"
                            size={{ initial: "7", sm: "8", lg: "9" }}
                            className="mb-3 sm:mb-4 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight"
                        >
                            {getPageTitle()}
                        </Heading>

                        <Text size={{ initial: "4", sm: "5", lg: "6" }} className="text-gray-600 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-3xl mx-auto px-2">
                            {getPageSubtitle()}
                        </Text>

                        <Flex gap="3" justify="center" wrap="wrap" className="mb-8 sm:mb-12 lg:mb-16">
                            {/* Primary CTA - 最重要的行动召唤 */}
                            <Button
                                size={{ initial: "3", sm: "4" }}
                                variant="classic"
                                color="gray"
                                highContrast
                                className="px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                            >
                                <Link href={`/${citationType}`} title={`Start Generating ${citationType.charAt(0).toUpperCase() + citationType.slice(1)} Citations Now`} className="flex items-center gap-2">
                                    Start Generating Now
                                    <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            {/* Tertiary - 辅助功能 */}
                            <Button
                                size={{ initial: "3", sm: "4" }}
                                variant="outline"
                                color="gray"
                                highContrast
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-200"
                            >
                                <Link href="/guide" title="View Complete IEEE Citation Style Guide">
                                    View IEEE Guide
                                </Link>
                            </Button>
                        </Flex>
                    </Flex>

                    {/* Quick Citation Tool */}
                    <Card className="w-full max-w-4xl bg-white/70 backdrop-blur-sm shadow-2xl border-0 mx-4" style={{ padding: '24px' }}>
                        <Box className="mb-4 sm:mb-6">
                            <Heading as="h2" size={{ initial: "4", sm: "5" }} className="mb-2 text-center">
                                Quick {citationType.charAt(0).toUpperCase() + citationType.slice(1)} Citation Generator
                            </Heading>
                            <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 text-center">
                                Try our tool instantly - no registration required
                            </Text>
                        </Box>

                        <Flex direction="column" gap={{ initial: "4", sm: "6" }}>
                            {/* Citation Type Tabs */}
                            <Box style={{ marginBottom: '8px' }}>
                                <Text size={{ initial: "2", sm: "3" }} weight="medium" className="mb-3 block">
                                    Citation Type
                                </Text>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-gray-100 p-1 rounded-lg">
                                    <Link href="/website" title="Generate Website Citations" className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-center hover:bg-white hover:shadow-sm block ${citationType === 'website' ? 'bg-white shadow-sm' : ''}`}>
                                        Website
                                    </Link>
                                    <Link href="/book" title="Generate Book Citations" className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-center hover:bg-white hover:shadow-sm block ${citationType === 'book' ? 'bg-white shadow-sm' : ''}`}>
                                        Book
                                    </Link>
                                    <Link href="/journal" title="Generate Journal Citations" className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-center hover:bg-white hover:shadow-sm block ${citationType === 'journal' ? 'bg-white shadow-sm' : ''}`}>
                                        Journal
                                    </Link>
                                    <Link href="/conference" title="Generate Conference Citations" className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-center hover:bg-white hover:shadow-sm block ${citationType === 'conference' ? 'bg-white shadow-sm' : ''}`}>
                                        Conference
                                    </Link>
                                    <Link href="/standard" title="Generate Standard Citations" className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-center hover:bg-white hover:shadow-sm block ${citationType === 'standard' ? 'bg-white shadow-sm' : ''}`}>
                                        Standard
                                    </Link>
                                    <Link href="/image" title="Generate Image Citations" className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-center hover:bg-white hover:shadow-sm block ${citationType === 'image' ? 'bg-white shadow-sm' : ''}`}>
                                        Image
                                    </Link>
                                </div>
                            </Box>

                            {/* Smart Search Interface */}
                            <Box>
                                <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 mb-4 text-center">
                                    {getSearchDescription()}
                                </Text>

                                <Flex direction="column" gap="3">
                                    {searchMethod === 'pdf' ? (
                                        <Box>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setSearchQuery(file.name);
                                                    }
                                                }}
                                                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </Box>
                                    ) : (
                                        <TextField.Root
                                            size="3"
                                            placeholder={getSearchPlaceholder()}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="text-lg"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    searchAndGenerate();
                                                }
                                            }}
                                        />
                                    )}

                                    {searchMethod === 'doi' && (
                                        <Box className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                            <Text size="2" className="text-amber-800">
                                                💡 <strong>DOI Format:</strong> Paste the full DOI like &ldquo;10.1109/EXAMPLE.2024.123456&rdquo; for best results.
                                            </Text>
                                        </Box>
                                    )}

                                    {searchMethod === 'pdf' && (
                                        <Box className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <Text size="2" className="text-green-800">
                                                💡 <strong>PDF Upload:</strong> We'll extract metadata from your PDF to automatically generate the citation.
                                            </Text>
                                        </Box>
                                    )}

                                    {searchMethod === 'default' && citationType === 'website' && searchQuery && (
                                        <Box className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                            <Text size="2" className="text-blue-800">
                                                💡 <strong>Tip:</strong> Make sure the URL is complete and accessible for best results.
                                            </Text>
                                        </Box>
                                    )}

                                    {searchMethod === 'default' && citationType === 'journal' && (
                                        <Box className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                            <Text size="2" className="text-amber-800">
                                                💡 <strong>Best practice:</strong> Use DOI (e.g., 10.1109/EXAMPLE.2024.123456) for most accurate results.
                                            </Text>
                                        </Box>
                                    )}
                                </Flex>
                            </Box>

                            {/* Generate Button - Primary CTA */}
                            <Flex justify="center" className="mt-4">
                                <Button
                                    size={{ initial: "2", sm: "3" }}
                                    variant="classic"
                                    color="gray"
                                    highContrast
                                    onClick={searchAndGenerate}
                                    disabled={!searchQuery.trim() || isSearching}
                                    className="px-6 sm:px-8 w-full sm:w-auto shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSearching ? (
                                        <Flex align="center" gap="2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            Searching...
                                        </Flex>
                                    ) : (
                                        'Generate Citation'
                                    )}
                                </Button>
                            </Flex>

                            {/* Search Results Preview */}
                            {searchResults && !isSearching && (
                                <Box className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <Text size="3" weight="medium" className="mb-3 block text-blue-900">
                                        📋 Found Information
                                    </Text>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        {Object.entries(searchResults).map(([key, value]) => (
                                            <div key={key} className="flex flex-col">
                                                <Text size="2" weight="medium" className="text-blue-800 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                                </Text>
                                                <Text size="2" className="text-blue-700 font-mono bg-white px-2 py-1 rounded mt-1">
                                                    {String(value)}
                                                </Text>
                                            </div>
                                        ))}
                                    </div>
                                    <Text size="2" className="text-blue-600 mt-3 italic">
                                        ✨ Information automatically extracted and formatted for IEEE citation style
                                    </Text>
                                </Box>
                            )}

                            {/* Generated Citation */}
                            {generatedCitation && (
                                <Box className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <Flex justify="between" align="center" className="mb-3 flex-col sm:flex-row gap-2 sm:gap-0">
                                        <Text size={{ initial: "2", sm: "3" }} weight="medium" className="text-green-800">
                                            Generated Citation
                                        </Text>
                                        <Button
                                            size="2"
                                            variant="outline"
                                            color="gray"
                                            highContrast
                                            onClick={copyCitation}
                                            className="w-full sm:w-auto transition-colors duration-200"
                                        >
                                            <CopyIcon />
                                            Copy
                                        </Button>
                                    </Flex>
                                    <Box className="bg-white p-2 sm:p-3 rounded border font-mono text-xs sm:text-sm break-words">
                                        {generatedCitation}
                                    </Box>
                                </Box>
                            )}
                        </Flex>
                    </Card>

                    {/* Trust Indicators */}
                    <Flex gap={{ initial: "4", sm: "6", lg: "8" }} wrap="wrap" justify="center" className="mt-6 sm:mt-8 text-center px-4">
                        <Box>
                            <Text size={{ initial: "3", sm: "4" }} weight="bold" className="block text-gray-900">100%</Text>
                            <Text size={{ initial: "1", sm: "2" }} className="text-gray-600">Free</Text>
                        </Box>
                        <Box>
                            <Text size={{ initial: "3", sm: "4" }} weight="bold" className="block text-gray-900">Accurate</Text>
                            <Text size={{ initial: "1", sm: "2" }} className="text-gray-600">IEEE Standard</Text>
                        </Box>
                        <Box>
                            <Text size={{ initial: "3", sm: "4" }} weight="bold" className="block text-gray-900">Fast</Text>
                            <Text size={{ initial: "1", sm: "2" }} className="text-gray-600">Instant Results</Text>
                        </Box>
                        <Box>
                            <Text size={{ initial: "3", sm: "4" }} weight="bold" className="block text-gray-900">No Signup</Text>
                            <Text size={{ initial: "1", sm: "2" }} className="text-gray-600">Required</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
}
