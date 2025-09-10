import HeroSection from '@/components/HeroSection';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Website IEEE Citation Generator - Free Online Tool',
    description: 'Generate perfect IEEE format citations for websites & web pages instantly. Simply paste any URL to create accurate IEEE citations. Free online tool.',
    alternates: {
        canonical: 'https://ieeecitationgenerator.xyz/website'
    }
};

export default function WebsiteCitationPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Website Citations', href: '/website' },
    ];

    return (
        <PageLayout showBreadcrumb={true} breadcrumbItems={breadcrumbItems}>
            <HeroSection currentType="website" />
        </PageLayout>
    );
}
