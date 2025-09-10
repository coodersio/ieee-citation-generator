import Link from 'next/link';
import { Flex, Text, Container, Box, Grid } from '@radix-ui/themes';

const footerLinks = {
    'Citation Types': [
        { name: 'Book Citations', href: '/book' },
        { name: 'Journal Citations', href: '/journal' },
        { name: 'Conference Citations', href: '/conference' },
        { name: 'Website Citations', href: '/website' },
        { name: 'IEEE Standards', href: '/standard' },
        { name: 'Image Citations', href: '/image' },
    ],
    'Tools & Features': [
        { name: 'DOI Generator', href: '/doi' },
        { name: 'PDF Upload', href: '/pdf' },
        { name: 'BibTeX Export', href: '/bibtex' },
        { name: 'Format Converter', href: '/convert' },
        { name: 'Batch Generator', href: '/batch' },
    ],
    'Resources': [
        { name: 'Citation Guide', href: '/guide' },
        { name: 'Examples', href: '/examples' },
        { name: 'FAQ', href: '/faq' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ],
};

export default function Footer() {
    return (
        <Box asChild>
            <footer className="bg-gray-900 text-white mt-20">
                <Container size="4" className="py-10">
                    <Grid columns={{ initial: '1', md: '4' }} gap="8">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <Box key={title}>
                                <Text size="4" weight="bold" className="text-blue-400 mb-4 block">
                                    {title}
                                </Text>
                                <Flex direction="column" gap="2">
                                    {links.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            title={link.name}
                                            className="text-gray-300 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </Flex>
                            </Box>
                        ))}

                        <Box>
                            <Text size="4" weight="bold" className="text-blue-400 mb-4 block">
                                IEEE Citation Generator
                            </Text>
                            <Text size="2" className="text-gray-300 leading-relaxed">
                                Free online tool for generating accurate IEEE format citations.
                                Perfect for students, researchers, and academics worldwide.
                            </Text>
                        </Box>
                    </Grid>

                    <Box className="border-t border-gray-700 mt-8 pt-6">
                        <Flex
                            align="center"
                            justify="center"
                            gap="4"
                            wrap="wrap"
                            className="text-center"
                        >
                            <Text size="2" className="text-gray-400">
                                © 2024 IEEE Citation Generator. All rights reserved.
                            </Text>
                            <Text size="2" className="text-gray-500">|</Text>
                            <Link href="/privacy" title="Privacy Policy" className="text-gray-400 hover:text-white text-sm">
                                Privacy Policy
                            </Link>
                            <Text size="2" className="text-gray-500">|</Text>
                            <Link href="/terms" title="Terms of Service" className="text-gray-400 hover:text-white text-sm">
                                Terms of Service
                            </Link>
                            <Text size="2" className="text-gray-500">|</Text>
                            <Link href="/sitemap.xml" title="View XML Sitemap" className="text-gray-400 hover:text-white text-sm">
                                Sitemap
                            </Link>
                        </Flex>
                    </Box>
                </Container>
            </footer>
        </Box>
    );
}
