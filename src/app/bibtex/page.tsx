import PageLayout from '@/components/PageLayout';
import BibTeXTool from '@/components/BibTeXTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BibTeX Citation Generator - Free Online Tool',
    description: 'Generate BibTeX citations for LaTeX documents. Create .bib files with proper formatting for academic papers, theses & research publications.',
};

export default function BibTeXPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'BibTeX Format', href: '/bibtex' },
    ];

    return (
        <PageLayout

            breadcrumbItems={breadcrumbItems}
        >
            <BibTeXTool />
        </PageLayout>
    );
}