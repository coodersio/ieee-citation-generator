import HeroSection from '@/components/HeroSection';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Standard IEEE Citation Generator - Free Online Tool',
    description: 'Generate perfect IEEE format citations for technical standards & specifications. Search by standard number (IEEE, ISO, ANSI) or title. Free online tool.',
    alternates: {
        canonical: 'https://ieeecitationgenerator.com/standard'
    }
};

export default function StandardCitationPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Standard Citations', href: '/standard' },
    ];

    return (
        <PageLayout showBreadcrumb={true} breadcrumbItems={breadcrumbItems}>
            <HeroSection currentType="standard" />
        </PageLayout>
    );
}