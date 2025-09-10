import HeroSection from '@/components/HeroSection';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Journal IEEE Citation Generator - Free Online Tool',
    description: 'Generate perfect IEEE format citations for journal articles & research papers. Search by DOI, title, or author for accurate citations. Free online tool.',
    alternates: {
        canonical: 'https://ieeecitationgenerator.com/journal'
    }
};

export default function JournalPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Journal Citations', href: '/journal' },
    ];

    return (
        <PageLayout showBreadcrumb={true} breadcrumbItems={breadcrumbItems}>
            <HeroSection currentType="journal" />
        </PageLayout>
    );
}