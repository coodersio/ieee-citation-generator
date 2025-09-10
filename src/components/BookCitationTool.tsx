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
import { BookCitation } from '@/types/citation';

interface BookCitationToolProps {
    inputMethod?: 'manual' | 'doi' | 'pdf';
    outputFormat?: 'text' | 'bibtex' | 'latex';
}

export default function BookCitationTool({
    inputMethod = 'manual',
    outputFormat = 'text'
}: BookCitationToolProps) {
    const [formData, setFormData] = useState({
        authors: [''],
        title: '',
        edition: '',
        volume: '',
        city: '',
        publisher: '',
        year: new Date().getFullYear(),
        isbn: ''
    });

    const [citation, setCitation] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const updateField = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateAuthor = (index: number, value: string) => {
        const newAuthors = [...formData.authors];
        newAuthors[index] = value;
        setFormData(prev => ({ ...prev, authors: newAuthors }));
    };

    const addAuthor = () => {
        setFormData(prev => ({
            ...prev,
            authors: [...prev.authors, '']
        }));
    };

    const removeAuthor = (index: number) => {
        if (formData.authors.length > 1) {
            const newAuthors = formData.authors.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, authors: newAuthors }));
        }
    };

    const generateCitation = () => {
        if (!formData.authors[0] || !formData.title || !formData.city || !formData.publisher || !formData.year) {
            alert('Please fill in all required fields');
            return;
        }

        // Format authors
        const authorsStr = formData.authors
            .filter(author => author.trim())
            .join(', ');

        let generatedCitation = '';

        switch (outputFormat) {
            case 'bibtex':
                generatedCitation = generateBibTeX();
                break;
            case 'latex':
                generatedCitation = generateLaTeX();
                break;
            default:
                // IEEE text format
                generatedCitation = `[1] ${authorsStr}, "${formData.title},"`;

                if (formData.edition) {
                    generatedCitation += ` ${formData.edition}.`;
                }

                if (formData.volume) {
                    generatedCitation += ` ${formData.volume}.`;
                }

                generatedCitation += ` ${formData.city}: ${formData.publisher}, ${formData.year}.`;
        }

        setCitation(generatedCitation);
    };

    const generateBibTeX = () => {
        const authors = formData.authors.filter(a => a.trim()).join(' and ');
        return `@book{key${formData.year},
  author = {${authors}},
  title = {${formData.title}},
  publisher = {${formData.publisher}},
  address = {${formData.city}},
  year = {${formData.year}}${formData.edition ? `,\n  edition = {${formData.edition}}` : ''}${formData.isbn ? `,\n  isbn = {${formData.isbn}}` : ''}
}`;
    };

    const generateLaTeX = () => {
        const authorsStr = formData.authors.filter(a => a.trim()).join(', ');
        return `\\bibitem{ref${formData.year}}
${authorsStr}, \\textit{${formData.title}}${formData.edition ? `, ${formData.edition}` : ''}. 
${formData.city}: ${formData.publisher}, ${formData.year}.`;
    };

    const copyCitation = async () => {
        if (!citation) return;

        try {
            await navigator.clipboard.writeText(citation);
            setShowCopySuccess(true);
            setTimeout(() => setShowCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const clearForm = () => {
        setFormData({
            authors: [''],
            title: '',
            edition: '',
            volume: '',
            city: '',
            publisher: '',
            year: new Date().getFullYear(),
            isbn: ''
        });
        setCitation('');
    };

    return (
        <Box className="max-w-4xl mx-auto">
            <Card className="p-6">
                <Heading size="6" className="mb-6 text-center">
                    Book IEEE Citation Generator
                </Heading>

                {/* Input Method Info */}
                {inputMethod !== 'manual' && (
                    <Box className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <Text size="3" weight="medium" className="text-blue-800">
                            {inputMethod === 'doi' ? 'DOI Input Mode' : 'PDF Upload Mode'}
                        </Text>
                        <Text size="2" className="text-blue-600 mt-1">
                            {inputMethod === 'doi'
                                ? 'Enter a DOI to automatically populate book information'
                                : 'Upload a PDF to extract book information automatically'
                            }
                        </Text>
                    </Box>
                )}

                {/* Form */}
                <Flex direction="column" gap="4">
                    {/* Authors */}
                    <Box>
                        <Text size="3" weight="medium" className="mb-2 block">
                            Authors <span className="text-red-500">*</span>
                        </Text>
                        {formData.authors.map((author, index) => (
                            <Flex key={index} gap="2" className="mb-2">
                                <TextField.Root
                                    size="3"
                                    className="flex-1"
                                    placeholder="e.g., Smith, J. A."
                                    value={author}
                                    onChange={(e) => updateAuthor(index, e.target.value)}
                                />
                                {formData.authors.length > 1 && (
                                    <Button
                                        variant="soft"
                                        color="red"
                                        onClick={() => removeAuthor(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Flex>
                        ))}
                        <Button variant="soft" onClick={addAuthor}>
                            Add Author
                        </Button>
                    </Box>

                    {/* Title */}
                    <Box>
                        <Text size="3" weight="medium" className="mb-2 block">
                            Book Title <span className="text-red-500">*</span>
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="e.g., Digital Signal Processing: A Practical Approach"
                            value={formData.title}
                            onChange={(e) => updateField('title', e.target.value)}
                        />
                    </Box>

                    {/* Edition and Volume */}
                    <Flex gap="4" wrap="wrap">
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Edition (Optional)
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., 2nd ed."
                                value={formData.edition}
                                onChange={(e) => updateField('edition', e.target.value)}
                            />
                        </Box>
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Volume (Optional)
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., vol. 1"
                                value={formData.volume}
                                onChange={(e) => updateField('volume', e.target.value)}
                            />
                        </Box>
                    </Flex>

                    {/* City and Publisher */}
                    <Flex gap="4" wrap="wrap">
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                City <span className="text-red-500">*</span>
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., New York"
                                value={formData.city}
                                onChange={(e) => updateField('city', e.target.value)}
                            />
                        </Box>
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                Publisher <span className="text-red-500">*</span>
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., Wiley"
                                value={formData.publisher}
                                onChange={(e) => updateField('publisher', e.target.value)}
                            />
                        </Box>
                    </Flex>

                    {/* Year and ISBN */}
                    <Flex gap="4" wrap="wrap">
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
                        <Box className="flex-1 min-w-48">
                            <Text size="3" weight="medium" className="mb-2 block">
                                ISBN (Optional)
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., 978-0-471-39875-0"
                                value={formData.isbn}
                                onChange={(e) => updateField('isbn', e.target.value)}
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
                        IEEE Book Citation Format ({outputFormat})
                    </Text>
                    <Text size="2" className="text-gray-600">
                        <strong>General Format:</strong><br />
                        [1] A. Author, &ldquo;Book Title,&rdquo; Edition. City: Publisher, Year.
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
