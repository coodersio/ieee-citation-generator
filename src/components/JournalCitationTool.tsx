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
import { JournalCitation, InputMethod, OutputFormat } from '@/types/citation';

interface JournalCitationToolProps {
    inputMethod?: InputMethod;
    outputFormat?: OutputFormat;
}

interface JournalFormData {
    authors: string;
    title: string;
    journalName: string;
    volume: string;
    issue: string;
    pages: string;
    year: number;
    doi: string;
    url: string;
}

export default function JournalCitationTool({
    inputMethod = 'manual',
    outputFormat = 'text'
}: JournalCitationToolProps) {
    const [formData, setFormData] = useState<JournalFormData>({
        authors: '',
        title: '',
        journalName: '',
        volume: '',
        issue: '',
        pages: '',
        year: new Date().getFullYear(),
        doi: '',
        url: ''
    });

    const [citation, setCitation] = useState<string>('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const updateField = (field: keyof JournalFormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const generateCitation = () => {
        if (!formData.authors || !formData.title || !formData.journalName) {
            alert('Please fill in all required fields (Authors, Title, Journal Name).');
            return;
        }

        let citation = '';

        switch (outputFormat) {
            case 'bibtex':
                citation = generateBibTeX();
                break;
            case 'latex':
                citation = generateLaTeX();
                break;
            default:
                citation = generateIEEEText();
        }

        setCitation(citation);
    };

    const generateIEEEText = (): string => {
        // IEEE Journal Article Citation Format:
        // [1] A. Author, "Article Title," Journal Name, vol. X, no. Y, pp. Z-Z, Month Year.

        let result = formData.authors;

        // Add title in quotes
        result += `, "${formData.title},"`;

        // Add journal name (italicized in actual formatting)
        result += ` ${formData.journalName}`;

        // Add volume
        if (formData.volume) {
            result += `, vol. ${formData.volume}`;
        }

        // Add issue
        if (formData.issue) {
            result += `, no. ${formData.issue}`;
        }

        // Add pages
        if (formData.pages) {
            result += `, pp. ${formData.pages}`;
        }

        // Add year
        result += `, ${formData.year}.`;

        // Add DOI if available
        if (formData.doi) {
            result += ` doi: ${formData.doi}`;
        }

        return result;
    };
    const generateBibTeX = (): string => {
        const key = formData.authors.split(',')[0].split(' ').pop()?.toLowerCase() ?? 'unknown';
        const citationKey = key + formData.year;

        return `@article{${citationKey},
  author = {${formData.authors}},
  title = {${formData.title}},
  journal = {${formData.journalName}},
  volume = {${formData.volume}},
  number = {${formData.issue}},
  pages = {${formData.pages}},
  year = {${formData.year}},
  doi = {${formData.doi}},
  url = {${formData.url}}
}`;
    };

    const generateLaTeX = (): string => {
        return `\\bibitem{${formData.authors.split(',')[0].split(' ').pop()?.toLowerCase()}${formData.year}}
${formData.authors}, "${formData.title}," \\textit{${formData.journalName}}, vol. ${formData.volume}, no. ${formData.issue}, pp. ${formData.pages}, ${formData.year}.`;
    };

    const copyCitation = () => {
        if (!citation) return;

        navigator.clipboard.writeText(citation).then(() => {
            setShowCopySuccess(true);
            setTimeout(() => setShowCopySuccess(false), 2000);
        });
    };

    const clearForm = () => {
        setFormData({
            authors: '',
            title: '',
            journalName: '',
            volume: '',
            issue: '',
            pages: '',
            year: new Date().getFullYear(),
            doi: '',
            url: ''
        });
        setCitation('');
    };

    return (
        <Box className="w-full max-w-4xl mx-auto">
            <Card className="p-6">
                <Heading size="5" className="mb-6 text-center">
                    IEEE Journal Citation Generator
                </Heading>

                <Flex direction="column" gap="4">
                    {/* Authors */}
                    <Box>
                        <Text size="3" weight="medium" className="mb-2 block">
                            Author(s) <span className="text-red-500">*</span>
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="e.g., J. Smith, A. Johnson, B. Williams"
                            value={formData.authors}
                            onChange={(e) => updateField('authors', e.target.value)}
                        />
                        <Text size="2" className="text-gray-500 mt-1">
                            Use "Last, First Initial" format, separated by commas
                        </Text>
                    </Box>

                    {/* Article Title */}
                    <Box>
                        <Text size="3" weight="medium" className="mb-2 block">
                            Article Title <span className="text-red-500">*</span>
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="Enter the complete article title"
                            value={formData.title}
                            onChange={(e) => updateField('title', e.target.value)}
                        />
                    </Box>

                    {/* Journal Name */}
                    <Box>
                        <Text size="3" weight="medium" className="mb-2 block">
                            Journal Name <span className="text-red-500">*</span>
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="e.g., IEEE Transactions on Software Engineering"
                            value={formData.journalName}
                            onChange={(e) => updateField('journalName', e.target.value)}
                        />
                    </Box>

                    {/* Volume and Issue */}
                    <Flex gap="4" wrap="wrap">
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Volume
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., 45"
                                value={formData.volume}
                                onChange={(e) => updateField('volume', e.target.value)}
                            />
                        </Box>
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Issue/Number
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., 3"
                                value={formData.issue}
                                onChange={(e) => updateField('issue', e.target.value)}
                            />
                        </Box>
                    </Flex>

                    {/* Pages and Year */}
                    <Flex gap="4" wrap="wrap">
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Pages
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., 123-135"
                                value={formData.pages}
                                onChange={(e) => updateField('pages', e.target.value)}
                            />
                        </Box>
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Year <span className="text-red-500">*</span>
                            </Text>
                            <TextField.Root
                                size="3"
                                type="number"
                                placeholder="2024"
                                value={formData.year.toString()}
                                onChange={(e) => updateField('year', parseInt(e.target.value) || new Date().getFullYear())}
                            />
                        </Box>
                    </Flex>

                    {/* DOI and URL */}
                    <Flex gap="4" wrap="wrap">
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                DOI (Optional)
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., 10.1109/TSE.2024.1234567"
                                value={formData.doi}
                                onChange={(e) => updateField('doi', e.target.value)}
                            />
                        </Box>
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                URL (Optional)
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="https://..."
                                value={formData.url}
                                onChange={(e) => updateField('url', e.target.value)}
                            />
                        </Box>
                    </Flex>

                    {/* Action Buttons */}
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

                {/* Format Example */}
                <Box className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <Text size="3" weight="medium" className="mb-2 block">
                        IEEE Journal Citation Format ({outputFormat.toUpperCase()})
                    </Text>
                    <Text size="2" className="text-gray-600">
                        <strong>General Format:</strong><br />
                        [1] A. Author, &ldquo;Article Title,&rdquo; Journal Name, vol. X, no. Y, pp. Z-Z, Year.
                    </Text>
                </Box>

                {/* Citation Preview */}
                {citation && (
                    <Box className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <Flex justify="between" align="center" className="mb-3">
                            <Text size="3" weight="medium" className="text-green-800">
                                Generated Citation ({outputFormat.toUpperCase()})
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
        </Box>
    );
}
