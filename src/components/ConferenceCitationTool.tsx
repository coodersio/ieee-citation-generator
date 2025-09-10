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
import { ConferenceCitation, InputMethod, OutputFormat } from '@/types/citation';

interface ConferenceCitationToolProps {
    inputMethod?: InputMethod;
    outputFormat?: OutputFormat;
}

interface ConferenceFormData {
    authors: string;
    title: string;
    conferenceName: string;
    location: string;
    pages: string;
    year: number;
    month: string;
    doi: string;
    url: string;
}

export default function ConferenceCitationTool({
    inputMethod = 'manual',
    outputFormat = 'text'
}: ConferenceCitationToolProps) {
    const [formData, setFormData] = useState<ConferenceFormData>({
        authors: '',
        title: '',
        conferenceName: '',
        location: '',
        pages: '',
        year: new Date().getFullYear(),
        month: '',
        doi: '',
        url: ''
    });

    const [citation, setCitation] = useState<string>('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const updateField = (field: keyof ConferenceFormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const generateCitation = () => {
        if (!formData.authors || !formData.title || !formData.conferenceName) {
            alert('Please fill in all required fields (Authors, Title, Conference Name).');
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
        // IEEE Conference Paper Citation Format:
        // [1] A. Author, "Paper Title," in Proc. Conference Name, Location, Year, pp. X-Y.

        let result = formData.authors;

        // Add title in quotes
        result += `, "${formData.title},"`;

        // Add "in Proc." for conference proceedings
        result += ` in Proc. ${formData.conferenceName}`;

        // Add location if available
        if (formData.location) {
            result += `, ${formData.location}`;
        }

        // Add month and year
        if (formData.month) {
            result += `, ${formData.month} ${formData.year}`;
        } else {
            result += `, ${formData.year}`;
        }

        // Add pages
        if (formData.pages) {
            result += `, pp. ${formData.pages}`;
        }

        result += '.';

        // Add DOI if available
        if (formData.doi) {
            result += ` doi: ${formData.doi}`;
        }

        return result;
    };
    const generateBibTeX = (): string => {
        let key = formData.authors.split(',')[0].split(' ').pop()?.toLowerCase() ?? 'author';
        key += formData.year;

        return `@inproceedings{${key},
  author = {${formData.authors}},
  title = {${formData.title}},
  booktitle = {Proceedings of ${formData.conferenceName}},
  address = {${formData.location}},
  pages = {${formData.pages}},
  month = {${formData.month}},
  year = {${formData.year}},
  doi = {${formData.doi}},
  url = {${formData.url}}
}`;
    };

    const generateLaTeX = (): string => {
        return `\\bibitem{${formData.authors.split(',')[0].split(' ').pop()?.toLowerCase()}${formData.year}}
${formData.authors}, "${formData.title}," in \\textit{Proc. ${formData.conferenceName}}, ${formData.location}, ${formData.month} ${formData.year}, pp. ${formData.pages}.`;
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
            conferenceName: '',
            location: '',
            pages: '',
            year: new Date().getFullYear(),
            month: '',
            doi: '',
            url: ''
        });
        setCitation('');
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <Box className="w-full max-w-4xl mx-auto">
            <Card className="p-6">
                <Heading size="5" className="mb-6 text-center">
                    IEEE Conference Citation Generator
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

                    {/* Paper Title */}
                    <Box>
                        <Text size="3" weight="medium" className="mb-2 block">
                            Paper Title <span className="text-red-500">*</span>
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="Enter the complete paper title"
                            value={formData.title}
                            onChange={(e) => updateField('title', e.target.value)}
                        />
                    </Box>

                    {/* Conference Name */}
                    <Box>
                        <Text size="3" weight="medium" className="mb-2 block">
                            Conference Name <span className="text-red-500">*</span>
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="e.g., IEEE International Conference on Software Engineering"
                            value={formData.conferenceName}
                            onChange={(e) => updateField('conferenceName', e.target.value)}
                        />
                    </Box>

                    {/* Location and Year */}
                    <Flex gap="4" wrap="wrap">
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Location
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., New York, NY, USA"
                                value={formData.location}
                                onChange={(e) => updateField('location', e.target.value)}
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

                    {/* Month and Pages */}
                    <Flex gap="4" wrap="wrap">
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Month
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., June"
                                value={formData.month}
                                onChange={(e) => updateField('month', e.target.value)}
                            />
                        </Box>
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
                    </Flex>

                    {/* DOI and URL */}
                    <Flex gap="4" wrap="wrap">
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                DOI (Optional)
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., 10.1109/ICSE.2024.1234567"
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
                        IEEE Conference Citation Format ({outputFormat.toUpperCase()})
                    </Text>
                    <Text size="2" className="text-gray-600">
                        <strong>General Format:</strong><br />
                        [1] A. Author, &ldquo;Paper Title,&rdquo; in Proc. Conference Name, Location, Month Year, pp. X-Y.
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
