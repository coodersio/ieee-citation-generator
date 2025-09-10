import PageLayout from '@/components/PageLayout';
import FormatConverterTool from '@/components/FormatConverterTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Citation Format Converter - Free Online Tool',
    description: 'Convert citations between different academic formats. Transform APA, MLA, Chicago, Harvard citations to IEEE format quickly & accurately.',
};

export default function FormatConverterPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Format Converter', href: '/convert' },
    ];

    return (
        <PageLayout
            title="Citation Format Converter"
            breadcrumbItems={breadcrumbItems}
        >
            <FormatConverterTool />
        </PageLayout>
    );
}