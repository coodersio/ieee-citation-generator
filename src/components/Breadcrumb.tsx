'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flex, Text, Container, Box } from '@radix-ui/themes';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const pathname = usePathname();

    // Auto-generate breadcrumbs from pathname if items not provided
    const breadcrumbItems = items || generateBreadcrumbs(pathname);

    if (breadcrumbItems.length <= 1) return null;

    return (
        <Box className="bg-gray-50 border-b">
            <Container size="4" className="py-3">
                <Flex align="center" gap="2" wrap="wrap">
                    {breadcrumbItems.map((item, index) => (
                        <Flex key={item.href} align="center" gap="2">
                            {index === breadcrumbItems.length - 1 ? (
                                <Text size="2" className="text-gray-600">
                                    {item.label}
                                </Text>
                            ) : (
                                <>
                                    <Link
                                        href={item.href}
                                        title={`Go to ${item.label}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                    <ChevronRightIcon className="w-3 h-3 text-gray-400" />
                                </>
                            )}
                        </Flex>
                    ))}
                </Flex>
            </Container>
        </Box>
    );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        // Format segment for display
        let label = segment.charAt(0).toUpperCase() + segment.slice(1);

        // Handle specific path formatting
        switch (segment) {
            case 'book':
                label = 'Book Citation Generator';
                break;
            case 'journal':
                label = 'Journal Citation Generator';
                break;
            case 'conference':
                label = 'Conference Citation Generator';
                break;
            case 'website':
                label = 'Website Citation Generator';
                break;
            case 'doi':
                label = 'DOI Citation Generator';
                break;
            case 'pdf':
                label = 'PDF Citation Generator';
                break;
            case 'bibtex':
                label = 'BibTeX Format';
                break;
            case 'latex':
                label = 'LaTeX Format';
                break;
            case 'manual':
                label = 'Manual Input';
                break;
            default:
                // Handle compound paths
                if (segments.length > 1) {
                    // const type = segments[0];
                    const input = segments[1];
                    const output = segments[2];

                    if (index === 1 && input) {
                        label = `${input.toUpperCase()} Input`;
                    } else if (index === 2 && output) {
                        label = `${output} Format`;
                    }
                }
        }

        breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
}
