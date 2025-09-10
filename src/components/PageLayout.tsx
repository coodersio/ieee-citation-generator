import { ReactNode } from 'react';
import { Box } from '@radix-ui/themes';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';

interface PageLayoutProps {
    title?: string;
    children: ReactNode;
    showBreadcrumb?: boolean;
    breadcrumbItems?: Array<{ label: string; href: string }>;
}

export default function PageLayout({
    children,
    showBreadcrumb = true,
    breadcrumbItems
}: PageLayoutProps) {
    return (
        <Box className="min-h-screen flex flex-col">
            <Header />

            {showBreadcrumb && (
                <Breadcrumb items={breadcrumbItems} />
            )}

            <Box asChild className="flex-1">
                <main>
                    {children}
                </main>
            </Box>

            <Footer />
        </Box>
    );
}
