import HeroSection from '@/components/HeroSection';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Image IEEE Citation Generator - Free Online Tool',
    description: 'Generate perfect IEEE format citations for images, photos & digital media. Search by title, creator name, or source for accurate citations. Free tool.',
    alternates: {
        canonical: 'https://ieeecitationgenerator.com/image'
    }
};

export default function ImageCitationPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Image Citations', href: '/image' },
    ];

    return (
        <PageLayout showBreadcrumb={true} breadcrumbItems={breadcrumbItems}>
            <HeroSection currentType="image" />
        </PageLayout>
    );
}