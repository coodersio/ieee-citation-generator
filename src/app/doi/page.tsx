import PageLayout from '@/components/PageLayout';
import DOICitationTool from '@/components/DOICitationTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DOI Citation Generator - Free Online Tool',
    description: 'Generate IEEE citations automatically from DOI. Enter any DOI & get properly formatted citations with complete metadata fetching.',
};

export default function DOICitationPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'DOI Citations', href: '/doi' },
    ];

    return (
        <PageLayout
            title="DOI Citation Generator"
            breadcrumbItems={breadcrumbItems}
        >
            <DOICitationTool />
        </PageLayout>
    );
}
