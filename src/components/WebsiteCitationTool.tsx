'use client';

import { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    TextField,
    Card,
    Heading,
    Separator
} from '@radix-ui/themes';
import { CopyIcon, ResetIcon } from '@radix-ui/react-icons';
import { InputMethod, OutputFormat } from '@/types/citation';

interface WebsiteCitationToolProps {
    inputMethod?: InputMethod;
    outputFormat?: OutputFormat;
}

export default function WebsiteCitationTool({
    inputMethod = 'manual',
    outputFormat = 'text'
}: WebsiteCitationToolProps) {
    const [formData, setFormData] = useState({
        authors: '',
        title: '',
        websiteName: '',
        organization: '',
        year: new Date().getFullYear(),
        url: '',
        accessDate: new Date().toISOString().split('T')[0]
    });

    const [citation, setCitation] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const updateField = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const generateCitation = () => {
        const accessDateFormatted = new Date(formData.accessDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        let generated = '';
        
        if (formData.authors) {
            generated += `[1] ${formData.authors}, `;
        }
        
        generated += `"${formData.title}," `;
        
        if (formData.websiteName) {
            generated += `${formData.websiteName}, `;
        }
        
        if (formData.organization) {
            generated += `${formData.organization}, `;
        }
        
        generated += `${formData.year}. [Online]. Available: ${formData.url}. [Accessed: ${accessDateFormatted}].`;
        
        setCitation(generated);
    };

    const copyCitation = () => {
        navigator.clipboard.writeText(citation);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    const clearForm = () => {
        setFormData({
            authors: '',
            title: '',
            websiteName: '',
            organization: '',
            year: new Date().getFullYear(),
            url: '',
            accessDate: new Date().toISOString().split('T')[0]
        });
        setCitation('');
        setShowCopySuccess(false);
    };

    return (
        <Card className="w-full bg-white/70 backdrop-blur-sm shadow-2xl border-0 p-6">
            <Heading size="5" className="mb-4 text-center">
                Website Citation Generator
            </Heading>
            <Text size="3" className="text-gray-600 text-center mb-6 block">
                Generate IEEE citations for websites and web pages.
            </Text>

            <Flex direction="column" gap="4">
                <TextField.Root
                    size="3"
                    placeholder="Author(s) (Optional)"
                    value={formData.authors}
                    onChange={(e) => updateField('authors', e.target.value)}
                />
                <TextField.Root
                    size="3"
                    placeholder="Page/Article Title"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                />
                <TextField.Root
                    size="3"
                    placeholder="Website Name"
                    value={formData.websiteName}
                    onChange={(e) => updateField('websiteName', e.target.value)}
                />
                <TextField.Root
                    size="3"
                    placeholder="Organization (Optional)"
                    value={formData.organization}
                    onChange={(e) => updateField('organization', e.target.value)}
                />
                <TextField.Root
                    size="3"
                    type="number"
                    placeholder="Year"
                    value={formData.year.toString()}
                    onChange={(e) => updateField('year', parseInt(e.target.value) || new Date().getFullYear())}
                />
                <TextField.Root
                    size="3"
                    placeholder="URL"
                    value={formData.url}
                    onChange={(e) => updateField('url', e.target.value)}
                />
                <TextField.Root
                    size="3"
                    type="date"
                    placeholder="Access Date"
                    value={formData.accessDate}
                    onChange={(e) => updateField('accessDate', e.target.value)}
                />

                <Flex gap="3" justify="center" className="mt-6">
                    <Button
                        size="3"
                        variant="classic"
                        color="gray"
                        highContrast
                        onClick={generateCitation}
                        className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        Generate Citation
                    </Button>
                    <Button
                        size="3"
                        variant="outline"
                        color="gray"
                        highContrast
                        onClick={clearForm}
                    >
                        <ResetIcon /> Clear Form
                    </Button>
                </Flex>
            </Flex>

            <Separator className="my-6" />

            {citation && (
                <Box className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Flex justify="between" align="center" className="mb-3">
                        <Text size="3" weight="medium" className="text-green-800">
                            Generated Citation
                        </Text>
                        <Button
                            size="2"
                            variant="outline"
                            color="gray"
                            highContrast
                            onClick={copyCitation}
                            disabled={showCopySuccess}
                        >
                            <CopyIcon />
                            {showCopySuccess ? 'Copied!' : 'Copy'}
                        </Button>
                    </Flex>
                    <Box className="bg-white p-3 rounded border font-mono text-sm whitespace-pre-wrap">
                        {citation}
                    </Box>
                </Box>
            )}
        </Card>
    );
}
