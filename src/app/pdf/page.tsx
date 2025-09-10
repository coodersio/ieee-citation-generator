import PageLayout from '@/components/PageLayout';
import PDFCitationTool from '@/components/PDFCitationTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PDF Citation Generator - Free Online Tool',
    description: 'Upload PDF files to automatically extract citation information & generate IEEE format citations. Advanced AI-powered metadata extraction.',
};

export default function PDFCitationPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'PDF Citations', href: '/pdf' },
    ];

    return (
        <PageLayout
            title="PDF Citation Generator"
            breadcrumbItems={breadcrumbItems}
        >
            <PDFCitationTool />
        </PageLayout>
    );
}