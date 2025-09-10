import HeroSection from '@/components/HeroSection';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Conference IEEE Citation Generator - Free Online Tool',
    description: 'Generate perfect IEEE format citations for conference papers & proceedings. Search by title, conference name, or DOI for accurate citations. Free tool.',
    alternates: {
        canonical: 'https://ieeecitationgenerator.com/conference'
    }
};

export default function ConferencePage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Conference Citations', href: '/conference' },
    ];

    return (
        <PageLayout showBreadcrumb={true} breadcrumbItems={breadcrumbItems}>
            <HeroSection currentType="conference" />
        </PageLayout>
    );
}